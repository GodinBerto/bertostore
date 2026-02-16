import Link from "next/link";

import { getDashboardStats, getOrders, getProducts } from "@/lib/data-store";

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-white p-4">
      <p className="text-xs uppercase text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}

export default async function DashboardPage() {
  const [stats, orders, products] = await Promise.all([
    getDashboardStats(),
    getOrders(),
    getProducts(),
  ]);

  const recentOrders = orders.slice(0, 5);
  const lowStockProducts = products.filter((product) => product.stock < 6).slice(0, 5);

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl font-semibold">Dashboard Overview</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage products, monitor orders, and keep your dropshipping operations healthy.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Products" value={stats.totalProducts.toString()} />
        <StatCard label="Active Products" value={stats.activeProducts.toString()} />
        <StatCard label="Total Orders" value={stats.totalOrders.toString()} />
        <StatCard label="Revenue" value={`$${stats.totalRevenue.toFixed(2)}`} />
        <StatCard label="Pending Orders" value={stats.pendingOrders.toString()} />
        <StatCard label="Fulfilled Orders" value={stats.fulfilledOrders.toString()} />
        <StatCard label="Low Stock" value={stats.lowStockProducts.toString()} />
        <StatCard label="Shipping KPI" value={stats.pendingOrders === 0 ? "Healthy" : "Needs review"} />
      </section>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-white p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent orders</h2>
            <Link href="/dashboard/orders" className="text-sm text-background-primary">
              View all
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">No orders yet.</p>
          ) : (
            <div className="mt-4 space-y-3">
              {recentOrders.map((order) => (
                <article
                  key={order.id}
                  className="rounded-md border border-border px-3 py-2 text-sm"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{order.orderNumber}</p>
                    <span className="capitalize text-muted-foreground">{order.status}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {order.shipping.fullName} • {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-lg border border-border bg-white p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Low stock products</h2>
            <Link href="/dashboard/products" className="text-sm text-background-primary">
              Manage
            </Link>
          </div>

          {lowStockProducts.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">Inventory levels are healthy.</p>
          ) : (
            <div className="mt-4 space-y-3">
              {lowStockProducts.map((product) => (
                <article
                  key={product.id}
                  className="rounded-md border border-border px-3 py-2 text-sm"
                >
                  <div className="flex items-center justify-between">
                    <p className="line-clamp-1 font-medium">{product.title}</p>
                    <span className="text-red-600">{product.stock} left</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{product.category}</p>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
