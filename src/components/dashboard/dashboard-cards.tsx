import {
Card,
CardContent,
CardHeader,
CardTitle,
} from "@/components/ui/card"
import {
	DollarSign,
	UsersRoundIcon,
	Activity,
	Hourglass,
} from 'lucide-react';

interface DashboardCardProps {
	total_revenue: number
	orderStatistics: {
		totalOrders: number;
		pendingOrders: number;
		completedOrders: number;
	}
}

let sample_data = [
	{
		title: 'Total Revenue',
		amount: 0,
		icon: <DollarSign className="h-4 w-4"/>
	},
	{
		title: 'Total Orders',
		amount: 0,
		icon: <UsersRoundIcon className="h-4 w-4"/>
	},
	{
		title: 'Pending Orders',
		amount: 0,
		icon: <Hourglass className="h-4 w-4"/>
	},
	{
		title: 'Completed Orders',
		amount: 0,
		icon: <Activity className="h-4 w-4"/>
	},
]

export default function DashboardCard({total_revenue, orderStatistics}: DashboardCardProps) {
	sample_data[0].amount = total_revenue;
	sample_data[1].amount = orderStatistics.totalOrders;
	sample_data[2].amount = orderStatistics.pendingOrders;
	sample_data[3].amount = orderStatistics.completedOrders;
	return (
		<div className="grid md:grid-cols-4 gap-2 grid-cols-2">
			{sample_data.map((data) => (
				<Card>
					<CardHeader className="-mb-4 flex flex-row items-center justify-between">
						<CardTitle>{data.title}</CardTitle>
						{data.icon}
					</CardHeader>
					<CardContent>
						<h1 className="text-2xl font-bold">
							{data.amount}
						</h1>
					</CardContent>
			</Card>
			))}
		</div>
	)
}