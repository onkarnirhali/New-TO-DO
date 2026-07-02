import { Module } from "@nestjs/common";
import { UsersService } from "./users.service.js";
import { WebhookController } from "./webhook.controller.js";

@Module({
  controllers: [WebhookController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
