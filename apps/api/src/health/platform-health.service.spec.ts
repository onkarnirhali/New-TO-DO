const mockS3Send = jest.fn();
const mockS3Destroy = jest.fn();

jest.mock("@aws-sdk/client-s3", () => ({
  ListObjectsV2Command: jest
    .fn()
    .mockImplementation((input: unknown): unknown => input),
  S3Client: jest.fn().mockImplementation(() => ({
    send: mockS3Send,
    destroy: mockS3Destroy,
  })),
}));

import { PlatformHealthService } from "./platform-health.service";

type ProbeName = "database" | "redis" | "storage";
type HealthResponse = {
  status: "ok" | "degraded";
  checks: Record<"api" | ProbeName, { status: "ok" | "error" }>;
};

type StorageAdapter = {
  send(
    command: unknown,
    options?: { abortSignal?: AbortSignal }
  ): Promise<unknown>;
};

describe("PlatformHealthService", () => {
  beforeEach(() => {
    mockS3Send.mockReset();
    mockS3Destroy.mockReset();
  });

  function createService(options?: {
    databaseFails?: boolean;
    databaseNeverSettles?: boolean;
    redisFails?: boolean;
    redisNeverSettles?: boolean;
    storageFails?: boolean;
    storageNeverSettles?: boolean;
    r2NotConfigured?: boolean;
    probeTimeoutMs?: number;
    onStorageAbortSignal?: (signal: AbortSignal | undefined) => void;
  }): PlatformHealthService {
    return PlatformHealthService.forTesting(
      {
        $queryRaw: jest.fn().mockImplementation(() => {
          if (options?.databaseFails) throw new Error("database password: secret-value");
          if (options?.databaseNeverSettles) return new Promise<never>(() => undefined);
          return Promise.resolve([{ "?column?": 1 }]);
        }),
      } as never,
      {
        redisUrl: "redis://sensitive-token@redis.example.test:6379",
        r2AccountId: options?.r2NotConfigured ? "" : "sensitive-account-id",
        r2AccessKeyId: "sensitive-access-key",
        r2SecretAccessKey: "sensitive-secret-key",
        r2BucketName: "sensitive-bucket-name",
      } as never,
      {
        createRedisClient: () => ({
          connect: jest.fn().mockImplementation(() => {
            if (options?.redisFails) throw new Error("redis token: secret-value");
            if (options?.redisNeverSettles) return new Promise<never>(() => undefined);
            return Promise.resolve();
          }),
          ping: jest.fn().mockResolvedValue("PONG"),
          disconnect: jest.fn(),
        }),
        createStorageClient: () => ({
          send: jest.fn().mockImplementation((
            _command: unknown,
            requestOptions?: { abortSignal?: AbortSignal }
          ) => {
            if (options?.storageFails) throw new Error("bucket: sensitive-bucket-name");
            if (options?.storageNeverSettles) {
              options?.onStorageAbortSignal?.(requestOptions?.abortSignal);
              return new Promise<never>(() => undefined);
            }
            return Promise.resolve({ Contents: [{ Key: "private-object-name" }] });
          }),
          destroy: jest.fn(),
        }),
        createListObjectsCommand: jest.fn().mockReturnValue({}),
        ...(options?.probeTimeoutMs === undefined
          ? {}
          : { probeTimeoutMs: options.probeTimeoutMs }),
      }
    );
  }

  async function responseWithin<T>(promise: Promise<T>, deadlineMs: number): Promise<T> {
    return Promise.race([
      promise,
      new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error("readiness response exceeded its deadline")), deadlineMs);
      }),
    ]);
  }

  it("returns ok when every readiness probe succeeds", async () => {
    await expect(createService().getStatus()).resolves.toEqual({
      status: "ok",
      checks: {
        api: { status: "ok" },
        database: { status: "ok" },
        redis: { status: "ok" },
        storage: { status: "ok" },
      },
    });
  });

  it("declares only its production dependencies for Nest injection", () => {
    expect(Reflect.getMetadata("design:paramtypes", PlatformHealthService)).toHaveLength(2);
  });

  it("forwards the R2 abort signal through the production storage adapter", async () => {
    const service = new PlatformHealthService(
      {} as never,
      {
        r2AccountId: "sensitive-account-id",
        r2AccessKeyId: "sensitive-access-key",
        r2SecretAccessKey: "sensitive-secret-key",
      } as never
    );
    const storageAdapter = (
      service as unknown as {
        dependencies: { createStorageClient: () => StorageAdapter };
      }
    ).dependencies.createStorageClient();
    const abortController = new AbortController();
    const command = {};
    mockS3Send.mockResolvedValue({});

    await storageAdapter.send(command, { abortSignal: abortController.signal });

    expect(mockS3Send).toHaveBeenCalledWith(command, {
      abortSignal: abortController.signal,
    });
  });

  it.each([
    ["database", { databaseFails: true }],
    ["redis", { redisFails: true }],
    ["storage", { storageFails: true }],
  ])("reduces a failed %s probe to its error status only", async (failedCheck, options) => {
    const response = await createService(options).getStatus() as HealthResponse;

    expect(response.status).toBe("degraded");
    expect(response.checks[failedCheck as ProbeName]).toEqual({
      status: "error",
    });
    expect(JSON.stringify(response)).not.toContain("sensitive-");
    expect(Object.keys(response)).toEqual(["status", "checks"]);
    expect(Object.values(response.checks).every(check => Object.keys(check).length === 1)).toBe(true);
  });

  it("fails storage readiness closed when R2 configuration is incomplete", async () => {
    const service = createService({ r2NotConfigured: true });

    await expect(service.getStatus()).resolves.toMatchObject({
      status: "degraded",
      checks: { storage: { status: "error" } },
    });
  });

  it.each([
    ["database", { databaseNeverSettles: true }],
    ["redis", { redisNeverSettles: true }],
    ["storage", { storageNeverSettles: true }],
  ] as const)(
    "returns a compact error when the %s readiness probe never settles",
    async (failedCheck, failure) => {
      const probeTimeoutMs = 25;
      const response = await responseWithin(
        createService({ ...failure, probeTimeoutMs }).getStatus(),
        probeTimeoutMs * 3
      );

      expect(response).toMatchObject({
        status: "degraded",
        checks: { [failedCheck]: { status: "error" } },
      });
    }
  );

  it("aborts the R2 request when its readiness deadline expires", async () => {
    let abortSignal: AbortSignal | undefined;
    const probeTimeoutMs = 25;

    await responseWithin(
      createService({
        storageNeverSettles: true,
        probeTimeoutMs,
        onStorageAbortSignal: signal => {
          abortSignal = signal;
        },
      }).getStatus(),
      probeTimeoutMs * 3
    );

    expect(abortSignal?.aborted).toBe(true);
  });
});
