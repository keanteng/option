"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { OrderDataType } from "@/lib/order-data"
import CellAction from "./cell-action"

export const columns: ColumnDef<OrderDataType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "customer_name",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Customer
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    accessorKey: 'time_added',
    header: 'Time Added'
  },
  {
    accessorKey: 'status',
    header: 'Status'
  },
  {
    accessorKey: "total_price",
    header: () => <div className="text-right">Total</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total_price"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "MYR",
      }).format(amount)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction order={row.original} />,
  },
]
