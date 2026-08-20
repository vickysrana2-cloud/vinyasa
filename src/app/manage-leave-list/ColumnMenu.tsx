"use client";

import { useEffect, useRef } from "react";
import { PinOff } from "lucide-react";
import type { ColumnPreference, LeaveColumnField, PinnedState } from "./types";

interface ColumnMenuProps {
  columns: ColumnPreference[];
  onToggleVisibility: (field: LeaveColumnField, hide: boolean) => void;
  onChangePin: (field: LeaveColumnField, pinned: PinnedState) => void;
  onReset: () => void;
  onClose: () => void;
}

/**
 * Custom "Columns" panel: show/hide + pin left/right/unpin per column.
 *
 * AG Grid Community exposes sorting, filtering, resizing, reordering, and
 * pinning natively, but the column tool panel (a persistent show/hide list)
 * is an Enterprise-only feature. This component fills that specific gap
 * rather than re-implementing anything AG Grid already provides.
 */
export default function ColumnMenu({
  columns,
  onToggleVisibility,
  onChangePin,
  onReset,
  onClose,
}: ColumnMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-label="Column settings"
      className="absolute right-0 top-full z-20 mt-2 w-72 rounded-xl border border-slate-200 bg-white p-3 shadow-lg"
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-800">Columns</span>
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-medium text-teal-700 hover:underline"
        >
          Reset Columns
        </button>
      </div>

      <ul className="max-h-80 space-y-1 overflow-y-auto">
        {columns.map((column) => (
          <li
            key={column.field}
            className="flex items-center justify-between gap-2 rounded-lg px-1 py-1.5 hover:bg-slate-50"
          >
            <label className="flex flex-1 cursor-pointer items-center gap-2 text-sm text-slate-700">
              <input
                type="checkbox"
                checked={!column.hide}
                onChange={(e) => onToggleVisibility(column.field, !e.target.checked)}
                className="h-4 w-4 accent-teal-700"
              />
              <span className="truncate">{column.headerName}</span>
            </label>

            <div className="flex items-center gap-1" role="group" aria-label={`Pin ${column.headerName}`}>
              <button
                type="button"
                onClick={() => onChangePin(column.field, column.pinned === "left" ? null : "left")}
                aria-pressed={column.pinned === "left"}
                className={`rounded-md border px-1.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${
                  column.pinned === "left"
                    ? "border-teal-600 bg-teal-50 text-teal-700"
                    : "border-slate-200 text-slate-500 hover:bg-slate-100"
                }`}
                title="Pin left"
              >
                L
              </button>
              <button
                type="button"
                onClick={() => onChangePin(column.field, column.pinned === "right" ? null : "right")}
                aria-pressed={column.pinned === "right"}
                className={`rounded-md border px-1.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${
                  column.pinned === "right"
                    ? "border-teal-600 bg-teal-50 text-teal-700"
                    : "border-slate-200 text-slate-500 hover:bg-slate-100"
                }`}
                title="Pin right"
              >
                R
              </button>
              {column.pinned ? (
                <button
                  type="button"
                  onClick={() => onChangePin(column.field, null)}
                  className="rounded-md border border-slate-200 p-1 text-slate-500 hover:bg-slate-100"
                  title="Unpin"
                  aria-label={`Unpin ${column.headerName}`}
                >
                  <PinOff size={12} />
                </button>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}