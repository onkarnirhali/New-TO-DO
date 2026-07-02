import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ClerkService } from "./clerk.service.js";
import { ClerkAuthGuard } from "./guards/clerk-auth.guard.js";

/**
 * AuthModule — Clerk JWT authentication.
 *
 * Registers ClerkAuthGuard as a GLOBAL guard via APP_GUARD.
 * This means EVERY route is protected by default.
 * Use @Public() on individual routes to opt out.
 *
 * Exports ClerkService so other modules (UsersModule webhook handler)
 * can call clerk.clerkClient.users.getUser() if needed.
 */
@Module({
  providers: [
    ClerkService,
    {
      provide: APP_GUARD,
      useClass: ClerkAuthGuard,
    },
  ],
  exports: [ClerkService],
})
export class AuthModule {}
