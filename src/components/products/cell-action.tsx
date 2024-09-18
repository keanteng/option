'use client';

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EditModal } from "../modal/products/edit-modal";
import { DeleteModal } from "../modal/products/delete-modal";
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductDataType } from "@/lib/product-data";

interface CellActionProps {
  product: ProductDataType
}

export default function CellAction({ product }: CellActionProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  return (
    <>
      <EditModal
        isOpen={isEditModalOpen}
        onClose = {() => setIsEditModalOpen(false)}
        product = {product}
      />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose = {() => setIsDeleteModalOpen(false)}
        product = {product}
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
            onClick={() => navigator.clipboard.writeText(product.name)}
          >
            Copy product name
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsEditModalOpen(true)}>
            View product details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDeleteModalOpen(true)}>
            Delete product
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}