"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  InitialTableState,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { DataTablePagination } from "./data-table-pagination";
import { Dispatch, SetStateAction } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  total: number;
  initialState?: InitialTableState;
  manualPagination?: {
    pagination: PaginationState;
    setPagination: Dispatch<SetStateAction<PaginationState>>;
  };
}

export function DataTable<TData, TValue>({
  columns,
  data,
  total,
  initialState,
  manualPagination,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    initialState,
    manualPagination: !!manualPagination,
    getCoreRowModel: getCoreRowModel(),
    rowCount: manualPagination ? total : undefined,
    onPaginationChange: manualPagination
      ? manualPagination.setPagination
      : undefined,
    state: {
      pagination: manualPagination ? manualPagination.pagination : undefined,
    },
  });

  return (
    <>
      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
        <div className="relative overflow-x-auto">
          <Table>
            <TableHeader className="bg-accent/50">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    const isPinnedLeft = header.column.getIsPinned() === "left";
                    const isPinnedRight =
                      header.column.getIsPinned() === "right";

                    return (
                      <TableHead
                        key={header.id}
                        className={cn(
                          "z-10 border-t-md",
                          isPinnedLeft && "sticky left-0 shadow-md",
                          isPinnedRight && "sticky right-0 shadow-md"
                        )}
                        style={{ width: `${header.getSize()}px` }}
                        align={header.column.columnDef.meta?.align}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row, rowIndex, rowsArray) => {
                  const isLastRow = rowIndex === rowsArray.length - 1;

                  return (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row
                        .getVisibleCells()
                        .map((cell, cellIndex, cellsArray) => {
                          const isFirstCell = cellIndex === 0;
                          const isLastCell =
                            cellIndex === cellsArray.length - 1;

                          const isPinnedLeft =
                            cell.column.getIsPinned() === "left";
                          const isPinnedRight =
                            cell.column.getIsPinned() === "right";

                          return (
                            <TableCell
                              key={cell.id}
                              className={cn(
                                "truncate",
                                isPinnedLeft &&
                                  "sticky left-0 z-10 shadow-md bg-accent/50",
                                isPinnedRight &&
                                  "sticky right-0 z-10 shadow-md bg-accent/80"
                              )}
                              style={{ width: `${cell.column.getSize()}px` }}
                              align={cell.column.columnDef.meta?.align}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          );
                        })}
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <DataTablePagination table={table} total={total} />
    </>
  );
}
