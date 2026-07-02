import { Module } from "@nestjs/common";
import { DashboardsService } from "./dashboards.service.js";
import { DashboardsController } from "./dashboards.controller.js";
import { UsersModule } from "../users/users.module.js";

@Module({
  imports: [UsersModule],
  controllers: [DashboardsController],
  providers: [DashboardsService],
})
export class DashboardsModule {}
