import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { TasksService } from "./tasks.service.js";
import { UsersService } from "../users/users.service.js";
import { CurrentUser } from "../auth/decorators/current-user.decorator.js";
import type { ClerkTokenPayload } from "../auth/clerk.service.js";
import { CreateTaskDto } from "./dto/create-task.dto.js";
import { UpdateTaskDto } from "./dto/update-task.dto.js";
import { MoveTaskDto } from "./dto/move-task.dto.js";
import { SetReminderDto } from "./dto/set-reminder.dto.js";
import { UpdateReminderDto } from "./dto/update-reminder.dto.js";
import { ListTasksQueryDto } from "./dto/list-tasks-query.dto.js";

@Controller("tasks")
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly usersService: UsersService
  ) {}

  private async resolveUserId(clerkUser: ClerkTokenPayload): Promise<string> {
    const user = await this.usersService.requireByClerkId(clerkUser.clerkId);
    return user.id;
  }

  // ── Tasks ───────────────────────────────────────────────────────────────

  @Get()
  async list(
    @CurrentUser() clerkUser: ClerkTokenPayload,
    @Query() query: ListTasksQueryDto
  ) {
    const userId = await this.resolveUserId(clerkUser);
    return this.tasksService.list(userId, query);
  }

  @Post()
  async create(
    @CurrentUser() clerkUser: ClerkTokenPayload,
    @Body() dto: CreateTaskDto
  ) {
    const userId = await this.resolveUserId(clerkUser);
    return this.tasksService.create(userId, dto);
  }

  @Get(":id")
  async findOne(
    @CurrentUser() clerkUser: ClerkTokenPayload,
    @Param("id") id: string
  ) {
    const userId = await this.resolveUserId(clerkUser);
    return this.tasksService.findOne(id, userId);
  }

  @Patch(":id")
  async update(
    @CurrentUser() clerkUser: ClerkTokenPayload,
    @Param("id") id: string,
    @Body() dto: UpdateTaskDto
  ) {
    const userId = await this.resolveUserId(clerkUser);
    return this.tasksService.update(id, userId, dto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @CurrentUser() clerkUser: ClerkTokenPayload,
    @Param("id") id: string
  ) {
    const userId = await this.resolveUserId(clerkUser);
    await this.tasksService.remove(id, userId);
  }

  @Patch(":id/move")
  async move(
    @CurrentUser() clerkUser: ClerkTokenPayload,
    @Param("id") id: string,
    @Body() dto: MoveTaskDto
  ) {
    const userId = await this.resolveUserId(clerkUser);
    return this.tasksService.move(id, userId, dto);
  }

  // ── Cross-dashboard sharing ─────────────────────────────────────────────

  @Post(":id/dashboards/:dashboardId")
  @HttpCode(HttpStatus.NO_CONTENT)
  async addToDashboard(
    @CurrentUser() clerkUser: ClerkTokenPayload,
    @Param("id") id: string,
    @Param("dashboardId") dashboardId: string
  ) {
    const userId = await this.resolveUserId(clerkUser);
    await this.tasksService.addToDashboard(id, dashboardId, userId);
  }

  @Delete(":id/dashboards/:dashboardId")
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeFromDashboard(
    @CurrentUser() clerkUser: ClerkTokenPayload,
    @Param("id") id: string,
    @Param("dashboardId") dashboardId: string
  ) {
    const userId = await this.resolveUserId(clerkUser);
    await this.tasksService.removeFromDashboard(id, dashboardId, userId);
  }

  // ── Reminders ───────────────────────────────────────────────────────────

  @Post(":id/reminder")
  async setReminder(
    @CurrentUser() clerkUser: ClerkTokenPayload,
    @Param("id") id: string,
    @Body() dto: SetReminderDto
  ) {
    const userId = await this.resolveUserId(clerkUser);
    return this.tasksService.setReminder(id, userId, dto);
  }

  @Patch(":id/reminder")
  async updateReminder(
    @CurrentUser() clerkUser: ClerkTokenPayload,
    @Param("id") id: string,
    @Body() dto: UpdateReminderDto
  ) {
    const userId = await this.resolveUserId(clerkUser);
    return this.tasksService.updateReminder(id, userId, dto);
  }

  @Delete(":id/reminder")
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeReminder(
    @CurrentUser() clerkUser: ClerkTokenPayload,
    @Param("id") id: string
  ) {
    const userId = await this.resolveUserId(clerkUser);
    await this.tasksService.removeReminder(id, userId);
  }
}
