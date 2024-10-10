# Option - Order Management Solution

Option is a order management solution for salesman to keep track of their sales order and product catalogue. It can be used specifically for goods trading company such as snacks, beverages, household goods and more. 

The project is powered by [NextJS](https://nextjs.org/docs) and styles using [Shadcn UI](https://ui.shadcn.com/) and [Tailwind CSS](https://tailwindcss.com/docs/max-width). The database is powered by [PostgresSQL](https://www.postgresql.org/download/) hosted on local [Docker](https://docs.docker.com/engine/install/) setup. 

## Preview
![alt text](option_preview.gif)

## Run Locally

Configure Docker
```bash
docker compose up
```

Once connection established, setup the database
```bash
npx prisma dev generate --name init
```

After that, start the development server
```bash
npm run dev
```

## Potential Ideas
- Multi users to support company with more than one salesman
- Admin dashboard to manage sales team