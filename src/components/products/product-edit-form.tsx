'use client';

import { ProductDataType } from "@/lib/product-data";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { z } from 'zod';
import { useForm, FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateProduct } from "@/lib/actions";
import { useToast } from "@/hooks/use-toast";

interface ProductEditFormProps {
    product: ProductDataType;
    onClose: () => void;
}

const ProductDataSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  price: z.number().positive(),
    barcode: z.string(),
  stock: z.number().int().nonnegative(),
  unit: z.string().min(1, "Unit is required"),
  time_added: z.string().refine((val) => {
    const date = new Date(val);
    return !isNaN(date.getTime());
  }, {
    message: "Invalid date format",
  }),
});

type ProductFormDataType = z.infer<typeof ProductDataSchema>;

export default function ProductEditForm({ product, onClose } : ProductEditFormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormDataType>({
    resolver: zodResolver(ProductDataSchema),
    defaultValues: product,
  });
  const { toast } = useToast();

  const onSubmit = async (data: ProductFormDataType) => {
    try {
      await updateProduct(data);
      onClose();
      toast({
        title: 'Product Edited',
        description: `${data.time_added}`,
      });
    } catch (error: unknown) {
      console.error('Failed to update product', error);
    }
  };

  const onInvalid = (errors: FieldErrors<ProductFormDataType>) => {
    console.log(errors);
  };

  return (
      <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="flex flex-col gap-3 mt-2">
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
      <Button type="submit" className="mt-4" disabled={isSubmitting}>Update Product</Button>
      </form>
  )
}