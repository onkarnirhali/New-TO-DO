import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service.js";
import type { User } from "@prisma/client";

export interface UpsertUserInput {
  clerkId: string;
  email: string;
  name: string;
  avatarUrl?: string | null;
}

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly prisma: PrismaService) {}

  async findByClerkId(clerkId: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { clerkId } });
  }

  /**
   * Resolves a Clerk user ID to our internal User row.
   * Throws 401 if the user hasn't been synced yet (webhook race condition)
   * or if the account is deactivated.
   *
   * Call this at the top of any service method that needs the internal userId.
   */
  async requireByClerkId(clerkId: string): Promise<User> {
    const user = await this.findByClerkId(clerkId);
    if (!user || !user.isActive) {
      throw new UnauthorizedException(
        "User account not found. If you just signed up, please wait a moment for your account to sync."
      );
    }
    return user;
  }

  /**
   * Creates a new user or updates an existing one matching the clerkId.
   * Called by the Clerk webhook on user.created and user.updated events.
   */
  async upsert(input: UpsertUserInput): Promise<User> {
    const { clerkId, email, name, avatarUrl } = input;

    // exactOptionalPropertyTypes: avatarUrl is `string | null` in the schema,
    // but our input allows `undefined`. Normalise to null before passing to Prisma.
    const normalizedAvatar = avatarUrl ?? null;

    const user = await this.prisma.user.upsert({
      where: { clerkId },
      create: { clerkId, email, name, avatarUrl: normalizedAvatar },
      update: { email, name, avatarUrl: normalizedAvatar },
    });

    this.logger.log(`Upserted user ${clerkId} (${email})`);
    return user;
  }

  /**
   * Marks the user as inactive. We never hard-delete — data is preserved
   * in case the user re-activates their Clerk account.
   */
  async deactivate(clerkId: string): Promise<void> {
    await this.prisma.user.updateMany({
      where: { clerkId },
      data: { isActive: false },
    });
    this.logger.log(`Deactivated user ${clerkId}`);
  }

  async recordLogin(clerkId: string): Promise<void> {
    await this.prisma.user.updateMany({
      where: { clerkId },
      data: { lastLoginAt: new Date() },
    });
  }
}
