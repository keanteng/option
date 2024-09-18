'use client'

import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { z } from 'zod';
import { useForm } from 'react-hook-form';

const ProductDataSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number().positive(),
  description: z.string(),
  stock: z.number().int().nonnegative(),
  time_added: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
});

export default function ProductCreateForm() {
  const {
    handleSubmit,
    register,
    setValue,
    control,
    formState: {errors, isSubmitting},
  } = useForm();
  
  return (
    <form className="flex flex-col gap-3 mt-2">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="Product name"
          type="text"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          name="description"
          placeholder="Description"
          type="text"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          name="price"
          placeholder="Price"
          type="number"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="quantity">Quantity</Label>
        <Input
          id="quantity"
          name="quantity"
          placeholder="Quantity"
          type="number"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="unit">Unit</Label>
        <Input
          id="unit"
          name="unit"
          placeholder="Unit"
          type="text"
        />
      </div>
      <Button type="submit" className="mt-4">Create product</Button>
    </form>
  )
}