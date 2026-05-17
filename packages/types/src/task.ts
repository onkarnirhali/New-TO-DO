import type { ID, ISODateString } from "./common.js";

export type TaskStatus = "active" | "done";

/**
 * The four visual states a task card can be in.
 * Derived on the frontend from status + dueDate — not stored in DB.
 */
export type TaskCardVariant = "normal" | "active" | "overdue" | "done";

export type ReminderType = "time" | "location";

/**
 * A time-based reminder — fires at a specific date/time.
 */
export interface TimeReminder {
  type: "time";
  remindAt: ISODateString;
  sent: boolean;
}

/**
 * A location-based reminder — fires when within `radiusMetres`
 * of the given GPS coordinates.
 *
 * This is a paid feature. Only stored when user has paid tier.
 */
export interface LocationReminder {
  type: "location";
  lat: number;
  lng: number;
  radiusMetres: number;
  label: string | null;       // e.g. "Lilavati Hospital"
  paused: boolean;            // true when user downgrades from paid
}

export type Reminder = TimeReminder | LocationReminder;

/**
 * A Task lives in one or more Dashboard Columns.
 *
 * The `dashboardIds` array supports cross-dashboard tasks —
 * the same task card can appear in multiple boards simultaneously.
 */
export interface Task {
  id: ID;
  userId: ID;
  columnId: ID;               // The column it currently sits in (primary placement)
  dashboardIds: ID[];         // All dashboards this task belongs to
  title: string;
  description: string | null;
  status: TaskStatus;
  dueDate: ISODateString | null;
  position: number;           // Order within the column
  reminder: Reminder | null;
  linkedNoteId: ID | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export type CreateTaskInput = Pick<
  Task,
  "columnId" | "dashboardIds" | "title" | "description" | "dueDate" | "reminder" | "linkedNoteId"
>;

export type UpdateTaskInput = Partial<
  Pick<Task, "title" | "description" | "dueDate" | "reminder" | "linkedNoteId" | "status" | "position" | "columnId" | "dashboardIds">
>;

/** Used when dragging a task to a new column. */
export interface MoveTaskInput {
  taskId: ID;
  targetColumnId: ID;
  newPosition: number;
}
