import { loadProducts } from "@/lib/products/actions";
import CreateOrderComponent from "@/components/orders/create-order-component";
import { loadOrderItems } from "@/lib/order-items/actions";

export default async function CreateOrder() {
  const products = await loadProducts();
  const data_items = await loadOrderItems();
  return (
    <CreateOrderComponent products={products}  data_items={data_items}/>
  )
}