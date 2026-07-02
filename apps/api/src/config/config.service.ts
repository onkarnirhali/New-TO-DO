import { Injectable } from "@nestjs/common";
import { ConfigService as NestConfigService } from "@nestjs/config";
import type { AppConfiguration } from "./configuration.js";

/**
 * AppConfigService — a typed wrapper around NestJS's ConfigService.
 *
 * Why wrap it?
 * NestJS's built-in ConfigService uses `get<T>(key: string)` with
 * string keys and generic types. This means:
 *   configService.get<string>('database.url')  ← string key, easy to typo
 *
 * Our wrapper exposes typed getters instead:
 *   configService.databaseUrl  ← TypeScript knows this is a string
 *
 * This is a thin layer — it adds zero overhead and significant safety.
 */
@Injectable()
export class AppConfigService {
  constructor(
    private readonly config: NestConfigService<AppConfiguration, true>
  ) {}

  get port(): number {
    return this.config.get("port", { infer: true });
  }

  get isProduction(): boolean {
    return this.config.get("isProduction", { infer: true });
  }

  get databaseUrl(): string {
    return this.config.get("database.url", { infer: true });
  }

  get redisUrl(): string {
    return this.config.get("redis.url", { infer: true });
  }

  get clerkSecretKey(): string {
    return this.config.get("clerk.secretKey", { infer: true });
  }

  get clerkWebhookSecret(): string {
    return this.config.get("clerk.webhookSecret", { infer: true });
  }

  get allowedOrigins(): string[] {
    return this.config.get("allowedOrigins", { infer: true });
  }

  get r2BucketName(): string {
    return this.config.get("r2.bucketName", { infer: true });
  }
}
