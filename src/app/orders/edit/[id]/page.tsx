'use client';

import { useParams } from "next/navigation";
import OrderEditForm from "@/components/orders/order-edit-form";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { OrderData, OrderDataType } from "@/lib/order-data";

function filterData(id: string, data: OrderDataType[]): OrderDataType {
  const temp = data.filter(data => data.id === id)
  return temp[0]; //use [0] to make this a single object rather than array
}

export default function EditOrder() {
    const order = OrderData;
    const { id } = useParams();
    const filteredData = filterData(id.toString(), order);

    return (
      <div className="flex p-6 w-[calc(100vw-1.5rem)]">
      <div className="flex flex-col justify-center w-full">
        <div className="flex flex-col gap-0.5">
          <h1 className="text-3xl font-bold">
            Order <span className="underline">#{id}</span>
          </h1>
          <p className="text-sm text-gray-500">
            View and edit the order here.
          </p>
        </div>
        <div className="mt-6">
          <Tabs defaultValue="order_details">
            <TabsList className="grid w-2/6 grid-cols-2">
              <TabsTrigger value="order_details">Order Details</TabsTrigger>
              <TabsTrigger value='order_items'>Order Items</TabsTrigger>
            </TabsList>
            <TabsContent value='order_details' className="p-2 w-4/5 md:w-3/5">
              <OrderEditForm order={filteredData} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
    )
}