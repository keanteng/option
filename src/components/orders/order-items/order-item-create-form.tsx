'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from 'zod';
import { useForm, FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from "react";
import { OrderItemDataType } from "@/lib/order-item-data";
import { ProductDataType } from "@/lib/product-data";
import Autosuggest from 'react-autosuggest';
import { useParams } from "next/navigation";
import { createOrderItem } from "@/lib/order-items/actions";

interface OrderItemCreateFormProps {
  onClose: () => void;
  products: ProductDataType[];
}

const OrderItemDataSchema = z.object({
  id:z.string(),
  item_name: z.string(),
  quantity: z.number(),
  barcode: z.string(),
  unit: z.string(),
  price: z.number().positive(),
  order_id: z.string(),
  product_id: z.string()
})

export default function OrderItemCreateForm({onClose, products}: OrderItemCreateFormProps) {
  const [uuid, setUuid] = useState<string>('');
  const {
    handleSubmit,
    register,
    setValue,
    formState: {errors, isSubmitting},
  } = useForm<OrderItemDataType>({
    resolver: zodResolver(OrderItemDataSchema),
  });
  const { id } = useParams(); 

  const onSubmit = async (data: OrderItemDataType) => {
    try {
      await createOrderItem(data)
    } catch (error: unknown) {
      console.error('Failed to create product', error);
    }
  }

  const onInvalid = (errors: FieldErrors<OrderItemDataType>) => {
    console.log(errors)
  }

  useEffect(() => {
    const order_item_crypto_id = crypto.randomUUID().replace(/-/g, '').slice(0,5);
    setUuid(order_item_crypto_id)
    setValue("id", order_item_crypto_id)
  }, [setValue])

  // tips
  const [suggestions, setSuggestions] = useState<ProductDataType[]>([]);
  const [value, setValueState] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<ProductDataType | null>(null);

  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    const filteredSuggestions = inputLength === 0 ? [] : products.filter(
      product => product.name.toLowerCase().includes(inputValue)
    );
    setSuggestions(filteredSuggestions);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion: ProductDataType): string => suggestion.name;

  const renderSuggestion = (suggestion: ProductDataType) => (
    <div className="gap-2">
      {suggestion.name}
    </div>
  );

  const onChange = (event: React.ChangeEvent<HTMLInputElement>, { newValue }: { newValue: string }) => {
    setValueState(newValue);
    setValue('item_name', newValue); // Update the form value
  };

  const onSuggestionSelected = (event: React.FormEvent, { suggestion }: { suggestion: ProductDataType }) => {
    setSelectedProduct(suggestion);
    setValue('price', suggestion.price);
    setValue('unit', suggestion.unit);
    setValue('barcode', suggestion.barcode);
    setValue('product_id', suggestion.id)
    setValue('order_id', id.toString())
  };

  return (
    <form className="flex flex-col gap-3 mt-2" onSubmit={handleSubmit(onSubmit, onInvalid)}>
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Item Name</Label>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          onSuggestionSelected={onSuggestionSelected}
          inputProps={{
            id: 'item_name',
            value,
            onChange: (event, { newValue }) => {
              onChange(event as React.ChangeEvent<HTMLInputElement>, { newValue });
              register('item_name').onChange(event);
            },
            placeholder: 'Item name',
            type: 'text',
          }}
          theme={{
            container: 'relative',
            input: 'w-full p-2 text-base border border-gray-300 rounded',
            suggestionsContainer: 'absolute top-full left-0 right-0 z-10 border border-gray-300 bg-white rounded shadow-md',
            suggestion: 'p-2 cursor-pointer',
            suggestionHighlighted: 'bg-gray-200',
          }}
        />
        {errors.item_name && <p className="text-xs text-red-500 -mt-2">{errors.item_name.message}</p>}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Quantity</Label>
        <Input
          id="quantity"
          {...register("quantity", { valueAsNumber: true })}
          placeholder="Quantity"
          type="number"
        />
        {errors.quantity && <p className="text-xs text-red-500 -mt-2">{errors.quantity.message}</p>}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Price</Label>
        <Input
          id="price"
          {...register("price", { valueAsNumber: true })}
          placeholder="price"
          type="number"
        />
        {errors.price && <p className="text-xs text-red-500 -mt-2">{errors.price.message}</p>}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Unit</Label>
        <Input
          id="unit"
          {...register("unit")}
          placeholder="unit"
          type="text"
        />
        {errors.unit && <p className="text-xs text-red-500 -mt-2">{errors.unit.message}</p>}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Barcode</Label>
        <Input
          id="barcode"
          {...register("barcode")}
          placeholder="barcode"
          type="text"
        />
        {errors.barcode && <p className="text-xs text-red-500 -mt-2">{errors.barcode.message}</p>}
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