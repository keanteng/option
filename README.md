# Option - Order Management Solution

![](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)



Option is a order management solution for salesman to keep track of their sales order and product catalogue. It can be used specifically for goods trading company such as snacks, beverages, household goods and more. 

The project is powered by [NextJS](https://nextjs.org/docs) and styles using [Shadcn UI](https://ui.shadcn.com/) and [Tailwind CSS](https://tailwindcss.com/docs/max-width). The database is powered by [PostgresSQL](https://www.postgresql.org/download/) hosted on local [Docker](https://docs.docker.com/engine/install/) setup. The CRUD operations are done via Prisma. 

## Preview
![alt text](option_preview.gif)

## Run Locally

Configure Docker
```bash
docker compose up
```

Once connection established, setup the database
```bash
npx prisma migrate dev --name init
```

After that, start the development server
```bash
npm run dev
```

## Features
- ✅Product Catalogue
- ✅Order Creation
- ✅Order Item Creation
- ✅Autosuggestion Based on Product
- ✅Autofill Order
- ✅Simple Dashboard For Visualization
- and more ...

## Potential Ideas
- Multi users to support company with more than one salesman
- Admin dashboard to manage sales team