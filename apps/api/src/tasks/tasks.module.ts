import { Module } from "@nestjs/common";
import { TasksService } from "./tasks.service.js";
import { TasksController } from "./tasks.controller.js";
import { UsersModule } from "../users/users.module.js";

@Module({
  imports: [UsersModule],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
