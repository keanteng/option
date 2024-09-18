
export type ProductDataType = {
  id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  time_added: string;
}

export const ProductData = [
  {
    id: "23df3d",
    name: "Bika Ayam Merah 3495",
    price: 100,
    unit: 'carton',
    description: "Chicken flavor snacks.",
    stock: 10,
    time_added: new Date("2021-10-10T12:00:00Z").toLocaleString(),
  },
  {
    id: "a1b2c3",
    name: "Mamee Monster",
    price: 50,
    unit: 'pack',
    description: "Crunchy noodle snack.",
    stock: 20,
    time_added: new Date("2021-11-01T10:00:00Z").toLocaleString(),
  },
  {
    id: "d4e5f6",
    name: "Twisties BBQ Curry",
    price: 70,
    unit: 'pack',
    description: "Barbecue curry flavored corn snacks.",
    stock: 15,
    time_added: new Date("2021-11-15T14:30:00Z").toLocaleString(),
  },
  {
    id: "g7h8i9",
    name: "Super Ring",
    price: 60,
    unit: 'pack',
    description: "Cheese flavored ring snacks.",
    stock: 25,
    time_added: new Date("2021-12-05T09:45:00Z").toLocaleString(),
  },
  {
    id: "j1k2l3",
    name: "Jack 'n Jill Roller Coaster",
    price: 80,
    unit: 'pack',
    description: "Potato rings with cheese flavor.",
    stock: 18,
    time_added: new Date("2021-12-20T11:20:00Z").toLocaleString(),
  },
  {
    id: "m4n5o6",
    name: "Choki Choki",
    price: 40,
    unit: 'box',
    description: "Chocolate paste in a tube.",
    stock: 30,
    time_added: new Date("2022-01-10T13:00:00Z").toLocaleString(),
  },
  {
    id: "p7q8r9",
    name: "Apollo Chocolate Wafer",
    price: 90,
    unit: 'box',
    description: "Chocolate coated wafer sticks.",
    stock: 22,
    time_added: new Date("2022-01-25T15:15:00Z").toLocaleString(),
  },
  {
    id: "s1t2u3",
    name: "Hup Seng Cream Crackers",
    price: 110,
    unit: 'carton',
    description: "Classic cream crackers.",
    stock: 12,
    time_added: new Date("2022-02-05T08:30:00Z").toLocaleString(),
  },
  {
    id: "v4w5x6",
    name: "Julie's Peanut Butter Sandwich",
    price: 120,
    unit: 'carton',
    description: "Peanut butter filled biscuits.",
    stock: 17,
    time_added: new Date("2022-02-20T10:45:00Z").toLocaleString(),
  },
  {
    id: "y7z8a9",
    name: "Munchy's Oat Krunch",
    price: 130,
    unit: 'carton',
    description: "Oat-based crunchy biscuits.",
    stock: 14,
    time_added: new Date("2022-03-01T12:00:00Z").toLocaleString(),
  },
  {
    id: "b1c2d3",
    name: "Gardenia Twiggies",
    price: 100,
    unit: 'box',
    description: "Chocolate flavored sponge cake.",
    stock: 19,
    time_added: new Date("2022-03-15T14:00:00Z").toLocaleString(),
  },
]