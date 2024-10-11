'use server';

import { revalidatePath } from "next/cache";
import prisma from "../../../prisma/lib/prisma";
import { unstable_noStore as noStore } from 'next/cache';

export async function calculateRevenue() {
    noStore();
    // Aggregate the sum of all total_price fields in the order table
    const result = await prisma.order.aggregate({
        _sum: {
            total_price: true
        }
    });

    // Extract the total revenue from the result
    const totalRevenue = result._sum.total_price || 0;

    revalidatePath('/')
    return totalRevenue;
}

export async function getOrderStatistics() {
    noStore();

    // Aggregate the total number of orders
    const totalOrders = await prisma.order.count();

    // Count the number of pending orders
    const pendingOrders = await prisma.order.count({
        where: { status: 'pending' }
    });

    // Count the number of completed orders
    const completedOrders = await prisma.order.count({
        where: { status: 'completed' }
    });

    // Revalidate the path
    revalidatePath('/');

    // Return the results in a list
    return {
        totalOrders,
        pendingOrders,
        completedOrders
    };
}