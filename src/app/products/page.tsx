import { DataTable } from "@/components/products/data-table"
import { columns } from "@/components/products/columns"
import { ProductData } from "@/lib/product-data"

export default function Products() {
  const data = ProductData;

  return (
    <div className="flex p-6 w-[calc(100vw-1.5rem)]">
      <div className="flex flex-col justify-center w-full">
        <div className="flex flex-col gap-0.5">
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-sm text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div>
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  )
}