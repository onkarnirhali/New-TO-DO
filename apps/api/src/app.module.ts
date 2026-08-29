import { Module } from "@nestjs/common";
import { AppConfigModule } from "./config/config.module.js";
import { DatabaseModule } from "./database/database.module.js";
import { AuthModule } from "./auth/auth.module.js";
import { UsersModule } from "./users/users.module.js";
import { DashboardsModule } from "./dashboards/dashboards.module.js";
import { TasksModule } from "./tasks/tasks.module.js";
import { NotesModule } from "./notes/notes.module.js";
import { HealthController } from "./health/health.controller.js";
import { AdminGuard } from "./auth/guards/admin.guard.js";
import { AdminHealthController } from "./health/admin-health.controller.js";
import { PlatformHealthService } from "./health/platform-health.service.js";

/**
 * AppModule — root module. Import order:
 * 1. Infrastructure (config, database)
 * 2. Auth — registers the global ClerkAuthGuard
 * 3. Feature modules
 */
@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    AuthModule,
    UsersModule,
    DashboardsModule,
    TasksModule,
    NotesModule,
  ],
  controllers: [HealthController, AdminHealthController],
  providers: [AdminGuard, PlatformHealthService],
})
export class AppModule {}
