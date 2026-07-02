import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from "@nestjs/common";
import { PrismaService } from "../database/prisma.service.js";
import { ReminderType, type Task, type Reminder, type Prisma } from "@prisma/client";
import type { CreateTaskDto } from "./dto/create-task.dto.js";
import type { UpdateTaskDto } from "./dto/update-task.dto.js";
import type { MoveTaskDto } from "./dto/move-task.dto.js";
import type { SetReminderDto } from "./dto/set-reminder.dto.js";
import type { UpdateReminderDto } from "./dto/update-reminder.dto.js";
import type { ListTasksQueryDto } from "./dto/list-tasks-query.dto.js";

// Shape returned by findOne — task + its relations
export type TaskWithRelations = Task & {
  reminder: Reminder | null;
  linkedNote: { id: string; title: string } | null;
  dashboards: Array<{ dashboardId: string }>;
};

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  // ── Tasks CRUD ──────────────────────────────────────────────────────────

  async list(userId: string, query: ListTasksQueryDto): Promise<Task[]> {
    const where: Prisma.TaskWhereInput = { userId };

    if (query.columnId) {
      where.columnId = query.columnId;
    }

    // Filter by dashboard: find all tasks whose primary column belongs to
    // that dashboard. This is the main query for rendering a Kanban board.
    if (query.dashboardId) {
      where.column = { dashboardId: query.dashboardId };
    }

    if (query.status) {
      where.status = query.status;
    }

    return this.prisma.task.findMany({
      where,
      orderBy: [{ position: "asc" }, { createdAt: "asc" }],
    });
  }

  async findOne(id: string, userId: string): Promise<TaskWithRelations> {
    const task = await this.prisma.task.findFirst({
      where: { id, userId },
      include: {
        reminder: true,
        // Only return enough of the linked note for the task card preview
        linkedNote: { select: { id: true, title: true } },
        dashboards: { select: { dashboardId: true } },
      },
    });
    if (!task) throw new NotFoundException("Task not found");
    return task;
  }

  async create(userId: string, dto: CreateTaskDto): Promise<Task> {
    // Verify the column belongs to the user
    await this.requireColumnForUser(dto.columnId, userId);

    if (dto.linkedNoteId) {
      await this.requireNoteForUser(dto.linkedNoteId, userId);
    }

    const position = await this.nextTaskPosition(dto.columnId);

    return this.prisma.task.create({
      data: {
        userId,
        columnId: dto.columnId,
        title: dto.title,
        description: dto.description ?? null,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : null,
        linkedNoteId: dto.linkedNoteId ?? null,
        position,
      },
    });
  }

  async update(id: string, userId: string, dto: UpdateTaskDto): Promise<Task> {
    await this.requireTask(id, userId);

    if (dto.linkedNoteId) {
      await this.requireNoteForUser(dto.linkedNoteId, userId);
    }

    return this.prisma.task.update({
      where: { id },
      data: {
        ...(dto.title !== undefined && { title: dto.title }),
        ...(dto.description !== undefined && { description: dto.description }),
        ...(dto.status !== undefined && { status: dto.status }),
        ...(dto.linkedNoteId !== undefined && { linkedNoteId: dto.linkedNoteId }),
        // null clears the field; an ISO string sets it
        ...(dto.dueDate !== undefined && {
          dueDate: dto.dueDate ? new Date(dto.dueDate) : null,
        }),
      },
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    await this.requireTask(id, userId);
    await this.prisma.task.delete({ where: { id } });
  }

  /**
   * Move a task to a different column and set its position.
   *
   * This is a first-class Kanban operation — not just a PATCH on columnId.
   * The distinction matters because the frontend knows the target column
   * and the new position simultaneously (drag-and-drop), so we want to
   * update both atomically.
   */
  async move(id: string, userId: string, dto: MoveTaskDto): Promise<Task> {
    await this.requireTask(id, userId);
    await this.requireColumnForUser(dto.targetColumnId, userId);

    const position =
      dto.newPosition ?? (await this.nextTaskPosition(dto.targetColumnId));

    return this.prisma.task.update({
      where: { id },
      data: { columnId: dto.targetColumnId, position },
    });
  }

  // ── Cross-dashboard sharing ─────────────────────────────────────────────

  async addToDashboard(
    taskId: string,
    dashboardId: string,
    userId: string
  ): Promise<void> {
    const task = await this.requireTask(taskId, userId);

    // The task is already on the dashboard that owns its primary column —
    // sharing to that same dashboard is a no-op, not an error.
    const column = await this.prisma.dashboardColumn.findUnique({
      where: { id: task.columnId },
      select: { dashboardId: true },
    });
    if (column?.dashboardId === dashboardId) return;

    // Verify the target dashboard belongs to the user
    const dashboard = await this.prisma.dashboard.findFirst({
      where: { id: dashboardId, userId },
    });
    if (!dashboard) throw new NotFoundException("Dashboard not found");

    // createMany with skipDuplicates is the cleanest idempotent upsert
    // for a composite-PK junction table with no extra fields.
    await this.prisma.taskDashboard.createMany({
      data: [{ taskId, dashboardId }],
      skipDuplicates: true,
    });
  }

  async removeFromDashboard(
    taskId: string,
    dashboardId: string,
    userId: string
  ): Promise<void> {
    await this.requireTask(taskId, userId);

    // We can't remove a task from the dashboard that owns its primary column —
    // that relationship is implicit through columnId, not via TaskDashboard.
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
      select: { column: { select: { dashboardId: true } } },
    });
    if (task?.column.dashboardId === dashboardId) {
      throw new BadRequestException(
        "Cannot unshare a task from its primary dashboard. Move the task to a different column first."
      );
    }

    await this.prisma.taskDashboard.deleteMany({
      where: { taskId, dashboardId },
    });
  }

  // ── Reminders ───────────────────────────────────────────────────────────

  async setReminder(
    taskId: string,
    userId: string,
    dto: SetReminderDto
  ): Promise<Reminder> {
    await this.requireTask(taskId, userId);

    const existing = await this.prisma.reminder.findUnique({ where: { taskId } });
    if (existing) {
      throw new ConflictException(
        "A reminder already exists for this task. Use PATCH to update it."
      );
    }

    return this.prisma.reminder.create({
      data: {
        taskId,
        type: dto.type,
        remindAt: dto.type === ReminderType.TIME && dto.remindAt
          ? new Date(dto.remindAt)
          : null,
        lat: dto.type === ReminderType.LOCATION ? (dto.lat ?? null) : null,
        lng: dto.type === ReminderType.LOCATION ? (dto.lng ?? null) : null,
        radiusMetres: dto.type === ReminderType.LOCATION ? (dto.radiusMetres ?? null) : null,
        label: dto.label ?? null,
      },
    });
  }

  async updateReminder(
    taskId: string,
    userId: string,
    dto: UpdateReminderDto
  ): Promise<Reminder> {
    await this.requireTask(taskId, userId);

    const existing = await this.prisma.reminder.findUnique({ where: { taskId } });
    if (!existing) {
      throw new NotFoundException("No reminder exists for this task. Use POST to create one.");
    }

    // The effective type after this update
    const effectiveType = dto.type ?? existing.type;

    // If switching to TIME, a remindAt must be available (new or already stored)
    if (
      effectiveType === ReminderType.TIME &&
      dto.remindAt === undefined &&
      existing.remindAt === null
    ) {
      throw new BadRequestException("remindAt is required when changing to TIME reminder type");
    }

    // If switching to LOCATION, coordinates must be available
    if (effectiveType === ReminderType.LOCATION) {
      const lat = dto.lat ?? existing.lat;
      const lng = dto.lng ?? existing.lng;
      const radiusMetres = dto.radiusMetres ?? existing.radiusMetres;
      if (lat === null || lng === null || radiusMetres === null) {
        throw new BadRequestException(
          "lat, lng, and radiusMetres are required when changing to LOCATION reminder type"
        );
      }
    }

    return this.prisma.reminder.update({
      where: { taskId },
      data: {
        ...(dto.type !== undefined && { type: dto.type }),
        ...(dto.remindAt !== undefined && {
          remindAt: dto.remindAt ? new Date(dto.remindAt) : null,
          sent: false, // Reset sent flag when remindAt changes
        }),
        ...(dto.lat !== undefined && { lat: dto.lat }),
        ...(dto.lng !== undefined && { lng: dto.lng }),
        ...(dto.radiusMetres !== undefined && { radiusMetres: dto.radiusMetres }),
        ...(dto.label !== undefined && { label: dto.label }),
      },
    });
  }

  async removeReminder(taskId: string, userId: string): Promise<void> {
    await this.requireTask(taskId, userId);
    // deleteMany never throws on zero matches — cleaner than findUnique + delete
    await this.prisma.reminder.deleteMany({ where: { taskId } });
  }

  // ── Private helpers ─────────────────────────────────────────────────────

  private async requireTask(id: string, userId: string): Promise<Task> {
    const task = await this.prisma.task.findFirst({ where: { id, userId } });
    if (!task) throw new NotFoundException("Task not found");
    return task;
  }

  /**
   * Verifies that a column belongs to the authenticated user by joining
   * through dashboard. We don't require the dashboardId here (unlike
   * DashboardsService.requireColumn) because the caller only has the columnId.
   */
  private async requireColumnForUser(
    columnId: string,
    userId: string
  ): Promise<void> {
    const column = await this.prisma.dashboardColumn.findFirst({
      where: {
        id: columnId,
        dashboard: { userId },
      },
    });
    if (!column) throw new NotFoundException("Column not found");
  }

  private async requireNoteForUser(
    noteId: string,
    userId: string
  ): Promise<void> {
    const note = await this.prisma.note.findFirst({ where: { id: noteId, userId } });
    if (!note) throw new NotFoundException("Note not found");
  }

  private async nextTaskPosition(columnId: string): Promise<number> {
    const last = await this.prisma.task.findFirst({
      where: { columnId },
      orderBy: { position: "desc" },
      select: { position: true },
    });
    return (last?.position ?? -10) + 10;
  }
}
