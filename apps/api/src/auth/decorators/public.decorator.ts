import { SetMetadata } from "@nestjs/common";

export const IS_PUBLIC_KEY = "isPublic";

/**
 * Mark a route as publicly accessible — skips the global ClerkAuthGuard.
 * Use on endpoints that must work without a session token:
 *   - GET /health
 *   - POST /webhooks/clerk
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
