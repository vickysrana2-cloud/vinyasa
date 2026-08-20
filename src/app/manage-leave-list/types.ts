/**
 * Manage Leave List — types
 *
 * All types used by this feature live here. Nothing here is imported
 * by (or imports from) the rest of the Vinyasa app.
 */

/** Whether a leave record is paid or unpaid. */
export type LeavePaymentType = "Paid" | "Unpaid";

/** Granularity of a single leave record. */
export type LeaveDuration = "Full Day" | "Half Day" | "Short Leave";

/** A single row in the Manage Leave List table. */
export interface LeaveRecord {
  id: string;
  employeeName: string;
  leaveCategory: string;
  type: LeavePaymentType;
  /** ISO date string (YYYY-MM-DD). Kept as a real date, never a display string. */
  dateFrom: string;
  /** ISO date string (YYYY-MM-DD). Kept as a real date, never a display string. */
  dateTo: string;
  leaveType: LeaveDuration;
  reason: string;
}

/** The top-of-page From/To date range filter. `null` means "no bound". */
export interface DateRangeValue {
  from: string | null;
  to: string | null;
}

/** Result of validating a candidate date range before it can be applied. */
export interface DateRangeValidation {
  valid: boolean;
  message: string | null;
}

/** Where a column is pinned, mirroring AG Grid's own column pinned state. */
export type PinnedState = "left" | "right" | null;

/** UI-facing description of a single column's current state, for the Columns panel. */
export interface ColumnPreference {
  field: LeaveColumnField;
  headerName: string;
  hide: boolean;
  pinned: PinnedState;
}

/** The canonical set of data fields shown in the grid, in default order. */
export const LEAVE_COLUMN_FIELDS = [
  "employeeName",
  "leaveCategory",
  "type",
  "dateFrom",
  "dateTo",
  "leaveType",
  "reason",
] as const;

export type LeaveColumnField = (typeof LEAVE_COLUMN_FIELDS)[number];

/** Human-readable labels for each column, used by the toolbar's Columns panel and Excel export. */
export const LEAVE_COLUMN_LABELS: Record<LeaveColumnField, string> = {
  employeeName: "Employee Name",
  leaveCategory: "Leave Category",
  type: "Type",
  dateFrom: "Date From",
  dateTo: "Date To",
  leaveType: "Leave Type",
  reason: "Reason For Leave",
};

/** Imperative handle exposed by LeaveTable so the toolbar/filters (in page.tsx) can drive the grid. */
export interface LeaveTableHandle {
  exportToExcel: () => void;
  clearDataFilters: () => void;
  setColumnHidden: (field: LeaveColumnField, hide: boolean) => void;
  setColumnPinned: (field: LeaveColumnField, pinned: PinnedState) => void;
  resetColumnPreferences: () => void;
}