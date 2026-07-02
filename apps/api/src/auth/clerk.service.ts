import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { createClerkClient, verifyToken, type ClerkClient } from "@clerk/backend";
import { AppConfigService } from "../config/config.service.js";

export interface ClerkTokenPayload {
  clerkId: string;
}

@Injectable()
export class ClerkService {
  private readonly logger = new Logger(ClerkService.name);
  private readonly client: ClerkClient;
  private readonly secretKey: string;

  constructor(private readonly config: AppConfigService) {
    this.secretKey = config.clerkSecretKey;
    this.client = createClerkClient({ secretKey: this.secretKey });
  }

  async verifyToken(token: string): Promise<ClerkTokenPayload> {
    try {
      // verifyToken is a standalone function — it fetches Clerk's JWKS and
      // verifies the JWT signature, expiry, and issuer automatically.
      const payload = await verifyToken(token, { secretKey: this.secretKey });
      return { clerkId: payload.sub };
    } catch {
      this.logger.debug("Token verification failed");
      throw new UnauthorizedException("Invalid or expired session token");
    }
  }

  get clerkClient(): ClerkClient {
    return this.client;
  }
}
