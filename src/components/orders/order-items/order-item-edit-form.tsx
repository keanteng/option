'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from 'zod';
import { useForm, FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { OrderItemDataType } from "@/lib/order-item-data";
import { updateOrderItem } from "@/lib/order-items/actions";

interface OrderItemCreateFormProps {
  onClose: () => void;
  order_item: OrderItemDataType
}

const OrderItemDataSchema = z.object({
  id: z.string(),
  item_name: z.string(),
  quantity: z.number(),
  barcode: z.string(),
  unit: z.string(),
  price: z.number().positive(),
  order_id: z.string(),
  product_id: z.string(),
})

type OrderItemEditFormDataType = z.infer<typeof OrderItemDataSchema>;

export default function OrderItemEditForm({onClose, order_item}: OrderItemCreateFormProps) {
  const {
    handleSubmit,
    register,
    setValue,
    formState: {errors, isSubmitting},
  } = useForm<OrderItemEditFormDataType>({
    resolver: zodResolver(OrderItemDataSchema),
    defaultValues: order_item
  });
  
  const onSubmit = async (data: OrderItemEditFormDataType) => {
    try {
      await updateOrderItem(data)
      console.log(data)
      onClose()
    } catch (error: unknown) {
      console.error('Failed to create product', error);
    }
  }

  const onInvalid = (errors: FieldErrors<OrderItemEditFormDataType>) => {
    console.log(errors)
  }
  
  return (
    <form className="flex flex-col gap-3 mt-2" onSubmit={handleSubmit(onSubmit, onInvalid)}>
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Item Name</Label>
        <Input
          id="item_name"
          {...register("item_name")}
          placeholder="Item name"
          type="text"
          readOnly
        />
        {errors.item_name && <p className="text-xs text-red-500 -mt-2">{errors.item_name.message}</p>}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="quantity">Quantity</Label>
        <Input
          id="quantity"
          {...register("quantity", { valueAsNumber: true })}
          placeholder="Quantity"
          type="number"
        />
        {errors.quantity && <p className="text-xs text-red-500 -mt-2">{errors.quantity.message}</p>}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          {...register("price", { valueAsNumber: true })}
          placeholder="price"
          type="number"
          readOnly
        />
        {errors.price && <p className="text-xs text-red-500 -mt-2">{errors.price.message}</p>}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="unit">Unit</Label>
        <Input
          id="unit"
          {...register("unit")}
          placeholder="unit"
          type="text"
          readOnly
        />
        {errors.unit && <p className="text-xs text-red-500 -mt-2">{errors.unit.message}</p>}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="barcode">Barcode</Label>
        <Input
          id="barcode"
          {...register("barcode")}
          placeholder="barcode"
          type="text"
          readOnly
        />
        {errors.barcode && <p className="text-xs text-red-500 -mt-2">{errors.barcode.message}</p>}
      </div>
      <Button 
        type="submit"
        className="mt-4" 
        disabled={isSubmitting}
      >
        Edit Order Item</Button>
    </form>
  )
}