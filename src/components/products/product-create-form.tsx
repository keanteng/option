'use client'

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { z } from 'zod';
import { useForm, FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from "react";
import { createProduct } from "@/lib/products/actions";
import { useToast } from "@/hooks/use-toast";

const ProductDataSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  price: z.number().positive(),
  barcode: z.string(),
  stock: z.number().int().nonnegative(),
  unit: z.string(),
  time_added: z.string().refine((val) => {
    const date = new Date(val);
    return !isNaN(date.getTime());
  }, {
    message: "Invalid date format",
  }),
});

type ProductDataType = z.infer<typeof ProductDataSchema>;

interface ProductCreateFormProps {
  onClose: () => void;
}

export default function ProductCreateForm({ onClose }: ProductCreateFormProps) {
  const { toast } = useToast();
  const [uuid, setUuid] = useState<string>('');
  const [timestamp, setTimestamp] = useState<string>('');
  const {
    handleSubmit,
    register,
    setValue,
    formState: {errors, isSubmitting},
  } = useForm<ProductDataType>({
    resolver: zodResolver(ProductDataSchema),
  });
  
  // make synchronous request to create product and check for errors
  const onSubmit = async (data: ProductDataType) => {
    try {
      await createProduct(data);
      onClose();
      toast({
        title: 'Product created',
        description: `${data.time_added}`,
      });
    } catch (error: unknown) {
      console.error('Failed to create product', error);
    }
  }

  const onInvalid = (errors: FieldErrors<ProductDataType>) => {
    console.log(errors)
  }

  useEffect(() => {
    const product_crypto_id = crypto.randomUUID().replace(/-/g, '').slice(0,5);
    const currentTimestamp = new Date().toLocaleString();
    setUuid(product_crypto_id)
    setTimestamp(currentTimestamp)
    setValue("id", product_crypto_id)
    setValue("time_added", currentTimestamp)
  }, [setValue])

  return (
    <form className="flex flex-col gap-3 mt-2" onSubmit={handleSubmit(onSubmit, onInvalid)}>
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          {...register("name")}
          placeholder="Product name"
          type="text"
        />
        {errors.name && <p className="text-xs text-red-500 -mt-2">{errors.name.message}</p>}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="description">Barcode</Label>
        <Input
          id="barcode"
          {...register("barcode")}
          placeholder="Barcode"
          type="text"
        />
        {errors.barcode && <p className="text-xs text-red-500 -mt-2">{errors.barcode.message}</p>}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          {...register("price", { valueAsNumber: true })}
          placeholder="Price"
          type="number"
          step="0.01"
        />
        {errors.price && <p className="text-xs text-red-500 -mt-2">{errors.price.message}</p>}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="quantity">Quantity</Label>
        <Input
          id="quantity"
          {...register("stock", { valueAsNumber: true })}
          placeholder="Quantity"
          type="number"
        />
        {errors.stock && <p className="text-xs text-red-500 -mt-2">{errors.stock.message}</p>}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="unit">Unit</Label>
        <Input
          id="unit"
          {...register("unit")}
          placeholder="Unit"
          type="text"
        />
        {errors.unit && <p className="text-xs text-red-500 -mt-2">{errors.unit.message}</p>}
      </div>
      <Button 
        type="submit"
        className="mt-4" 
        disabled={isSubmitting}
      >
        Create product</Button>
    </form>
  )
}