import type { ID, ISODateString } from "./common.js";

/**
 * A Note can be standalone or linked to a Task.
 *
 * `contains_premium_content` is set to true if the note ever had
 * paid features applied (text wrap, image resize, AI rephrase).
 * This flag survives downgrades so we know which notes to handle
 * carefully — we never strip paid content, we only pause the controls.
 */
export interface Note {
  id: ID;
  userId: ID;
  title: string;
  /** TipTap JSON document — serialised rich text */
  content: object | null;
  /** Plain text preview — extracted from content for grid card display */
  contentPreview: string | null;
  isPasswordProtected: boolean;
  linkedTaskId: ID | null;
  containsPremiumContent: boolean;
  position: number;           // Display order in the grid
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

/**
 * What the API returns when listing notes.
 * Content is excluded — too large to send in a list response.
 * Full content only returned on individual note fetch.
 */
export type NoteListItem = Omit<Note, "content">;

export type CreateNoteInput = Pick<Note, "title" | "content" | "linkedTaskId">;

export type UpdateNoteInput = Partial<
  Pick<Note, "title" | "content" | "linkedTaskId" | "position">
>;

/** Sent when setting or changing a note's password. */
export interface SetNotePasswordInput {
  noteId: ID;
  /** Plain text — hashed on the backend before storage */
  password: string;
}

export interface UnlockNoteInput {
  noteId: ID;
  password: string;
}
