export type OrderDataType = {
    id: string;
    customer_name: string;
    time_added: string;
    total_price: number;
    status: string;
}

export const OrderData = [
    {
        id: '234fdf',
        customer_name: 'Kedai Runit Kampung Setia Alam',
        time_added: new Date("2021-12-20T11:20:00Z").toLocaleString(),
        total_price: 200,
        status: 'pending',
    },
    {
        id: 'a1b2c3',
        customer_name: '99 Speed Mart Kampung Gajah',
        time_added: new Date("2021-12-20T11:20:00Z").toLocaleString(),
        total_price: 150,
        status: 'completed',
    }
]