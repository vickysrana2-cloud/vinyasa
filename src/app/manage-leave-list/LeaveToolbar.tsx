"use client";

import { useState } from "react";
import { Download, RotateCcw, Search, SlidersHorizontal, X } from "lucide-react";
import ColumnMenu from "./ColumnMenu";
import type { ColumnPreference, LeaveColumnField, PinnedState } from "./types";

interface LeaveToolbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onExportExcel: () => void;
  onClearFilters: () => void;
  columns: ColumnPreference[];
  onToggleColumnVisibility: (field: LeaveColumnField, hide: boolean) => void;
  onChangeColumnPin: (field: LeaveColumnField, pinned: PinnedState) => void;
  onResetColumns: () => void;
}

export default function LeaveToolbar({
  searchValue,
  onSearchChange,
  onExportExcel,
  onClearFilters,
  columns,
  onToggleColumnVisibility,
  onChangeColumnPin,
  onResetColumns,
}: LeaveToolbarProps) {
  const [columnsOpen, setColumnsOpen] = useState(false);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3">
      <div className="relative flex-1 min-w-[220px] max-w-sm">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search..."
          aria-label="Search leave records"
          className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-8 text-sm text-slate-900 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-100"
        />
        {searchValue ? (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            aria-label="Clear search"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <X size={14} />
          </button>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onClearFilters}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200"
        >
          <RotateCcw size={14} />
          Clear Filters
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => setColumnsOpen((open) => !open)}
            aria-expanded={columnsOpen}
            aria-haspopup="dialog"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200"
          >
            <SlidersHorizontal size={14} />
            Columns
          </button>
          {columnsOpen ? (
            <ColumnMenu
              columns={columns}
              onToggleVisibility={onToggleColumnVisibility}
              onChangePin={onChangeColumnPin}
              onReset={onResetColumns}
              onClose={() => setColumnsOpen(false)}
            />
          ) : null}
        </div>

        <button
          type="button"
          onClick={onExportExcel}
          className="inline-flex items-center gap-1.5 rounded-lg bg-teal-700 px-3 py-2 text-sm font-medium text-white hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-300"
        >
          <Download size={14} />
          Excel
        </button>
      </div>
    </div>
  );
}