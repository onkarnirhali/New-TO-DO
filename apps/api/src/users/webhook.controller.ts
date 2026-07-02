import {
  Controller,
  Post,
  Headers,
  RawBodyRequest,
  Req,
  HttpCode,
  BadRequestException,
  Logger,
} from "@nestjs/common";
import { Webhook } from "svix";
import type { Request } from "express";
import { Public } from "../auth/decorators/public.decorator.js";
import { AppConfigService } from "../config/config.service.js";
import { UsersService } from "./users.service.js";

// ── Clerk webhook payload shapes ───────────────────────────────────────────
// Only the fields we actually use — Clerk sends much more.

interface ClerkEmailAddress {
  email_address: string;
  id: string;
}

interface ClerkUserPayload {
  id: string;
  email_addresses: ClerkEmailAddress[];
  primary_email_address_id: string;
  first_name: string | null;
  last_name: string | null;
  image_url: string | null;
}

interface ClerkWebhookEvent {
  type: "user.created" | "user.updated" | "user.deleted" | string;
  data: ClerkUserPayload | { id: string };
}

// ── Controller ─────────────────────────────────────────────────────────────

@Public()
@Controller("webhooks")
export class WebhookController {
  private readonly logger = new Logger(WebhookController.name);

  constructor(
    private readonly config: AppConfigService,
    private readonly usersService: UsersService
  ) {}

  /**
   * POST /webhooks/clerk
   *
   * Receives user lifecycle events from Clerk. The webhook is signed
   * using the svix library — we verify the signature before trusting
   * any payload. Without this check, anyone could POST to this endpoint
   * and spoof user creation/deletion events.
   *
   * Security model:
   * - @Public() — Clerk sends this WITHOUT a user JWT, so the global
   *   ClerkAuthGuard must be bypassed.
   * - Svix signature verification takes the place of JWT auth here.
   * - We need the raw request body (not parsed JSON) to verify the HMAC.
   *
   * Raw body requirement:
   * NestJS parses JSON bodies by default, which would break the HMAC
   * check. We use `rawBody: true` in bootstrap (main.ts) + `@Req()` to
   * access the original bytes.
   */
  @Post("clerk")
  @HttpCode(200)
  async handleClerkWebhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers("svix-id") svixId: string,
    @Headers("svix-timestamp") svixTimestamp: string,
    @Headers("svix-signature") svixSignature: string
  ): Promise<{ received: boolean }> {
    if (!svixId || !svixTimestamp || !svixSignature) {
      throw new BadRequestException("Missing svix webhook headers");
    }

    const webhookSecret = this.config.clerkWebhookSecret;
    if (!webhookSecret) {
      this.logger.error("CLERK_WEBHOOK_SECRET is not configured");
      throw new BadRequestException("Webhook not configured");
    }

    const rawBody = req.rawBody;
    if (!rawBody) {
      throw new BadRequestException("Raw body unavailable — enable rawBody in bootstrap");
    }

    // Verify the svix signature. This throws if invalid.
    const wh = new Webhook(webhookSecret);
    let event: ClerkWebhookEvent;
    try {
      event = wh.verify(rawBody, {
        "svix-id": svixId,
        "svix-timestamp": svixTimestamp,
        "svix-signature": svixSignature,
      }) as ClerkWebhookEvent;
    } catch {
      this.logger.warn("Invalid webhook signature");
      throw new BadRequestException("Invalid webhook signature");
    }

    await this.handleEvent(event);
    return { received: true };
  }

  private async handleEvent(event: ClerkWebhookEvent): Promise<void> {
    this.logger.log(`Processing webhook: ${event.type}`);

    switch (event.type) {
      case "user.created":
      case "user.updated": {
        const data = event.data as ClerkUserPayload;
        const primary = data.email_addresses.find(
          (e) => e.id === data.primary_email_address_id
        );

        if (!primary) {
          this.logger.warn(`No primary email for Clerk user ${data.id} — skipping`);
          return;
        }

        const nameParts = [data.first_name, data.last_name].filter((p): p is string => Boolean(p));
        const name = nameParts.length > 0
          ? nameParts.join(" ")
          : (primary.email_address.split("@")[0] ?? "Unknown");

        await this.usersService.upsert({
          clerkId: data.id,
          email: primary.email_address,
          name,
          avatarUrl: data.image_url,
        });
        break;
      }

      case "user.deleted": {
        const { id } = event.data as { id: string };
        await this.usersService.deactivate(id);
        break;
      }

      default:
        this.logger.debug(`Unhandled webhook type: ${event.type}`);
    }
  }
}
