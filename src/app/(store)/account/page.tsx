import Link from "next/link";

import GridLayout from "@/components/ui/grid";
import { getOrdersForUser } from "@/lib/data-store";
import { requireAuthUser } from "@/lib/server-auth";

export default async function AccountPage() {
  const user = await requireAuthUser("/login?next=/account");
  const orders = await getOrdersForUser(user.id, user.email);

  return (
    <GridLayout>
      <section className="grid grid-cols-1 gap-6 p-4 lg:grid-cols-3">
        <div className="rounded-xl border border-border bg-white p-4 lg:col-span-1">
          <h1 className="text-2xl font-semibold">My Account</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Signed in as <strong>{user.email}</strong>
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Role: <span className="font-medium text-foreground">{user.role}</span>
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              href="/shop"
              className="rounded-full border border-border px-3 py-2 text-sm"
            >
              Continue shopping
            </Link>
            {user.role === "admin" ? (
              <Link
                href="/dashboard"
                className="rounded-full bg-background-primary px-3 py-2 text-sm text-white"
              >
                Open dashboard
              </Link>
            ) : null}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-white p-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Order history</h2>
            <p className="text-sm text-muted-foreground">{orders.length} orders</p>
          </div>

          {orders.length === 0 ? (
            <div className="mt-4 rounded-lg border border-dashed border-border p-4 text-sm text-muted-foreground">
              You have not placed any orders yet.
            </div>
          ) : (
            <div className="mt-4 overflow-hidden rounded-lg border border-border">
              <div className="hidden grid-cols-4 border-b border-border bg-background-secondary px-3 py-2 text-xs font-semibold uppercase text-muted-foreground md:grid">
                <span>Order</span>
                <span>Date</span>
                <span>Status</span>
                <span className="text-right">Total</span>
              </div>
              {orders.map((order, index) => (
                <div
                  key={order.id}
                  className={`grid grid-cols-1 gap-1 px-3 py-3 text-sm md:grid-cols-4 md:gap-0 ${
                    index === orders.length - 1 ? "" : "border-b border-border"
                  }`}
                >
                  <span className="font-medium">{order.orderNumber}</span>
                  <span className="text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                  <span className="capitalize">{order.status}</span>
                  <span className="text-right font-medium">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </GridLayout>
  );
}
