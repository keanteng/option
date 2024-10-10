import { OrderDataType } from "@/lib/order-data"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { z } from 'zod';
import { useForm, FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateOrder } from "@/lib/orders/actions";
import { useToast } from "@/hooks/use-toast";
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

type OrderEditFormDataType = z.infer<typeof OrderDataSchema>;

interface OrderEditFormProps {
  order: OrderDataType | null
}

export default function OrderEditForm({ order }: OrderEditFormProps) {
  const {
    handleSubmit,
    register,
    setValue,
    control,
    formState: {errors, isSubmitting},
  } = useForm<OrderEditFormDataType>({
    resolver: zodResolver(OrderDataSchema),
    defaultValues: order || {},
  });
  const { toast } = useToast();

  const onSubmit = async (data: OrderEditFormDataType) => {
    try {
      await updateOrder(data)
      toast({
        title: 'Order Edited',
        description: `${data.time_added}`,
      });
    } catch (error: unknown) {
      console.error('Failed to update product', error);
    }
  } 

  const onInvalid = (errors:FieldErrors<OrderEditFormDataType>) => {
    console.log(errors);
  }

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
          {...register('total_price')}
          placeholder="total_price"
          type='number'
          readOnly
        />
        {errors.total_price && <p className="text-xs text-red-500 -mt-2">{errors.total_price.message}</p>}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="total_price">Status</Label>
        <Select
          defaultValue={order?.status}
          onValueChange={(value) => setValue('status', value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue 
              placeholder="Select a status"
            />
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
      <Button type="submit" className="mt-4 w-1/4" disabled={isSubmitting}>Update Order</Button>
    </form>
  )
}