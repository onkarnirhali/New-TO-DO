import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { PrismaService } from "../database/prisma.service.js";
import { Prisma } from "@prisma/client";
import type { Note, Task } from "@prisma/client";
import type { CreateNoteDto } from "./dto/create-note.dto.js";
import type { UpdateNoteDto } from "./dto/update-note.dto.js";
import type { SetNotePasswordDto } from "./dto/set-note-password.dto.js";
import type { VerifyNotePasswordDto } from "./dto/verify-note-password.dto.js";

const PASSWORD_HASH_ROUNDS = 10;

// The shape returned by list/findOne — never leaks passwordHash. content and
// contentPreview are stripped for locked notes until unlocked via /unlock.
export type SafeNote = Omit<Note, "passwordHash"> & {
  linkedTasks: Array<{ id: string; title: string }>;
};

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) {}

  // ── Notes CRUD ──────────────────────────────────────────────────────────

  async list(userId: string): Promise<SafeNote[]> {
    const notes = await this.prisma.note.findMany({
      where: { userId },
      orderBy: [{ position: "asc" }, { createdAt: "asc" }],
      include: { linkedTasks: { select: { id: true, title: true } } },
    });
    return notes.map((note) => this.toSafeNote(note));
  }

  async findOne(id: string, userId: string): Promise<SafeNote> {
    const note = await this.requireNoteWithRelations(id, userId);
    return this.toSafeNote(note);
  }

  async create(userId: string, dto: CreateNoteDto): Promise<SafeNote> {
    const position = await this.nextNotePosition(userId);
    const note = await this.prisma.note.create({
      data: {
        userId,
        title: dto.title?.trim() || "Untitled Note",
        content: this.toJsonInput(dto.content),
        contentPreview: dto.contentPreview ?? null,
        position,
      },
      include: { linkedTasks: { select: { id: true, title: true } } },
    });
    return this.toSafeNote(note);
  }

  async update(id: string, userId: string, dto: UpdateNoteDto): Promise<SafeNote> {
    await this.requireNote(id, userId);

    const note = await this.prisma.note.update({
      where: { id },
      data: {
        ...(dto.title !== undefined && { title: dto.title }),
        ...(dto.content !== undefined && { content: this.toJsonInput(dto.content) }),
        ...(dto.contentPreview !== undefined && { contentPreview: dto.contentPreview }),
      },
      include: { linkedTasks: { select: { id: true, title: true } } },
    });
    return this.toSafeNote(note);
  }

  async remove(id: string, userId: string): Promise<void> {
    await this.requireNote(id, userId);
    // Task.linkedNoteId uses onDelete: SetNull — linked tasks are preserved,
    // just unlinked, so this is safe without a manual cascade check.
    await this.prisma.note.delete({ where: { id } });
  }

  // ── Password protection ────────────────────────────────────────────────

  async setPassword(
    id: string,
    userId: string,
    dto: SetNotePasswordDto
  ): Promise<void> {
    await this.requireNote(id, userId);
    const passwordHash = await bcrypt.hash(dto.password, PASSWORD_HASH_ROUNDS);
    await this.prisma.note.update({
      where: { id },
      data: {
        isPasswordProtected: true,
        passwordHash,
        containsPremiumContent: true,
      },
    });
  }

  async removePassword(id: string, userId: string): Promise<void> {
    await this.requireNote(id, userId);
    await this.prisma.note.update({
      where: { id },
      data: { isPasswordProtected: false, passwordHash: null },
    });
  }

  /** Verifies the note password and, on success, returns the unlocked note. */
  async unlock(
    id: string,
    userId: string,
    dto: VerifyNotePasswordDto
  ): Promise<SafeNote> {
    const note = await this.requireNoteWithRelations(id, userId);
    if (!note.isPasswordProtected || !note.passwordHash) {
      throw new BadRequestException("This note is not password protected");
    }

    const matches = await bcrypt.compare(dto.password, note.passwordHash);
    if (!matches) {
      throw new UnauthorizedException("Incorrect password");
    }

    return this.toSafeNote(note, { forceReveal: true });
  }

  // ── Task linking ────────────────────────────────────────────────────────
  // The FK lives on Task (linkedNoteId), so linking/unlinking from the Notes
  // side just updates the target task after verifying both sides are owned
  // by the caller. Mirrors TasksService.requireNoteForUser in reverse.

  async linkTask(noteId: string, taskId: string, userId: string): Promise<void> {
    await this.requireNote(noteId, userId);
    const task = await this.requireTaskForUser(taskId, userId);

    if (task.linkedNoteId === noteId) return; // already linked — no-op

    await this.prisma.task.update({
      where: { id: taskId },
      data: { linkedNoteId: noteId },
    });
  }

  async unlinkTask(noteId: string, taskId: string, userId: string): Promise<void> {
    await this.requireNote(noteId, userId);
    const task = await this.requireTaskForUser(taskId, userId);

    if (task.linkedNoteId !== noteId) {
      throw new BadRequestException("This task is not linked to this note");
    }

    await this.prisma.task.update({
      where: { id: taskId },
      data: { linkedNoteId: null },
    });
  }

  // ── Private helpers ─────────────────────────────────────────────────────

  private async requireNote(id: string, userId: string): Promise<Note> {
    const note = await this.prisma.note.findFirst({ where: { id, userId } });
    if (!note) throw new NotFoundException("Note not found");
    return note;
  }

  private async requireNoteWithRelations(
    id: string,
    userId: string
  ): Promise<Note & { linkedTasks: Array<{ id: string; title: string }> }> {
    const note = await this.prisma.note.findFirst({
      where: { id, userId },
      include: { linkedTasks: { select: { id: true, title: true } } },
    });
    if (!note) throw new NotFoundException("Note not found");
    return note;
  }

  private async requireTaskForUser(taskId: string, userId: string): Promise<Task> {
    const task = await this.prisma.task.findFirst({ where: { id: taskId, userId } });
    if (!task) throw new NotFoundException("Task not found");
    return task;
  }

  /**
   * TipTap sends either a JSON document or nothing at all. Prisma's Json
   * field needs the DB-null sentinel (not JS null/undefined) to clear the
   * column, and a plain object otherwise.
   */
  private toJsonInput(
    value: unknown
  ): Prisma.InputJsonValue | typeof Prisma.DbNull {
    if (value === null || value === undefined) return Prisma.DbNull;
    return value as Prisma.InputJsonValue;
  }

  private async nextNotePosition(userId: string): Promise<number> {
    const last = await this.prisma.note.findFirst({
      where: { userId },
      orderBy: { position: "desc" },
      select: { position: true },
    });
    return (last?.position ?? -10) + 10;
  }

  /**
   * Strips passwordHash always, and strips content/contentPreview for locked
   * notes unless forceReveal is set (used right after a successful /unlock).
   */
  private toSafeNote(
    note: Note & { linkedTasks: Array<{ id: string; title: string }> },
    options: { forceReveal?: boolean } = {}
  ): SafeNote {
    const base: SafeNote = {
      id: note.id,
      userId: note.userId,
      title: note.title,
      content: note.content,
      contentPreview: note.contentPreview,
      isPasswordProtected: note.isPasswordProtected,
      containsPremiumContent: note.containsPremiumContent,
      position: note.position,
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
      linkedTasks: note.linkedTasks,
    };
    if (note.isPasswordProtected && !options.forceReveal) {
      return { ...base, content: null, contentPreview: null };
    }
    return base;
  }
}
