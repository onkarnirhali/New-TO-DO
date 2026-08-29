import { ForbiddenException } from "@nestjs/common";
import type { ExecutionContext } from "@nestjs/common";
import { AdminGuard } from "./admin.guard";

const activeAdmin = {
  id: "user-1",
  clerkId: "clerk-user-1",
  email: "admin@example.com",
  name: "Admin",
  avatarUrl: null,
  tier: "FREE",
  isAdmin: true,
  isActive: true,
  themePreference: "SYSTEM",
  onboardingCompleted: true,
  lastLoginAt: null,
  createdAt: new Date("2026-08-29T00:00:00.000Z"),
  updatedAt: new Date("2026-08-29T00:00:00.000Z"),
};

function contextFor(clerkId?: string): ExecutionContext {
  return {
    switchToHttp: () => ({
      getRequest: () => ({ user: clerkId ? { clerkId } : undefined }),
    }),
  } as unknown as ExecutionContext;
}

describe("AdminGuard", () => {
  it("allows an active local administrator", async () => {
    const users = { findByClerkId: jest.fn().mockResolvedValue(activeAdmin) };
    const guard = new AdminGuard(users as never);

    await expect(guard.canActivate(contextFor(activeAdmin.clerkId))).resolves.toBe(true);
    expect(users.findByClerkId).toHaveBeenCalledWith(activeAdmin.clerkId);
  });

  it.each([
    ["has no local user", null],
    ["is inactive", { ...activeAdmin, isActive: false }],
    ["is not an administrator", { ...activeAdmin, isAdmin: false }],
  ])("forbids a caller that %s", async (_description, user) => {
    const users = { findByClerkId: jest.fn().mockResolvedValue(user) };
    const guard = new AdminGuard(users as never);

    await expect(guard.canActivate(contextFor("clerk-user-1"))).rejects.toBeInstanceOf(
      ForbiddenException
    );
  });
});
