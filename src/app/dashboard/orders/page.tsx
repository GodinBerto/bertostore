"use client";

import { useEffect, useMemo, useState } from "react";

interface OrderRecord {
  id: string;
  orderNumber: string;
  status: "pending" | "paid" | "fulfilled" | "cancelled";
  total: number;
  shipping: {
    fullName: string;
    email: string;
    city: string;
    state: string;
    country: string;
  };
  items: Array<{
    productId: string;
    title: string;
    quantity: number;
    price: number;
  }>;
  createdAt: string;
}

interface OrdersResponse {
  error?: string;
  orders?: OrderRecord[];
  order?: OrderRecord;
}

const statusOptions: OrderRecord["status"][] = [
  "pending",
  "paid",
  "fulfilled",
  "cancelled",
];

export default function DashboardOrdersPage() {
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savingOrderId, setSavingOrderId] = useState<string | null>(null);

  const sortedOrders = useMemo(
    () => [...orders].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [orders]
  );

  async function fetchOrders() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/orders");
      const result = (await response.json()) as OrdersResponse;

      if (!response.ok || !result.orders) {
        setError(result.error ?? "Could not load orders.");
        return;
      }

      setOrders(result.orders);
    } catch {
      setError("Network error while loading orders.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  async function updateOrderStatus(orderId: string, status: OrderRecord["status"]) {
    setSavingOrderId(orderId);
    setError(null);

    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const result = (await response.json()) as OrdersResponse;

      if (!response.ok || !result.order) {
        setError(result.error ?? "Could not update order status.");
        return;
      }

      setOrders((prev) =>
        prev.map((order) => (order.id === orderId ? result.order ?? order : order))
      );
    } catch {
      setError("Network error while updating order status.");
    } finally {
      setSavingOrderId(null);
    }
  }

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl font-semibold">Order Management</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Track incoming orders and move them through fulfillment.
        </p>
      </section>

      <section className="rounded-lg border border-border bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Orders ({orders.length})</h2>
          <button
            type="button"
            onClick={fetchOrders}
            className="rounded-full border border-border px-3 py-1 text-xs"
          >
            Refresh
          </button>
        </div>

        {error ? (
          <p className="mb-3 rounded-md bg-red-100 px-3 py-2 text-sm text-red-700">{error}</p>
        ) : null}

        {loading ? (
          <p className="text-sm text-muted-foreground">Loading orders...</p>
        ) : sortedOrders.length === 0 ? (
          <p className="text-sm text-muted-foreground">No orders yet.</p>
        ) : (
          <div className="space-y-3">
            {sortedOrders.map((order) => (
              <article key={order.id} className="rounded-md border border-border p-3">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto]">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold">{order.orderNumber}</p>
                      <span className="text-xs text-muted-foreground">
                        {new Date(order.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {order.shipping.fullName} • {order.shipping.email}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {order.shipping.city}, {order.shipping.state}, {order.shipping.country}
                    </p>

                    <div className="mt-3 rounded-md border border-border bg-background-secondary/60 p-2 text-xs">
                      {order.items.map((item) => (
                        <div
                          key={`${order.id}-${item.productId}`}
                          className="flex items-center justify-between"
                        >
                          <span className="line-clamp-1">{item.title}</span>
                          <span>
                            x{item.quantity} (${item.price.toFixed(2)})
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col items-start gap-2 md:items-end">
                    <p className="text-lg font-semibold">${order.total.toFixed(2)}</p>
                    <select
                      value={order.status}
                      onChange={(event) =>
                        updateOrderStatus(
                          order.id,
                          event.target.value as OrderRecord["status"]
                        )
                      }
                      disabled={savingOrderId === order.id}
                      className="rounded-md border border-border px-2 py-1 text-sm capitalize"
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
