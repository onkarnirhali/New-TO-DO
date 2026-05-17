/**
 * Common primitives shared across all domain types.
 *
 * These are the building blocks that every other type uses.
 * Centralising them here means a change to e.g. ID format
 * is one edit, not twenty.
 */

/** All database IDs are UUIDs represented as strings. */
export type ID = string;

/** ISO 8601 date-time string — always UTC from the API. */
export type ISODateString = string;

/** Subscription tiers. Drives all feature gating. */
export type SubscriptionTier = "free" | "paid";

/** Theme preference stored on the user profile. */
export type ThemePreference = "light" | "dark" | "system";

/**
 * Standard API response envelope.
 *
 * Every endpoint returns this shape. Consumers can always
 * check `success` before accessing `data`.
 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

/**
 * Standard paginated response.
 *
 * Used for lists that could grow large (notes, tasks).
 */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
