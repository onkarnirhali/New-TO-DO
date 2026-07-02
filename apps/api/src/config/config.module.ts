import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { configuration } from "./configuration.js";
import { AppConfigService } from "./config.service.js";

/**
 * AppConfigModule — loads and validates environment variables.
 *
 * @Global() means any module that imports AppModule automatically
 * has access to AppConfigService without importing this module explicitly.
 * Config is needed everywhere — making it global avoids repetitive imports.
 *
 * isGlobal: true on ConfigModule does the same for NestJS's own ConfigService.
 * envFilePath tells it where to find the .env file.
 * load: [configuration] runs our validation function at startup.
 * cache: true means the config is read once and cached — no file I/O
 * on every config access.
 */
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
      load: [configuration],
      cache: true,
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
