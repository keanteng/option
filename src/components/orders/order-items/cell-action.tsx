'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { OrderItemDataType } from "@/lib/order-item-data";
import { EditModal } from "@/components/modal/order-items/edit-modal";
import { DeleteModal } from "@/components/modal/order-items/delete-modal";
import { useState } from "react";

interface CellActionProps {
  order_item: OrderItemDataType
}

export default function CellAction({ order_item }: CellActionProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <>
      <EditModal
        isOpen={isEditModalOpen}
        onClose = {() => setIsEditModalOpen(false)}
        order_item = {order_item}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose = {() => setIsDeleteModalOpen(false)}
        order_item={order_item}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText(order_item.item_name)}
          >
            Copy item name
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsEditModalOpen(true)}>
            View item details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDeleteModalOpen(true)}>
            Delete item
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}