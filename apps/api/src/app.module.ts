import { Module } from "@nestjs/common";
import { HealthController } from "./health/health.controller.js";

/**
 * AppModule — the root module of the NestJS application.
 *
 * In NestJS, modules are the unit of organisation.
 * Think of each module as a self-contained feature:
 * AuthModule, TasksModule, NotesModule, etc.
 *
 * The root AppModule imports all feature modules.
 * Right now it only has the health check.
 * Feature modules will be added as we build each milestone.
 */
@Module({
  imports: [],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
