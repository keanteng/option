'use server';

import { revalidatePath } from "next/cache";
import prisma from "../../../prisma/lib/prisma";
import { OrderItemDataType } from "../order-item-data";
import { unstable_noStore as noStore } from 'next/cache';

export async function loadOrderItems() {
    noStore();
    const order_items = await prisma.orderItem.findMany({
        select: {
            id: true,
            item_name: true,
            quantity: true,
            price: true,
            unit: true,
            barcode: true,
            order_id: true,
            product_id: true,
        }
    });
    return order_items
}

export async function createOrderItem(data: OrderItemDataType) {
    noStore();
    const order_items = await prisma.orderItem.create({
        data: {
            id: data.id,
            item_name: data.item_name,
            quantity: data.quantity,
            price: data.price,
            unit: data.unit,
            barcode: data.barcode,
            order_id: data.order_id,
            product_id: data.product_id,
        }
    });
    revalidatePath('/orders')
    return order_items
}

export async function updateOrderItem(data: OrderItemDataType) {
    noStore();
    const order_items = await prisma.orderItem.update({
        where: {id: data.id},
        data: {
            quantity: data.quantity
        }
    })
    revalidatePath('/orders')
    return order_items
}

export async function deleteOrderItem(id: string) {
    noStore();
    const order_items = await prisma.orderItem.delete({
        where: {id: id}
    });
    revalidatePath('/orders');
    return order_items;
}

export async function validateOrderTotalPrice(orderId: string) {
    noStore();
    const orderItems = await prisma.orderItem.findMany({
        where: { order_id: orderId },
        select: {
            price: true,
            quantity: true
        }
    });

    const totalPrice = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    //console.log(totalPrice)

    await prisma.order.update({
        where: { id: orderId },
        data: { total_price: totalPrice}
    });

    return totalPrice;
}