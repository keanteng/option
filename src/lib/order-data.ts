export type OrderDataType = {
    id: string;
    customer_name: string;
    time_added: string;
    total_price: number;
}

export const OrderData = [
    {
        id: '234fdf',
        customer_name: 'John Doe',
        time_added: new Date("2021-12-20T11:20:00Z").toLocaleString(),
        total_price: 200,
    },
    {
        id: 'a1b2c3',
        customer_name: 'Jane Doe',
        time_added: new Date("2021-12-20T11:20:00Z").toLocaleString(),
        total_price: 150,
    }
]