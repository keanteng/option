import { DataTable } from "@/components/orders/data-table"
import { columns } from "@/components/orders/columns"
import { OrderData } from "@/lib/order-data"

export default async function Products() {
  return (
    <div className="flex p-6 w-[calc(100vw-1.5rem)]">
      <div className="flex flex-col justify-center w-full">
        <div className="flex flex-col gap-0.5">
          <h1 className="text-3xl font-bold">Orders</h1>
          <p className="text-sm text-gray-500">
            List of all orders by your customers.
          </p>
        </div>
        <div>
          <DataTable columns={columns} data={OrderData} />
        </div>
      </div>
    </div>
  )
}