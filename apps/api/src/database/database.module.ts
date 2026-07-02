import { Global, Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service.js";

/**
 * DatabaseModule — provides PrismaService to the entire application.
 *
 * @Global() for the same reason as AppConfigModule:
 * every feature module needs database access, so making it global
 * removes the need to import DatabaseModule in every feature module.
 *
 * Feature modules simply inject PrismaService in their constructors:
 *   constructor(private prisma: PrismaService) {}
 */
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}
