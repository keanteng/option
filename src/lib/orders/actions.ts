'use server';

import { revalidatePath } from "next/cache";
import prisma from "../../../prisma/lib/prisma";
import { OrderDataType } from "../order-data";
import { unstable_noStore as noStore } from 'next/cache';

export async function loadOrders() {
    noStore();
    const orders = await prisma.order.findMany({
        select: {
            id: true,
            customer_name: true,
            time_added: true,
            total_price: true,
            status: true,
        }
    });
    return orders
}

export async function createOrder(data: OrderDataType) {
    noStore();
    const order = await prisma.order.create({
        data: {
            id: data.id,
            customer_name: data.customer_name,
            time_added: data.time_added,
            total_price: data.total_price,
            status: data.status,
        }
    });
    revalidatePath('/orders')
    return order
}

export async function updateOrder(data: OrderDataType) {
    noStore();
    const order = await prisma.order.update({
        where: {id: data.id},
        data: {
            customer_name: data.customer_name,
            total_price: data.total_price,
            status: data.status,
        }
    });
    revalidatePath('/orders')
    return order;
}

export async function deleteOrder(id: string) {
    noStore();
    const order = await prisma.order.delete({
        where: {id: id}
    });
    revalidatePath('/orders');
    return order;
}