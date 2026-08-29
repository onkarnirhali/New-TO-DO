import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { PrismaService } from "../database/prisma.service.js";
import type { Dashboard, DashboardColumn } from "@prisma/client";
import type { CreateDashboardDto } from "./dto/create-dashboard.dto.js";
import type { UpdateDashboardDto } from "./dto/update-dashboard.dto.js";
import type { CreateColumnDto } from "./dto/create-column.dto.js";
import type { UpdateColumnDto } from "./dto/update-column.dto.js";
import type { PositionItemDto } from "./dto/reorder-items.dto.js";

// The shape returned by GET /dashboards/:id — full board with columns
export type DashboardWithColumns = Dashboard & { columns: DashboardColumn[] };

@Injectable()
export class DashboardsService {
  constructor(private readonly prisma: PrismaService) {}

  // ── Dashboards ──────────────────────────────────────────────────────────

  async list(userId: string): Promise<Dashboard[]> {
    return this.prisma.dashboard.findMany({
      where: { userId },
      orderBy: { position: "asc" },
    });
  }

  async findOne(id: string, userId: string): Promise<DashboardWithColumns> {
    const dashboard = await this.prisma.dashboard.findFirst({
      where: { id, userId },
      include: {
        columns: { orderBy: { position: "asc" } },
      },
    });
    if (!dashboard) throw new NotFoundException("Dashboard not found");
    return dashboard;
  }

  async create(userId: string, dto: CreateDashboardDto): Promise<Dashboard> {
    const position = await this.nextDashboardPosition(userId);
    return this.prisma.dashboard.create({
      data: {
        userId,
        title: dto.title,
        description: dto.description ?? null,
        position,
        columns: {
          create: [
            { title: "To Do", position: 0 },
            { title: "In Progress", position: 10 },
            { title: "Done", position: 20 },
          ],
        },
      },
    });
  }

  async update(
    id: string,
    userId: string,
    dto: UpdateDashboardDto
  ): Promise<Dashboard> {
    await this.requireDashboard(id, userId);
    return this.prisma.dashboard.update({
      where: { id },
      data: {
        ...(dto.title !== undefined && { title: dto.title }),
        ...(dto.description !== undefined && { description: dto.description }),
      },
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    await this.requireDashboard(id, userId);
    await this.prisma.dashboard.delete({ where: { id } });
  }

  async reorder(userId: string, items: PositionItemDto[]): Promise<void> {
    // All updates are owned by this user — updateMany scopes by userId so
    // a bad actor sending someone else's IDs simply matches 0 rows.
    await this.prisma.$transaction(
      items.map(({ id, position }) =>
        this.prisma.dashboard.updateMany({
          where: { id, userId },
          data: { position },
        })
      )
    );
  }

  // ── Columns ─────────────────────────────────────────────────────────────

  async createColumn(
    dashboardId: string,
    userId: string,
    dto: CreateColumnDto
  ): Promise<DashboardColumn> {
    await this.requireDashboard(dashboardId, userId);
    const position = await this.nextColumnPosition(dashboardId);
    return this.prisma.dashboardColumn.create({
      data: {
        dashboardId,
        title: dto.title,
        color: dto.color ?? null,
        position,
      },
    });
  }

  async updateColumn(
    dashboardId: string,
    columnId: string,
    userId: string,
    dto: UpdateColumnDto
  ): Promise<DashboardColumn> {
    await this.requireColumn(dashboardId, columnId, userId);
    return this.prisma.dashboardColumn.update({
      where: { id: columnId },
      data: {
        ...(dto.title !== undefined && { title: dto.title }),
        // Explicit null clears the color; undefined means "don't touch it"
        ...(dto.color !== undefined && { color: dto.color }),
      },
    });
  }

  async removeColumn(
    dashboardId: string,
    columnId: string,
    userId: string
  ): Promise<void> {
    await this.requireColumn(dashboardId, columnId, userId);

    // The schema uses onDelete: Restrict on column→task, so deleting a column
    // that has tasks would throw a foreign-key error. We surface this as a
    // 422 with a clear message instead of a 500.
    const taskCount = await this.prisma.task.count({ where: { columnId } });
    if (taskCount > 0) {
      throw new UnprocessableEntityException(
        `Cannot delete a column that contains ${taskCount} task(s). Move or delete the tasks first.`
      );
    }

    await this.prisma.dashboardColumn.delete({ where: { id: columnId } });
  }

  async reorderColumns(
    dashboardId: string,
    userId: string,
    items: PositionItemDto[]
  ): Promise<void> {
    await this.requireDashboard(dashboardId, userId);
    await this.prisma.$transaction(
      items.map(({ id, position }) =>
        this.prisma.dashboardColumn.updateMany({
          where: { id, dashboardId },
          data: { position },
        })
      )
    );
  }

  // ── Private helpers ─────────────────────────────────────────────────────

  private async requireDashboard(
    id: string,
    userId: string
  ): Promise<Dashboard> {
    const dashboard = await this.prisma.dashboard.findFirst({
      where: { id, userId },
    });
    if (!dashboard) throw new NotFoundException("Dashboard not found");
    return dashboard;
  }

  private async requireColumn(
    dashboardId: string,
    columnId: string,
    userId: string
  ): Promise<DashboardColumn> {
    // Two-step ownership: dashboard must belong to user, column must belong to dashboard
    await this.requireDashboard(dashboardId, userId);
    const column = await this.prisma.dashboardColumn.findFirst({
      where: { id: columnId, dashboardId },
    });
    if (!column) throw new NotFoundException("Column not found");
    return column;
  }

  private async nextDashboardPosition(userId: string): Promise<number> {
    const last = await this.prisma.dashboard.findFirst({
      where: { userId },
      orderBy: { position: "desc" },
      select: { position: true },
    });
    // Gap-based: positions are 0, 10, 20, … so reordering only touches affected rows
    return (last?.position ?? -10) + 10;
  }

  private async nextColumnPosition(dashboardId: string): Promise<number> {
    const last = await this.prisma.dashboardColumn.findFirst({
      where: { dashboardId },
      orderBy: { position: "desc" },
      select: { position: true },
    });
    return (last?.position ?? -10) + 10;
  }
}
