import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { NotesService } from "./notes.service.js";
import { UsersService } from "../users/users.service.js";
import { CurrentUser } from "../auth/decorators/current-user.decorator.js";
import type { ClerkTokenPayload } from "../auth/clerk.service.js";
import { CreateNoteDto } from "./dto/create-note.dto.js";
import { UpdateNoteDto } from "./dto/update-note.dto.js";
import { SetNotePasswordDto } from "./dto/set-note-password.dto.js";
import { VerifyNotePasswordDto } from "./dto/verify-note-password.dto.js";

@Controller("notes")
export class NotesController {
  constructor(
    private readonly notesService: NotesService,
    private readonly usersService: UsersService
  ) {}

  private async resolveUserId(clerkUser: ClerkTokenPayload): Promise<string> {
    const user = await this.usersService.requireByClerkId(clerkUser.clerkId);
    return user.id;
  }

  // ── Notes ───────────────────────────────────────────────────────────────

  @Get()
  async list(@CurrentUser() clerkUser: ClerkTokenPayload) {
    const userId = await this.resolveUserId(clerkUser);
    return this.notesService.list(userId);
  }

  @Post()
  async create(
    @CurrentUser() clerkUser: ClerkTokenPayload,
    @Body() dto: CreateNoteDto
  ) {
    const userId = await this.resolveUserId(clerkUser);
    return this.notesService.create(userId, dto);
  }

  @Get(":id")
  async findOne(
    @CurrentUser() clerkUser: ClerkTokenPayload,
    @Param("id") id: string
  ) {
    const userId = await this.resolveUserId(clerkUser);
    return this.notesService.findOne(id, userId);
  }

  @Patch(":id")
  async update(
    @CurrentUser() clerkUser: ClerkTokenPayload,
    @Param("id") id: string,
    @Body() dto: UpdateNoteDto
  ) {
    const userId = await this.resolveUserId(clerkUser);
    return this.notesService.update(id, userId, dto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @CurrentUser() clerkUser: ClerkTokenPayload,
    @Param("id") id: string
  ) {
    const userId = await this.resolveUserId(clerkUser);
    await this.notesService.remove(id, userId);
  }

  // ── Password protection ─────────────────────────────────────────────────

  @Post(":id/password")
  @HttpCode(HttpStatus.NO_CONTENT)
  async setPassword(
    @CurrentUser() clerkUser: ClerkTokenPayload,
    @Param("id") id: string,
    @Body() dto: SetNotePasswordDto
  ) {
    const userId = await this.resolveUserId(clerkUser);
    await this.notesService.setPassword(id, userId, dto);
  }

  @Delete(":id/password")
  @HttpCode(HttpStatus.NO_CONTENT)
  async removePassword(
    @CurrentUser() clerkUser: ClerkTokenPayload,
    @Param("id") id: string
  ) {
    const userId = await this.resolveUserId(clerkUser);
    await this.notesService.removePassword(id, userId);
  }

  @Post(":id/unlock")
  async unlock(
    @CurrentUser() clerkUser: ClerkTokenPayload,
    @Param("id") id: string,
    @Body() dto: VerifyNotePasswordDto
  ) {
    const userId = await this.resolveUserId(clerkUser);
    return this.notesService.unlock(id, userId, dto);
  }

  // ── Task linking ────────────────────────────────────────────────────────

  @Post(":id/tasks/:taskId")
  @HttpCode(HttpStatus.NO_CONTENT)
  async linkTask(
    @CurrentUser() clerkUser: ClerkTokenPayload,
    @Param("id") id: string,
    @Param("taskId") taskId: string
  ) {
    const userId = await this.resolveUserId(clerkUser);
    await this.notesService.linkTask(id, taskId, userId);
  }

  @Delete(":id/tasks/:taskId")
  @HttpCode(HttpStatus.NO_CONTENT)
  async unlinkTask(
    @CurrentUser() clerkUser: ClerkTokenPayload,
    @Param("id") id: string,
    @Param("taskId") taskId: string
  ) {
    const userId = await this.resolveUserId(clerkUser);
    await this.notesService.unlinkTask(id, taskId, userId);
  }
}
