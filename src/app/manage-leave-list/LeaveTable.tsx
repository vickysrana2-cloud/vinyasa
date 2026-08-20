"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import type { CustomFilterProps } from "ag-grid-react";
import { AgGridReact, useGridFilter } from "ag-grid-react";
import {
  AllCommunityModule,
  ModuleRegistry,
  themeQuartz,
  type ColDef,
  type ColumnState,
  type GridApi,
  type GridReadyEvent,
  type IRowNode,
  type ValueFormatterParams,
  type ValueGetterParams,
} from "ag-grid-community";
import * as XLSX from "xlsx";
import {
  LEAVE_COLUMN_FIELDS,
  LEAVE_COLUMN_LABELS,
  type ColumnPreference,
  type DateRangeValue,
  type LeaveColumnField,
  type LeaveRecord,
  type LeaveTableHandle,
  type PinnedState,
} from "./types";
import { leaveRecords } from "./data";
import "./styles.css";

ModuleRegistry.registerModules([AllCommunityModule]);

/** Vinyasa-aligned skin for AG Grid. Adjust these to match the live design tokens. */
const vinyasaGridTheme = themeQuartz.withParams({
  accentColor: "#0f766e",
  backgroundColor: "#ffffff",
  headerBackgroundColor: "#f8fafc",
  headerTextColor: "#0f172a",
  headerFontWeight: 600,
  oddRowBackgroundColor: "#fafafa",
  borderColor: "#e2e8f0",
  borderRadius: 10,
  wrapperBorderRadius: 12,
  spacing: 8,
  fontFamily: "inherit",
  fontSize: 13.5,
});

const COLUMN_PREFS_STORAGE_KEY = "vinyasa:manage-leave-list:column-state";

function formatDisplayDate(iso: string): string {
  const [year, month, day] = iso.split("-");
  if (!year || !month || !day) return iso;
  return `${day}/${month}/${year}`;
}

function parseIsoDate(iso: string): Date {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, (month ?? 1) - 1, day ?? 1);
}

/** Reusable checkbox-list "select values" filter for categorical columns (Community-safe). */
function SelectValueFilter({ model, onModelChange, colDef, api }: CustomFilterProps<LeaveRecord>) {
  const field = colDef.field as keyof LeaveRecord;

  const options = useMemo(() => {
    const values = new Set<string>();
    api.forEachNode((node: IRowNode<LeaveRecord>) => {
      if (node.data) values.add(String(node.data[field]));
    });
    return Array.from(values).sort();
  }, [api, field]);

  const selected: string[] = model ?? options;

  useGridFilter({
    doesFilterPass(params) {
      const value = String(params.data[field]);
      return selected.includes(value);
    },
  });

  const toggle = (value: string) => {
    const isAllSelected = selected.length === options.length;
    const base = isAllSelected ? options : selected;
    const next = base.includes(value) ? base.filter((v) => v !== value) : [...base, value];
    onModelChange(next.length === options.length ? null : next);
  };

  return (
    <div className="w-48 p-2">
      <div className="mb-1 flex items-center justify-between px-1">
        <span className="text-xs font-medium text-slate-500">Select values</span>
        <button
          type="button"
          className="text-xs font-medium text-teal-700 hover:underline"
          onClick={() => onModelChange(null)}
        >
          Reset
        </button>
      </div>
      <ul className="max-h-56 overflow-y-auto">
        {options.map((value) => (
          <li key={value}>
            <label className="flex cursor-pointer items-center gap-2 rounded px-1 py-1 text-sm hover:bg-slate-50">
              <input
                type="checkbox"
                checked={selected.includes(value)}
                onChange={() => toggle(value)}
                className="h-3.5 w-3.5 accent-teal-700"
              />
              <span className="truncate">{value}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

function NoRowsOverlay() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-1 py-10 text-center">
      <p className="text-sm font-medium text-slate-700">No leave records found</p>
      <p className="text-sm text-slate-500">Try changing your search or filters.</p>
    </div>
  );
}

function TableSkeleton() {
  return (
    <div className="animate-pulse space-y-2 p-4">
      <div className="h-9 w-full rounded-md bg-slate-100" />
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="h-10 w-full rounded-md bg-slate-50" />
      ))}
    </div>
  );
}

/**
 * Stand-in for a future API call. Swap the resolved value for a real fetch
 * later; every caller already treats this as async and handles errors.
 */
async function loadLeaveRecords(): Promise<LeaveRecord[]> {
  await new Promise((resolve) => setTimeout(resolve, 350));
  return leaveRecords;
}

interface LeaveTableProps {
  searchText: string;
  dateRange: DateRangeValue;
  onColumnPreferencesChange: (prefs: ColumnPreference[]) => void;
}

const LeaveTable = forwardRef<LeaveTableHandle, LeaveTableProps>(function LeaveTable(
  { searchText, dateRange, onColumnPreferencesChange },
  ref,
) {
  const gridApiRef = useRef<GridApi<LeaveRecord> | null>(null);
  const [rowData, setRowData] = useState<LeaveRecord[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoadError(null);
    loadLeaveRecords()
      .then((records) => {
        if (!cancelled) setRowData(records);
      })
      .catch(() => {
        if (!cancelled) setLoadError("Unable to load leave records. Please try again.");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const columnDefs = useMemo<ColDef<LeaveRecord>[]>(
    () => [
      {
        field: "employeeName",
        headerName: LEAVE_COLUMN_LABELS.employeeName,
        filter: "agTextColumnFilter",
        floatingFilter: true,
        minWidth: 180,
        flex: 1.1,
      },
      {
        field: "leaveCategory",
        headerName: LEAVE_COLUMN_LABELS.leaveCategory,
        filter: "agTextColumnFilter",
        floatingFilter: true,
        minWidth: 160,
        flex: 1,
      },
      {
        field: "type",
        headerName: LEAVE_COLUMN_LABELS.type,
        filter: SelectValueFilter,
        floatingFilter: true,
        floatingFilterComponentParams: { suppressFilterButton: false },
        minWidth: 130,
        width: 130,
      },
      {
        field: "dateFrom",
        headerName: LEAVE_COLUMN_LABELS.dateFrom,
        filter: "agDateColumnFilter",
        floatingFilter: true,
        minWidth: 150,
        width: 150,
        valueGetter: (params: ValueGetterParams<LeaveRecord>) =>
          params.data ? parseIsoDate(params.data.dateFrom) : null,
        valueFormatter: (params: ValueFormatterParams<LeaveRecord>) =>
          params.data ? formatDisplayDate(params.data.dateFrom) : "",
        getQuickFilterText: (params) => (params.data ? formatDisplayDate(params.data.dateFrom) : ""),
        filterParams: {
          comparator: (filterDate: Date, cellValue: Date | null) => {
            if (!cellValue) return -1;
            const c = new Date(cellValue.getFullYear(), cellValue.getMonth(), cellValue.getDate());
            if (c < filterDate) return -1;
            if (c > filterDate) return 1;
            return 0;
          },
        },
      },
      {
        field: "dateTo",
        headerName: LEAVE_COLUMN_LABELS.dateTo,
        filter: "agDateColumnFilter",
        floatingFilter: true,
        minWidth: 150,
        width: 150,
        valueGetter: (params: ValueGetterParams<LeaveRecord>) =>
          params.data ? parseIsoDate(params.data.dateTo) : null,
        valueFormatter: (params: ValueFormatterParams<LeaveRecord>) =>
          params.data ? formatDisplayDate(params.data.dateTo) : "",
        getQuickFilterText: (params) => (params.data ? formatDisplayDate(params.data.dateTo) : ""),
        filterParams: {
          comparator: (filterDate: Date, cellValue: Date | null) => {
            if (!cellValue) return -1;
            const c = new Date(cellValue.getFullYear(), cellValue.getMonth(), cellValue.getDate());
            if (c < filterDate) return -1;
            if (c > filterDate) return 1;
            return 0;
          },
        },
      },
      {
        field: "leaveType",
        headerName: LEAVE_COLUMN_LABELS.leaveType,
        filter: SelectValueFilter,
        floatingFilter: true,
        minWidth: 140,
        width: 150,
      },
      {
        field: "reason",
        headerName: LEAVE_COLUMN_LABELS.reason,
        filter: "agTextColumnFilter",
        floatingFilter: true,
        minWidth: 260,
        flex: 2,
        tooltipField: "reason",
      },
    ],
    [],
  );

  const defaultColDef = useMemo<ColDef<LeaveRecord>>(
    () => ({
      sortable: true,
      resizable: true,
      filterParams: { buttons: ["reset", "apply"], closeOnApply: true },
    }),
    [],
  );

  const readColumnPreferences = useCallback((api: GridApi<LeaveRecord>): ColumnPreference[] => {
    const state = api.getColumnState();
    return LEAVE_COLUMN_FIELDS.map((field) => {
      const columnState = state.find((s) => s.colId === field);
      return {
        field,
        headerName: LEAVE_COLUMN_LABELS[field],
        hide: columnState?.hide ?? false,
        pinned: (columnState?.pinned as PinnedState) ?? null,
      };
    });
  }, []);

  const persistColumnState = useCallback((api: GridApi<LeaveRecord>) => {
    try {
      window.localStorage.setItem(COLUMN_PREFS_STORAGE_KEY, JSON.stringify(api.getColumnState()));
    } catch {
      // Best-effort only; table preferences are not critical data.
    }
  }, []);

  const notifyColumnPreferences = useCallback(
    (api: GridApi<LeaveRecord>) => {
      onColumnPreferencesChange(readColumnPreferences(api));
    },
    [onColumnPreferencesChange, readColumnPreferences],
  );

  const onGridReady = useCallback(
    (event: GridReadyEvent<LeaveRecord>) => {
      gridApiRef.current = event.api;
      try {
        const saved = window.localStorage.getItem(COLUMN_PREFS_STORAGE_KEY);
        if (saved) {
          const state = JSON.parse(saved) as ColumnState[];
          event.api.applyColumnState({ state, applyOrder: true });
        }
      } catch {
        // Ignore malformed/unavailable storage; grid falls back to defaults.
      }
      notifyColumnPreferences(event.api);
    },
    [notifyColumnPreferences],
  );

  const onColumnStateChanged = useCallback(() => {
    const api = gridApiRef.current;
    if (!api) return;
    persistColumnState(api);
    notifyColumnPreferences(api);
  }, [persistColumnState, notifyColumnPreferences]);

  const isExternalFilterPresent = useCallback(
    () => Boolean(dateRange.from || dateRange.to),
    [dateRange],
  );

  const doesExternalFilterPass = useCallback(
    (node: IRowNode<LeaveRecord>) => {
      if (!node.data) return true;
      const recordFrom = parseIsoDate(node.data.dateFrom).getTime();
      const recordTo = parseIsoDate(node.data.dateTo).getTime();
      const rangeFrom = dateRange.from ? parseIsoDate(dateRange.from).getTime() : null;
      const rangeTo = dateRange.to ? parseIsoDate(dateRange.to).getTime() : null;
      if (rangeFrom !== null && recordTo < rangeFrom) return false;
      if (rangeTo !== null && recordFrom > rangeTo) return false;
      return true;
    },
    [dateRange],
  );

  useEffect(() => {
    gridApiRef.current?.onFilterChanged();
  }, [dateRange]);

  const exportToExcel = useCallback(() => {
    const api = gridApiRef.current;
    if (!api) return;

    const visibleColumns = api
      .getColumnState()
      .filter((c) => !c.hide)
      .map((c) => c.colId)
      .filter((colId): colId is LeaveColumnField =>
        (LEAVE_COLUMN_FIELDS as readonly string[]).includes(colId),
      );

    const header = visibleColumns.map((field) => LEAVE_COLUMN_LABELS[field]);
    const rows: (string | number)[][] = [header];

    api.forEachNodeAfterFilterAndSort((node) => {
      if (!node.data) return;
      const record = node.data;
      rows.push(
        visibleColumns.map((field) => {
          if (field === "dateFrom" || field === "dateTo") {
            return formatDisplayDate(record[field]);
          }
          return record[field];
        }),
      );
    });

    const worksheet = XLSX.utils.aoa_to_sheet(rows);
    worksheet["!cols"] = visibleColumns.map((field) => ({
      wch: field === "reason" ? 42 : 20,
    }));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leave List");

    const today = new Date().toISOString().slice(0, 10);
    XLSX.writeFile(workbook, `Manage_Leave_List_${today}.xlsx`);
  }, []);

  useImperativeHandle(
    ref,
    (): LeaveTableHandle => ({
      exportToExcel,
      clearDataFilters: () => {
        gridApiRef.current?.setFilterModel(null);
      },
      setColumnHidden: (field, hide) => {
        gridApiRef.current?.setColumnsVisible([field], !hide);
      },
      setColumnPinned: (field, pinned) => {
        gridApiRef.current?.setColumnsPinned([field], pinned);
      },
      resetColumnPreferences: () => {
        const api = gridApiRef.current;
        if (!api) return;
        api.resetColumnState();
        try {
          window.localStorage.removeItem(COLUMN_PREFS_STORAGE_KEY);
        } catch {
          // Ignore.
        }
        notifyColumnPreferences(api);
      },
    }),
    [exportToExcel, notifyColumnPreferences],
  );

  if (loadError) {
    return (
      <div className="flex flex-col items-center justify-center gap-1 rounded-xl border border-slate-200 bg-white py-16 text-center">
        <p className="text-sm font-medium text-slate-700">{loadError}</p>
      </div>
    );
  }

  if (!rowData) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white">
        <TableSkeleton />
      </div>
    );
  }

  return (
    <div
      className="ag-theme-vinyasa-leave-list h-[600px] w-full overflow-hidden rounded-xl border border-slate-200"
      role="region"
      aria-label="Manage Leave List table"
    >
      <AgGridReact<LeaveRecord>
        theme={vinyasaGridTheme}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        quickFilterText={searchText}
        isExternalFilterPresent={isExternalFilterPresent}
        doesExternalFilterPass={doesExternalFilterPass}
        pagination
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 25, 50, 100]}
        animateRows
        noRowsOverlayComponent={NoRowsOverlay}
        onGridReady={onGridReady}
        onColumnMoved={onColumnStateChanged}
        onColumnVisible={onColumnStateChanged}
        onColumnPinned={onColumnStateChanged}
        onColumnResized={(e) => {
          if (e.finished) onColumnStateChanged();
        }}
        onSortChanged={onColumnStateChanged}
      />
    </div>
  );
});

export default LeaveTable;