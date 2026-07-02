import { NestFactory } from "@nestjs/core";
import { ValidationPipe, Logger } from "@nestjs/common";
import { AppModule } from "./app.module.js";
import { AppConfigService } from "./config/config.service.js";

async function bootstrap(): Promise<void> {
  const logger = new Logger("Bootstrap");
  // rawBody: true makes req.rawBody available — required for svix webhook
  // signature verification. The HMAC is computed over the exact bytes Clerk
  // sent; once the body is parsed to JSON and re-serialised, the signature
  // no longer matches.
  const app = await NestFactory.create(AppModule, { rawBody: true });

  // Retrieve the typed config service — if any required env vars are
  // missing, this is where the app crashes with a clear error message.
  const config = app.get(AppConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  app.enableCors({
    origin: config.allowedOrigins,
    credentials: true,
  });

  await app.listen(config.port);

  logger.log(`🚀 Planote API running on http://localhost:${config.port}`);
  logger.log(`   Health: http://localhost:${config.port}/health`);
  logger.log(`   Environment: ${config.isProduction ? "production" : "development"}`);
}

void bootstrap();
