/**
 * @planote/types — single source of truth for all shared TypeScript types.
 *
 * Import from here everywhere:
 *   import type { Task, Note, User } from "@planote/types"
 *
 * Never duplicate these types in apps/web or apps/api.
 */

export * from "./common.js";
export * from "./user.js";
export * from "./dashboard.js";
export * from "./task.js";
export * from "./note.js";
