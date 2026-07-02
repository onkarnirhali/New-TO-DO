import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { DashboardsService } from "./dashboards.service.js";
import { UsersService } from "../users/users.service.js";
import { CurrentUser } from "../auth/decorators/current-user.decorator.js";
import type { ClerkTokenPayload } from "../auth/clerk.service.js";
import { CreateDashboardDto } from "./dto/create-dashboard.dto.js";
import { UpdateDashboardDto } from "./dto/update-dashboard.dto.js";
import { CreateColumnDto } from "./dto/create-column.dto.js";
import { UpdateColumnDto } from "./dto/update-column.dto.js";
import { ReorderItemsDto } from "./dto/reorder-items.dto.js";

@Controller("dashboards")
export class DashboardsController {
  constructor(
    private readonly dashboardsService: DashboardsService,
    private readonly usersService: UsersService
  ) {}

  // ── Helpers ─────────────────────────────────────────────────────────────

  /** Every handler starts by resolving the Clerk JWT → internal user ID. */
  private async resolveUserId(clerkUser: ClerkTokenPayload): Promise<string> {
    const user = await this.usersService.requireByClerkId(clerkUser.clerkId);
    return user.id;
  }

  // ── Dashboards ──────────────────────────────────────────────────────────

  @Get()
  async list(@CurrentUser() clerkUser: ClerkTokenPayload) {
    const userId = await this.resolveUserId(clerkUser);
    return this.dashboardsService.list(userId);
  }

  @Post()
  async create(
    @CurrentUser() clerkUser: ClerkTokenPayload,
    @Body() dto: CreateDashboardDto
  ) {
    const userId = await this.resolveUserId(clerkUser);
    return this.dashboardsService.create(userId, dto);
  }

  // IMPORTANT: @Patch("reorder") MUST be declared before @Patch(":id").
  // NestJS matches routes in declaration order — if ":id" came first,
  // the literal string "reorder" would be captured as the :id param.
  @Patch("reorder")
  @HttpCode(HttpStatus.NO_CONTENT)
  async reorder(
    @CurrentUser() clerkUser: ClerkTokenPayload,
    @Body() dto: ReorderItemsDto
  ) {
    const userId = await this.resolveUserId(clerkUser);
    await this.dashboardsService.reorder(userId, dto.items);
  }

  @Get(":id")
  async findOne(
    @CurrentUser() clerkUser: ClerkTokenPayload,
    @Param("id") id: string
  ) {
    const userId = await this.resolveUserId(clerkUser);
    return this.dashboardsService.findOne(id, userId);
  }

  @Patch(":id")
  async update(
    @CurrentUser() clerkUser: ClerkTokenPayload,
    @Param("id") id: string,
    @Body() dto: UpdateDashboardDto
  ) {
    const userId = await this.resolveUserId(clerkUser);
    return this.dashboardsService.update(id, userId, dto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @CurrentUser() clerkUser: ClerkTokenPayload,
    @Param("id") id: string
  ) {
    const userId = await this.resolveUserId(clerkUser);
    await this.dashboardsService.remove(id, userId);
  }

  // ── Columns ─────────────────────────────────────────────────────────────

  @Post(":dashboardId/columns")
  async createColumn(
    @CurrentUser() clerkUser: ClerkTokenPayload,
    @Param("dashboardId") dashboardId: string,
    @Body() dto: CreateColumnDto
  ) {
    const userId = await this.resolveUserId(clerkUser);
    return this.dashboardsService.createColumn(dashboardId, userId, dto);
  }

  // Same declaration-order rule: "reorder" before ":columnId"
  @Patch(":dashboardId/columns/reorder")
  @HttpCode(HttpStatus.NO_CONTENT)
  async reorderColumns(
    @CurrentUser() clerkUser: ClerkTokenPayload,
    @Param("dashboardId") dashboardId: string,
    @Body() dto: ReorderItemsDto
  ) {
    const userId = await this.resolveUserId(clerkUser);
    await this.dashboardsService.reorderColumns(dashboardId, userId, dto.items);
  }

  @Patch(":dashboardId/columns/:columnId")
  async updateColumn(
    @CurrentUser() clerkUser: ClerkTokenPayload,
    @Param("dashboardId") dashboardId: string,
    @Param("columnId") columnId: string,
    @Body() dto: UpdateColumnDto
  ) {
    const userId = await this.resolveUserId(clerkUser);
    return this.dashboardsService.updateColumn(dashboardId, columnId, userId, dto);
  }

  @Delete(":dashboardId/columns/:columnId")
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeColumn(
    @CurrentUser() clerkUser: ClerkTokenPayload,
    @Param("dashboardId") dashboardId: string,
    @Param("columnId") columnId: string
  ) {
    const userId = await this.resolveUserId(clerkUser);
    await this.dashboardsService.removeColumn(dashboardId, columnId, userId);
  }
}
