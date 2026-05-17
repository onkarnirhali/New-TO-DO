import { Controller, Get } from "@nestjs/common";

/**
 * Health check endpoint.
 *
 * Every production service needs one of these. It tells:
 * - Load balancers whether to send traffic here
 * - Deployment pipelines whether the deploy succeeded
 * - Monitoring tools whether the service is alive
 *
 * GET /health → { status: "ok", timestamp: "..." }
 */
@Controller("health")
export class HealthController {
  @Get()
  check(): { status: string; timestamp: string } {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
    };
  }
}
