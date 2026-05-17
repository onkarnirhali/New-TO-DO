import type { ID, ISODateString, SubscriptionTier, ThemePreference } from "./common.js";

/**
 * The core User type.
 *
 * This represents a user as the API returns them.
 * Never put the password hash here — it should never
 * leave the backend.
 */
export interface User {
  id: ID;
  clerkId: string;       // Clerk's external user ID — used for auth lookups
  email: string;
  name: string;
  avatarUrl: string | null;
  tier: SubscriptionTier;
  isAdmin: boolean;
  isActive: boolean;
  themePreference: ThemePreference;
  onboardingCompleted: boolean;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

/**
 * The shape of a user as returned to the client.
 * Identical to User — kept separate so we can easily
 * strip or add fields in future without hunting down
 * every consumer.
 */
export type UserProfile = Omit<User, "clerkId" | "isAdmin">;

/** Admin-only view — includes fields regular users cannot see. */
export type AdminUserView = User & {
  lastLoginAt: ISODateString | null;
  dashboardCount: number;
  noteCount: number;
  taskCount: number;
};
