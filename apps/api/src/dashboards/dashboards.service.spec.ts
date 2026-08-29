import type { Dashboard } from "@prisma/client";
import { DashboardsService } from "./dashboards.service";

describe("DashboardsService.create", () => {
  it("creates one dashboard atomically with the ordered default columns", async () => {
    const createdDashboard = {
      id: "dashboard-1",
      userId: "user-1",
      title: "Work",
      description: null,
      position: 0,
      createdAt: new Date("2026-08-28T00:00:00.000Z"),
      updatedAt: new Date("2026-08-28T00:00:00.000Z"),
    } satisfies Dashboard;
    const prisma = {
      dashboard: {
        findFirst: jest.fn().mockResolvedValue(null),
        create: jest.fn().mockResolvedValue(createdDashboard),
      },
    };
    const service = new DashboardsService(prisma as never);

    await service.create("user-1", { title: "Work" });

    expect(prisma.dashboard.create).toHaveBeenCalledTimes(1);
    expect(prisma.dashboard.create).toHaveBeenCalledWith({
      data: {
        userId: "user-1",
        title: "Work",
        description: null,
        position: 0,
        columns: {
          create: [
            { title: "To Do", position: 0 },
            { title: "In Progress", position: 10 },
            { title: "Done", position: 20 },
          ],
        },
      },
    });
  });
});
