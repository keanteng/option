import DashboardCard from "@/components/dashboard/dashboard-cards";
import { calculateRevenue, getOrderStatistics } from "@/lib/dashboard/actions";

export default async function Home() {
  const total_revenue = await calculateRevenue();
  const orderStatistics = await getOrderStatistics();

  return (
    <div className="p-4 lg:mx-12 xl:mx-80">
      <DashboardCard total_revenue={total_revenue} orderStatistics={orderStatistics}/>
      <h1 className="mt-2">
        More features to be added ...
      </h1>
    </div>
  );
}
