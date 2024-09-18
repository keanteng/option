import { DataTable } from "@/components/products/data-table"
import { columns } from "@/components/products/columns"
import { ProductData } from "@/lib/product-data"
import { loadProducts } from "@/lib/actions";

export default async function Products() {
  const data = await loadProducts();

  return (
    <div className="flex p-6 w-[calc(100vw-1.5rem)]">
      <div className="flex flex-col justify-center w-full">
        <div className="flex flex-col gap-0.5">
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-sm text-gray-500">
            List of all products in the inventory.
          </p>
        </div>
        <div>
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  )
}