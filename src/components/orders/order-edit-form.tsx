import { OrderDataType } from "@/lib/order-data"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { z } from 'zod';
import { useForm, FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const OrderDataSchema = z.object({
  id: z.string(),
  customer_name: z.string(),
  time_added: z.string().refine((val) => {
    const date = new Date(val)
    return !isNaN(date.getTime());
  }, {
    message: 'Invalid date format'
  }),
  total_price: z.number().positive(),
  status: z.string(),
})

type OrderEditFormDataType = z.infer<typeof OrderDataSchema>;

interface OrderEditFormProps {
    order: OrderDataType
}

export default function OrderEditForm({ order }: OrderEditFormProps) {
  const {
    handleSubmit,
    register,
    formState: {errors, isSubmitting},
  } = useForm<OrderEditFormDataType>({
    resolver: zodResolver(OrderDataSchema),
    defaultValues: order,
  });

  const onSubmit = async (data: OrderEditFormDataType) => {
    try {
      console.log(data)
    } catch (error: unknown) {
      console.error('Failed to update product', error);
    }
  } 

  const onInvalid = (errors:FieldErrors<OrderEditFormDataType>) => {
    console.log(errors);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="flex flex-col gap-3">
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
      <div>
        <Label htmlFor="total_price">Total Price (Read Only & Auto-Update)</Label>
        <Input 
          id='total_price'
          {...register('total_price')}
          placeholder="total_price"
          type='number'
          readOnly
        />
        {errors.total_price && <p className="text-xs text-red-500 -mt-2">{errors.total_price.message}</p>}
      </div>
    </form>
  )
}