import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { AppConfigService } from "../config/config.service.js";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);
  private readonly pool: Pool;

  constructor(private readonly config: AppConfigService) {
    // Prisma 7: direct connection strings are no longer accepted by PrismaClient.
    // We must use a Driver Adapter — @prisma/adapter-pg wraps the `pg` Pool and
    // translates Prisma's query IR into the format the `pg` library expects.
    // The Pool is the actual connection pool; PrismaPg is just the bridge.
    const pool = new Pool({ connectionString: config.databaseUrl });
    const adapter = new PrismaPg(pool);

    super({
      adapter,
      log: config.isProduction
        ? ["error", "warn"]
        : ["query", "error", "warn"],
    });

    // Keep a reference so we can end the pool cleanly on shutdown.
    this.pool = pool;
  }

  async onModuleInit(): Promise<void> {
    this.logger.log("Connecting to database...");
    await this.$connect();
    this.logger.log("Database connection established");
  }

  async onModuleDestroy(): Promise<void> {
    this.logger.log("Disconnecting from database...");
    await this.$disconnect();
    await this.pool.end();
  }
}
