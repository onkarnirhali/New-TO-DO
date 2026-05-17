import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module.js";

/**
 * Bootstrap — the entry point for the NestJS application.
 *
 * This function:
 * 1. Creates the NestJS application
 * 2. Configures global middleware (validation, CORS)
 * 3. Starts listening on the configured port
 *
 * It runs once when the server starts.
 */
async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  /**
   * Global Validation Pipe
   *
   * This automatically validates every incoming request body
   * against the DTO (Data Transfer Object) class decorators.
   *
   * `whitelist: true` — strips any properties not declared in the DTO.
   *   Why: Prevents "mass assignment" attacks where a user sends
   *   extra fields like `{ isAdmin: true }` hoping the server
   *   saves them without checking.
   *
   * `forbidNonWhitelisted: true` — throws an error if unknown
   *   properties are sent, instead of silently stripping them.
   *   This makes the API contract explicit and strict.
   *
   * `transform: true` — automatically converts string params
   *   to their declared types (e.g., "123" → 123 for a number field).
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  /**
   * CORS Configuration
   *
   * Cross-Origin Resource Sharing — browsers block requests from
   * one origin (app.onkarn.info) to another (api.onkarn.info)
   * by default. We explicitly allow our frontend origins here.
   *
   * In production, this will be tightened to our exact domain.
   */
  app.enableCors({
    origin: process.env["ALLOWED_ORIGINS"]?.split(",") ?? ["http://localhost:3000"],
    credentials: true,
  });

  const port = process.env["PORT"] ?? 4000;
  await app.listen(port);

  console.log(`\n🚀 Planote API running on http://localhost:${port}`);
  console.log(`   Health check: http://localhost:${port}/health\n`);
}

void bootstrap();
