import { loadOrders } from "@/lib/orders/actions";
import EditOrderComponent from "@/components/orders/edit-order-component";
import { loadOrderItems } from "@/lib/order-items/actions";
import { loadProducts } from "@/lib/products/actions";

export default async function EditOrder() {
  const data = await loadOrders();
  const data_items = await loadOrderItems();
  const products = await loadProducts();
  //const filteredData = OrderData[0]

  return (
    <EditOrderComponent data={data} data_items={data_items} products={products}/>
  )
}