import { Module } from "@nestjs/common";
import { NotesService } from "./notes.service.js";
import { NotesController } from "./notes.controller.js";
import { UsersModule } from "../users/users.module.js";

@Module({
  imports: [UsersModule],
  controllers: [NotesController],
  providers: [NotesService],
  exports: [NotesService],
})
export class NotesModule {}
