import { PATH_METADATA } from "@nestjs/common/constants";
import { GUARDS_METADATA } from "@nestjs/common/constants";
import { AdminGuard } from "../auth/guards/admin.guard";
import { AdminHealthController } from "./admin-health.controller";

describe("AdminHealthController", () => {
  it("delegates the compact response to the platform health service", async () => {
    const response = {
      status: "ok" as const,
      checks: {
        api: { status: "ok" as const },
        database: { status: "ok" as const },
        redis: { status: "ok" as const },
        storage: { status: "ok" as const },
      },
    };
    const health = { getStatus: jest.fn().mockResolvedValue(response) };
    const controller = new AdminHealthController(health as never);

    await expect(controller.check()).resolves.toEqual(response);
    expect(health.getStatus).toHaveBeenCalledTimes(1);
  });

  it("is registered at the admin health path behind the local admin guard", () => {
    expect(Reflect.getMetadata(PATH_METADATA, AdminHealthController)).toBe("admin/health");
    expect(Reflect.getMetadata(GUARDS_METADATA, AdminHealthController)).toContain(AdminGuard);
  });
});
