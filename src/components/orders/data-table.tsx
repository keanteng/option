"use client"

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTablePagination } from "./pagination"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
            placeholder="Filter order..."
            value={(table.getColumn("customer_name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
                table.getColumn("customer_name")?.setFilterValue(event.target.value)
            }
            className="max-w-xs"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter(
              (column) => column.getCanHide()
            )
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) =>
                    column.toggleVisibility(!!value)
                  }
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
              <TableHead key={header.id}>
                {header.isPlaceholder
                ? null
                : flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                  )}
              </TableHead>
              )
            })}
            </TableRow>
          ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                >
                {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
                ))}
              </TableRow>
                ))
              ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mt-6">
        {/*Add Pagination */}
        <DataTablePagination table={table} />
      </div>
  </div>
  )
}
