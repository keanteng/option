'use client';

import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { z } from 'zod';
import { useForm, FieldErrors } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import {useState, useEffect} from 'react';
import { createOrder } from "@/lib/orders/actions";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const OrderDataSchema = z.object({
  id: z.string(),
  customer_name: z.string(),
  time_added: z.string().refine((val) => {
    const date = new Date(val)
    return !isNaN(date.getTime());
  }, {
    message: 'Invalid date format'
  }),
  total_price: z.number().nonnegative(),
  status: z.string(),
})

type OrderCreateFormDataType = z.infer<typeof OrderDataSchema>;

interface OrderCreateFormProps {
  uuid: string
}

export default function OrderCreateForm({uuid}: OrderCreateFormProps) {
  const {
    handleSubmit,
    register,
    setValue,
    formState: {errors, isSubmitting},
  } = useForm<OrderCreateFormDataType>({
    resolver: zodResolver(OrderDataSchema), 
    defaultValues: {
      total_price: 0
    }
  });
    
  const onSubmit = async (data: OrderCreateFormDataType) => {
    try {
      await createOrder(data);
    } catch (error: unknown) {
      console.error('Failed to update product', error);
    }
  } 

  const onInvalid = (errors:FieldErrors<OrderCreateFormDataType>) => {
    console.log(errors);
  }

  const [timestamp, setTimestamp] = useState<string>('');
  useEffect(() => {
    const currenttimestamp = new Date().toLocaleString();
    setTimestamp(currenttimestamp)
    setValue('time_added', timestamp)
    setValue('id', uuid)
  })
    
  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input 
          id='customer_name'
          {...register('customer_name')}
          placeholder="Customer Name"
          type='text'
        />
        {errors.customer_name && <p className="text-xs text-red-500 -mt-2">{errors.customer_name.message}</p>}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="total_price">Total Price (Read Only & Auto-Update)</Label>
        <Input 
          id='total_price'
          {...register('total_price', { valueAsNumber: true })}
          placeholder="Total Price"
          type='number'
        />
        {errors.total_price && <p className="text-xs text-red-500 -mt-2">{errors.total_price.message}</p>}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="total_price">Status</Label>
        <Select
          onValueChange={(value) => setValue('status', value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a status"/>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" className="mt-4 w-1/4" disabled={isSubmitting}>Create Order</Button>
    </form>
  )
}