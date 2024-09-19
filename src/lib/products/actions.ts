'use server';

import { revalidatePath } from "next/cache";
import prisma from "../../../prisma/lib/prisma";
import { ProductDataType } from "../product-data";
import { unstable_noStore as noStore } from 'next/cache';

export async function loadProducts() {
    noStore();
    const products = await prisma.product.findMany({
        select: {
        id: true,
        name: true,
        price: true,
        unit: true,
        stock: true,
        time_added: true,
        barcode: true,
        }
    });
    return products;
}

export async function createProduct(data : ProductDataType) {
  noStore();
  const product = await prisma.product.create({
    data: {
      id: data.id,
      name: data.name,
      price: data.price,
      barcode: data.barcode,
      stock: data.stock,
      unit: data.unit,
      time_added: data.time_added,
    }
  });
  revalidatePath("/products");
  return product;
}

export async function updateProduct(data: ProductDataType) {
  noStore();
  const product = await prisma.product.update({
    where: { id: data.id },
    data: {
      name: data.name,
      price: data.price,
      barcode: data.barcode,
      stock: data.stock,
      unit: data.unit,
    }
  });
  revalidatePath("/products");
  return product;
}

export async function deleteProduct(id: string) {
  noStore();
  const product = await prisma.product.delete({
    where: { id: id }
  });
  revalidatePath("/products");
  return product;
}