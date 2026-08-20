"use client";

import { useCallback, useRef, useState } from "react";
import LeaveFilters from "./LeaveFilters";
import LeaveToolbar from "./LeaveToolbar";
import LeaveTable from "./LeaveTable";
import {
  LEAVE_COLUMN_FIELDS,
  LEAVE_COLUMN_LABELS,
  type ColumnPreference,
  type DateRangeValue,
  type LeaveColumnField,
  type LeaveTableHandle,
  type PinnedState,
} from "./types";

const defaultColumnPreferences: ColumnPreference[] = LEAVE_COLUMN_FIELDS.map((field) => ({
  field,
  headerName: LEAVE_COLUMN_LABELS[field],
  hide: false,
  pinned: null,
}));

export default function ManageLeaveListPage() {
  const tableRef = useRef<LeaveTableHandle>(null);
  const [searchText, setSearchText] = useState("");
  const [dateRange, setDateRange] = useState<DateRangeValue>({ from: null, to: null });
  const [columnPreferences, setColumnPreferences] = useState<ColumnPreference[]>(
    defaultColumnPreferences,
  );

  const handleClearFilters = useCallback(() => {
    setSearchText("");
    setDateRange({ from: null, to: null });
    tableRef.current?.clearDataFilters();
  }, []);

  const handleToggleColumnVisibility = useCallback((field: LeaveColumnField, hide: boolean) => {
    tableRef.current?.setColumnHidden(field, hide);
  }, []);

  const handleChangeColumnPin = useCallback((field: LeaveColumnField, pinned: PinnedState) => {
    tableRef.current?.setColumnPinned(field, pinned);
  }, []);

  const handleResetColumns = useCallback(() => {
    tableRef.current?.resetColumnPreferences();
  }, []);

  const handleExportExcel = useCallback(() => {
    tableRef.current?.exportToExcel();
  }, []);

  return (
    <div className="mx-auto mt-16 flex w-full max-w-7xl flex-col gap-4 px-4 py-8 sm:px-6 lg:px-8">
      <div>
  <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
    Manage Leave
  </h1>
  <p className="mt-1 text-sm text-slate-500">
    View and manage employee leave records.
  </p>
</div>

      <LeaveFilters
        value={dateRange}
        onApply={setDateRange}
        onReset={() => setDateRange({ from: null, to: null })}
      />

      <LeaveToolbar
        searchValue={searchText}
        onSearchChange={setSearchText}
        onExportExcel={handleExportExcel}
        onClearFilters={handleClearFilters}
        columns={columnPreferences}
        onToggleColumnVisibility={handleToggleColumnVisibility}
        onChangeColumnPin={handleChangeColumnPin}
        onResetColumns={handleResetColumns}
      />

      <div className="w-full overflow-x-auto">
        <LeaveTable
          ref={tableRef}
          searchText={searchText}
          dateRange={dateRange}
          onColumnPreferencesChange={setColumnPreferences}
        />
      </div>
    </div>
  );
}