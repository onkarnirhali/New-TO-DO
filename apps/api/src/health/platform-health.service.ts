import { Injectable } from "@nestjs/common";
import { ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";
import { createClient } from "redis";
import { AppConfigService } from "../config/config.service.js";
import { PrismaService } from "../database/prisma.service.js";

type HealthCheckStatus = "ok" | "error";

export interface PlatformHealthResponse {
  status: "ok" | "degraded";
  checks: {
    api: { status: "ok" };
    database: { status: HealthCheckStatus };
    redis: { status: HealthCheckStatus };
    storage: { status: HealthCheckStatus };
  };
}

interface RedisProbeClient {
  connect(): Promise<unknown>;
  ping(): Promise<unknown>;
  disconnect(): void;
}

interface StorageProbeClient {
  send(
    command: unknown,
    options?: { abortSignal?: AbortSignal }
  ): Promise<unknown>;
  destroy(): void;
}

interface PlatformHealthDependencies {
  createRedisClient: (url: string) => RedisProbeClient;
  createStorageClient: () => StorageProbeClient;
  createListObjectsCommand: (bucketName: string) => unknown;
  probeTimeoutMs?: number;
}

@Injectable()
export class PlatformHealthService {
  private static readonly defaultProbeTimeoutMs = 1_000;
  private dependencies: PlatformHealthDependencies;

  constructor(
    private readonly prisma: PrismaService,
    private readonly config: AppConfigService
  ) {
    this.dependencies = this.defaultDependencies();
  }

  static forTesting(
    prisma: PrismaService,
    config: AppConfigService,
    dependencies: PlatformHealthDependencies
  ): PlatformHealthService {
    const service = new PlatformHealthService(prisma, config);
    service.dependencies = dependencies;
    return service;
  }

  private defaultDependencies(): PlatformHealthDependencies {
    return {
      createRedisClient: url => createClient({ url }),
      createStorageClient: () => {
        const client = new S3Client({
          region: "auto",
          endpoint: `https://${this.config.r2AccountId}.r2.cloudflarestorage.com`,
          credentials: {
            accessKeyId: this.config.r2AccessKeyId,
            secretAccessKey: this.config.r2SecretAccessKey,
          },
        });
        return {
          send: (command, options) =>
            client.send(command as ListObjectsV2Command, options),
          destroy: () => client.destroy(),
        };
      },
      createListObjectsCommand: bucketName =>
        new ListObjectsV2Command({ Bucket: bucketName, MaxKeys: 1 }),
      probeTimeoutMs: PlatformHealthService.defaultProbeTimeoutMs,
    };
  }

  async getStatus(): Promise<PlatformHealthResponse> {
    const [database, redis, storage] = await Promise.all([
      this.databaseStatus(),
      this.redisStatus(),
      this.storageStatus(),
    ]);

    return {
      status:
        database.status === "ok" &&
        redis.status === "ok" &&
        storage.status === "ok"
          ? "ok"
          : "degraded",
      checks: {
        api: { status: "ok" },
        database,
        redis,
        storage,
      },
    };
  }

  private async databaseStatus(): Promise<{ status: HealthCheckStatus }> {
    try {
      await this.withDeadline(() => this.prisma.$queryRaw`SELECT 1`);
      return { status: "ok" };
    } catch {
      return { status: "error" };
    }
  }

  private async redisStatus(): Promise<{ status: HealthCheckStatus }> {
    let client: RedisProbeClient | undefined;

    try {
      const probeClient = this.dependencies.createRedisClient(this.config.redisUrl);
      client = probeClient;
      await this.withDeadline(async () => {
        await probeClient.connect();
        await probeClient.ping();
      });
      return { status: "ok" };
    } catch {
      return { status: "error" };
    } finally {
      if (client) {
        this.closeRedisClient(client);
      }
    }
  }

  private async storageStatus(): Promise<{ status: HealthCheckStatus }> {
    if (!this.hasR2Configuration()) {
      return { status: "error" };
    }

    let client: StorageProbeClient | undefined;

    try {
      const probeClient = this.dependencies.createStorageClient();
      client = probeClient;
      await this.withDeadline(abortSignal =>
        probeClient.send(
          this.dependencies.createListObjectsCommand(this.config.r2BucketName),
          { abortSignal }
        )
      );
      return { status: "ok" };
    } catch {
      return { status: "error" };
    } finally {
      client?.destroy();
    }
  }

  private hasR2Configuration(): boolean {
    return [
      this.config.r2AccountId,
      this.config.r2AccessKeyId,
      this.config.r2SecretAccessKey,
      this.config.r2BucketName,
    ].every(value => value.length > 0);
  }

  private closeRedisClient(client: RedisProbeClient): void {
    try {
      client.disconnect();
    } catch {
      // Closing a failed probe must not alter its compact error result.
    }
  }

  private async withDeadline<T>(
    operation: (abortSignal: AbortSignal) => Promise<T>
  ): Promise<T> {
    const controller = new AbortController();
    let timeout: NodeJS.Timeout | undefined;

    try {
      return await new Promise<T>((resolve, reject) => {
        timeout = setTimeout(() => {
          controller.abort();
          reject(new Error("readiness probe deadline exceeded"));
        }, this.probeTimeoutMs());

        operation(controller.signal).then(resolve, reject);
      });
    } finally {
      if (timeout) {
        clearTimeout(timeout);
      }
    }
  }

  private probeTimeoutMs(): number {
    const configuredTimeout = this.dependencies.probeTimeoutMs;
    if (
      typeof configuredTimeout === "number" &&
      Number.isFinite(configuredTimeout) &&
      configuredTimeout > 0
    ) {
      return configuredTimeout;
    }

    return PlatformHealthService.defaultProbeTimeoutMs;
  }
}
