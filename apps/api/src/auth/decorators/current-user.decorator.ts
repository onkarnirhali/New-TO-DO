import { createParamDecorator } from "@nestjs/common";
import type { ExecutionContext } from "@nestjs/common";
import type { Request } from "express";
import type { ClerkTokenPayload } from "../clerk.service.js";

/**
 * Extracts the authenticated user from the request.
 *
 * Usage in a controller:
 *   async getMe(@CurrentUser() user: ClerkTokenPayload) { ... }
 *
 * The ClerkAuthGuard populates request.user before this runs.
 * Only valid on routes that are NOT marked @Public().
 */
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): ClerkTokenPayload => {
    const request = ctx.switchToHttp().getRequest<Request & { user: ClerkTokenPayload }>();
    return request.user;
  }
);
