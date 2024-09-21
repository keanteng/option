export type ProductDataType = {
  id: string;
  name: string;
  price: number;
  unit: string;
  barcode: string;
  stock: number;
  time_added: string;
}

export const ProductData = [
  {
    id: "23df3d",
    name: "Bika Ayam Merah 3495",
    price: 100,
    unit: 'carton',
    barcode: "9556437003495",
    stock: 10,
    time_added: new Date("2021-10-10T12:00:00Z").toLocaleString(),
  },
  {
    id: "a1b2c3",
    name: "Mamee Monster",
    price: 50,
    unit: 'pack',
    barcode: "9555022300000",
    stock: 20,
    time_added: new Date("2021-11-01T10:00:00Z").toLocaleString(),
  },
  {
    id: "d4e5f6",
    name: "Twisties BBQ Curry",
    price: 70,
    unit: 'pack',
    barcode: "9556434003495",
    stock: 15,
    time_added: new Date("2021-11-15T14:30:00Z").toLocaleString(),
  },
  {
    id: "g7h8i9",
    name: "Super Ring",
    price: 60,
    unit: 'pack',
    barcode: "955648837003495",
    stock: 25,
    time_added: new Date("2021-12-05T09:45:00Z").toLocaleString(),
  },
  {
    id: "j1k2l3",
    name: "Jack 'n Jill Roller Coaster",
    price: 80,
    unit: 'pack',
    barcode: "953456437003495",
    stock: 18,
    time_added: new Date("2021-12-20T11:20:00Z").toLocaleString(),
  },
  {
    id: "m4n5o6",
    name: "Choki Choki",
    price: 40,
    unit: 'box',
    barcode: "9556437245003495",
    stock: 30,
    time_added: new Date("2022-01-10T13:00:00Z").toLocaleString(),
  },
  {
    id: "p7q8r9",
    name: "Apollo Chocolate Wafer",
    price: 90,
    unit: 'box',
    barcode: "95564334567003495",
    stock: 22,
    time_added: new Date("2022-01-25T15:15:00Z").toLocaleString(),
  },
  {
    id: "s1t2u3",
    name: "Hup Seng Cream Crackers",
    price: 110,
    unit: 'carton',
    barcode: "9556234437003495",
    stock: 12,
    time_added: new Date("2022-02-05T08:30:00Z").toLocaleString(),
  },
  {
    id: "v4w5x6",
    name: "Julie's Peanut Butter Sandwich",
    price: 120,
    unit: 'carton',
    barcode: "9556434437003495",
    stock: 17,
    time_added: new Date("2022-02-20T10:45:00Z").toLocaleString(),
  },
  {
    id: "y7z8a9",
    name: "Munchy's Oat Krunch",
    price: 130,
    unit: 'carton',
    barcode: "955643447865637003495",
    stock: 14,
    time_added: new Date("2022-03-01T12:00:00Z").toLocaleString(),
  },
  {
    id: "b1c2d3",
    name: "Gardenia Twiggies",
    price: 100,
    unit: 'box',
    barcode: "955697674437003495",
    stock: 19,
    time_added: new Date("2022-03-15T14:00:00Z").toLocaleString(),
  },
]