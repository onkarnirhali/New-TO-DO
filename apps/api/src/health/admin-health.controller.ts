import { Controller, Get, UseGuards } from "@nestjs/common";
import { AdminGuard } from "../auth/guards/admin.guard.js";
import {
  PlatformHealthService,
  type PlatformHealthResponse,
} from "./platform-health.service.js";

@Controller("admin/health")
@UseGuards(AdminGuard)
export class AdminHealthController {
  constructor(private readonly health: PlatformHealthService) {}

  @Get()
  check(): Promise<PlatformHealthResponse> {
    return this.health.getStatus();
  }
}
