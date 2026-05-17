import type { ID, ISODateString } from "./common.js";

/**
 * A Dashboard is a named Kanban board owned by one user.
 * It contains Columns, which contain Tasks.
 */
export interface Dashboard {
  id: ID;
  userId: ID;
  title: string;
  description: string | null;
  /** Display order in the left nav — lower number = higher up */
  position: number;
  columns: DashboardColumn[];
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

/**
 * A column inside a Dashboard (e.g. "Todo", "In Progress", "Done").
 * Each dashboard has its own independent set of columns.
 */
export interface DashboardColumn {
  id: ID;
  dashboardId: ID;
  title: string;
  /** Display order within the board — lower = further left */
  position: number;
  /** Visual accent colour for the column header (optional) */
  color: string | null;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export type CreateDashboardInput = Pick<Dashboard, "title" | "description">;
export type UpdateDashboardInput = Partial<CreateDashboardInput>;

export type CreateColumnInput = Pick<DashboardColumn, "dashboardId" | "title" | "color">;
export type UpdateColumnInput = Partial<Pick<DashboardColumn, "title" | "color" | "position">>;
