# BertoStore (Next.js 16)

BertoStore is now a full-stack dropshipping app with:

- Storefront: landing page, shop, product detail, cart, checkout, account page
- Authentication: register, login, logout, `httpOnly` session cookies
- Admin dashboard: overview metrics, product CRUD, order status management
- API backend: Next.js Route Handlers + persistent JSON storage

## Tech

- Next.js App Router (`src/app`)
- TypeScript + Tailwind CSS v4
- Local JSON database files in `data/`

## Quick Start

1. Install dependencies:

```bash
npm install
```

2. Create env file:

```bash
cp .env.example .env.local
```

3. Run dev server:

```bash
npm run dev
```

4. Open:

- Storefront: http://localhost:3000
- Admin: http://localhost:3000/dashboard

## Default Admin Credentials

When `data/users.json` is empty, the app seeds an admin user using:

- Email: `DEFAULT_ADMIN_EMAIL` (default `admin@bertostore.com`)
- Password: `DEFAULT_ADMIN_PASSWORD` (default `Admin123!`)

Change these values in `.env.local` before production use.

## API Endpoints

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`

### Products

- `GET /api/products`
- `POST /api/products` (admin)
- `GET /api/products/:id`
- `PATCH /api/products/:id` (admin)
- `DELETE /api/products/:id` (admin)

### Orders

- `POST /api/orders` (guest or signed-in)
- `GET /api/orders` (admin: all, customer: own)
- `GET /api/orders/:id`
- `PATCH /api/orders/:id` (admin)

### Dashboard

- `GET /api/dashboard/stats` (admin)

## Notes

- Data persists to `data/products.json`, `data/users.json`, and `data/orders.json`.
- Session signing uses `SESSION_SECRET`; set a strong secret in production.
- Replace placeholder supplier URLs with your real dropshipping suppliers.
