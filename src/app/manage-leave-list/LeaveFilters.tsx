"use client";

import { useState } from "react";
import type { DateRangeValue } from "./types";

interface LeaveFiltersProps {
  value: DateRangeValue;
  onApply: (range: DateRangeValue) => void;
  onReset: () => void;
}

export default function LeaveFilters({ value, onApply, onReset }: LeaveFiltersProps) {
  const [draft, setDraft] = useState<DateRangeValue>(value);
  const [error, setError] = useState<string | null>(null);

  const handleApply = () => {
    if (draft.from && draft.to && draft.from > draft.to) {
      setError("From Date cannot be after To Date.");
      return;
    }
    setError(null);
    onApply(draft);
  };

  const handleReset = () => {
    setDraft({ from: null, to: null });
    setError(null);
    onReset();
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="leave-date-from" className="text-sm font-medium text-slate-700">
            From Date
          </label>
          <input
            id="leave-date-from"
            type="date"
            value={draft.from ?? ""}
            max={draft.to ?? undefined}
            onChange={(e) => setDraft((d) => ({ ...d, from: e.target.value || null }))}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-100"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="leave-date-to" className="text-sm font-medium text-slate-700">
            To Date
          </label>
          <input
            id="leave-date-to"
            type="date"
            value={draft.to ?? ""}
            min={draft.from ?? undefined}
            onChange={(e) => setDraft((d) => ({ ...d, to: e.target.value || null }))}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-100"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleApply}
            className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-300"
          >
            Apply
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200"
          >
            Reset
          </button>
        </div>
      </div>

      {error ? (
        <p role="alert" className="mt-2 text-sm font-medium text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}