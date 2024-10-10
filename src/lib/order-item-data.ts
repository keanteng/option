export type OrderItemDataType = {
    id: string;
    item_name: string;
    quantity: number;
    price: number;
    unit: string;
    barcode: string;
    order_id: string;
    product_id: string;
}

export const OrderItemData = [
    {
        id: 'sdf32',
        item_name: 'Pure 3 Triangle Cake Banana',
        quantity: 2,
        price: 2.40,
        unit: 'pcs',
        barcode: '32093482039482',
        order_id: 'sdfsdf',
        product_id: 'sdfsdfsfd'
    },
    {
        id: 'sdf33',
        item_name: 'Pure 3 Triangle Cake Strawberry',
        quantity: 1,
        price: 2.40,
        unit: 'pcs',
        barcode: '293098349328',
        order_id: 'sdfsdf',
        product_id: 'sdfsdfsfd'
    }
]