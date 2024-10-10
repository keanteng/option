'use client';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import { useEffect, useState } from 'react'
import OrderCreateForm from "@/components/orders/order-create-form";
import { DataTable } from "@/components/orders/order-items/data-table";
import { columns } from "@/components/orders/order-items/columns";
//import { OrderItemData } from "@/lib/order-item-data";
import { ProductDataType } from "@/lib/product-data";
import { useParams } from "next/navigation";
import { OrderItemDataType } from "@/lib/order-item-data";

interface CreateOrderComponentProps {
    products: ProductDataType[]
    data_items: OrderItemDataType[]
}

function fetchDataItems(id:string, data_items: OrderItemDataType[]) {
    const temp = data_items.filter(data_items => data_items.order_id === id)
    return temp;
  }

export default function CreateOrderComponent({products, data_items}: CreateOrderComponentProps) {
    const { id } = useParams();
    const filteredDataItems = fetchDataItems(id.toString(), data_items)

    return (
        <div className="flex p-6 w-[calc(100vw-1.5rem)]">
        <div className="flex flex-col justify-center w-full">
          <div className="flex flex-col gap-0.5">
            <h1 className="text-3xl font-bold">
              Creating Order <span className="underline">#{id.toString()}</span>
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
               <OrderCreateForm uuid={id.toString()}/>
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