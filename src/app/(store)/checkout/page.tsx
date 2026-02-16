"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";

import GridLayout from "@/components/ui/grid";
import { CartItem, clearCartItems, getCartItems } from "@/lib/cart-client";

interface ShippingForm {
  fullName: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  notes: string;
}

interface OrderResponse {
  error?: string;
  order?: {
    orderNumber: string;
    total: number;
  };
}

function formatPrice(value: number): string {
  return `$${value.toFixed(2)}`;
}

const initialFormState: ShippingForm = {
  fullName: "",
  email: "",
  phone: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  postalCode: "",
  country: "United States",
  notes: "",
};

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [form, setForm] = useState<ShippingForm>(initialFormState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<OrderResponse["order"] | null>(null);

  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const shippingFee = subtotal >= 500 || subtotal === 0 ? 0 : 20;
  const total = subtotal + shippingFee;

  function setField(field: keyof ShippingForm, value: string) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  async function submitOrder(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
          shipping: {
            fullName: form.fullName,
            email: form.email,
            phone: form.phone,
            address1: form.address1,
            address2: form.address2,
            city: form.city,
            state: form.state,
            postalCode: form.postalCode,
            country: form.country,
          },
          notes: form.notes,
        }),
      });

      const result = (await response.json()) as OrderResponse;

      if (!response.ok || !result.order) {
        setError(result.error ?? "Could not place order.");
        return;
      }

      setSuccess(result.order);
      clearCartItems();
      setCartItems([]);
      setForm(initialFormState);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <GridLayout>
      <section className="grid grid-cols-1 gap-6 p-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <h1 className="text-3xl font-semibold">Checkout</h1>

          {success ? (
            <div className="rounded-xl border border-green-200 bg-green-50 p-5">
              <h2 className="text-lg font-semibold text-green-800">Order placed</h2>
              <p className="mt-2 text-sm text-green-700">
                Order <strong>{success.orderNumber}</strong> confirmed.
              </p>
              <p className="mt-1 text-sm text-green-700">
                Total charged: {formatPrice(success.total)}
              </p>
              <div className="mt-4 flex gap-3">
                <Link
                  href="/shop"
                  className="rounded-full bg-background-primary px-4 py-2 text-sm font-medium text-white"
                >
                  Continue shopping
                </Link>
                <Link
                  href="/account"
                  className="rounded-full border border-border px-4 py-2 text-sm font-medium"
                >
                  Track order
                </Link>
              </div>
            </div>
          ) : (
            <form
              onSubmit={submitOrder}
              className="space-y-4 rounded-xl border border-border bg-white p-4"
            >
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <input
                  value={form.fullName}
                  onChange={(event) => setField("fullName", event.target.value)}
                  placeholder="Full name"
                  className="rounded-md border border-border px-3 py-2"
                  required
                />
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => setField("email", event.target.value)}
                  placeholder="Email"
                  className="rounded-md border border-border px-3 py-2"
                  required
                />
                <input
                  value={form.phone}
                  onChange={(event) => setField("phone", event.target.value)}
                  placeholder="Phone"
                  className="rounded-md border border-border px-3 py-2"
                  required
                />
                <input
                  value={form.country}
                  onChange={(event) => setField("country", event.target.value)}
                  placeholder="Country"
                  className="rounded-md border border-border px-3 py-2"
                  required
                />
              </div>

              <input
                value={form.address1}
                onChange={(event) => setField("address1", event.target.value)}
                placeholder="Address line 1"
                className="w-full rounded-md border border-border px-3 py-2"
                required
              />

              <input
                value={form.address2}
                onChange={(event) => setField("address2", event.target.value)}
                placeholder="Address line 2 (optional)"
                className="w-full rounded-md border border-border px-3 py-2"
              />

              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <input
                  value={form.city}
                  onChange={(event) => setField("city", event.target.value)}
                  placeholder="City"
                  className="rounded-md border border-border px-3 py-2"
                  required
                />
                <input
                  value={form.state}
                  onChange={(event) => setField("state", event.target.value)}
                  placeholder="State"
                  className="rounded-md border border-border px-3 py-2"
                  required
                />
                <input
                  value={form.postalCode}
                  onChange={(event) => setField("postalCode", event.target.value)}
                  placeholder="ZIP / Postal code"
                  className="rounded-md border border-border px-3 py-2"
                  required
                />
              </div>

              <textarea
                value={form.notes}
                onChange={(event) => setField("notes", event.target.value)}
                placeholder="Order notes (optional)"
                className="min-h-24 w-full rounded-md border border-border px-3 py-2"
              />

              {error ? (
                <p className="rounded-md bg-red-100 px-3 py-2 text-sm text-red-700">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={loading || cartItems.length === 0}
                className="rounded-full bg-background-primary px-5 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                {loading ? "Placing order..." : "Place order"}
              </button>
            </form>
          )}
        </div>

        <aside className="h-fit rounded-xl border border-border bg-white p-4">
          <h2 className="text-lg font-semibold">Order summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            {cartItems.map((item) => (
              <div key={item.productId} className="flex items-center justify-between gap-2">
                <span className="line-clamp-1 text-muted-foreground">
                  {item.title} x {item.quantity}
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-2 border-t border-border pt-3 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shippingFee === 0 ? "Free" : formatPrice(shippingFee)}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          {cartItems.length === 0 && !success ? (
            <Link
              href="/cart"
              className="mt-4 inline-block text-sm font-medium text-background-primary"
            >
              Return to cart
            </Link>
          ) : null}
        </aside>
      </section>
    </GridLayout>
  );
}
