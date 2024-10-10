'use client';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import OrderEditForm from "./order-edit-form"
import { DataTable } from "./order-items/data-table"
import { columns } from './order-items/columns';
import { OrderItemData } from "@/lib/order-item-data";
import { OrderDataType } from "@/lib/order-data";
import { useParams } from "next/navigation";
import { OrderItemDataType } from "@/lib/order-item-data";
import { ProductDataType } from "@/lib/product-data";

interface EditOrderComponentProps {
  data: OrderDataType[];
  data_items: OrderItemDataType[];
  products: ProductDataType[];
}

function fetchData(id: string, data: OrderDataType[]) {
  const temp = data.filter(data => data.id === id)
  return temp[0]; //use [0] to make this a single object rather than array
}

function fetchDataItems(id:string, data_items: OrderItemDataType[]) {
  const temp = data_items.filter(data_items => data_items.order_id === id)
  return temp;
}

export default async function EditOrderComponent({ data, data_items, products }: EditOrderComponentProps) {
    const { id } = useParams();
    const filteredData = fetchData(id.toString(), data)
    const filteredDataItems = fetchDataItems(id.toString(), data_items)
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
              <TabsContent value='order_items' className="p-2">
                <DataTable columns={columns} data={filteredDataItems} products={products}/>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    )
}