"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import GridLayout from "@/components/ui/grid";
import {
  CartItem,
  getCartEventName,
  getCartItems,
  removeCartItem,
  setCartItems,
} from "@/lib/cart-client";

function formatPrice(value: number): string {
  return `$${value.toFixed(2)}`;
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const sync = () => setItems(getCartItems());

    sync();

    const cartEventName = getCartEventName();

    window.addEventListener("storage", sync);
    window.addEventListener(cartEventName, sync);

    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener(cartEventName, sync);
    };
  }, []);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const shipping = subtotal >= 500 || subtotal === 0 ? 0 : 20;
  const total = subtotal + shipping;

  function updateQuantity(productId: string, delta: number) {
    const nextItems = items
      .map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCartItems(nextItems);
  }

  function removeItem(productId: string) {
    removeCartItem(productId);
  }

  return (
    <GridLayout>
      <section className="grid grid-cols-1 gap-6 p-4 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-2">
          <h1 className="text-3xl font-semibold">Your Cart</h1>
          <p className="text-sm text-muted-foreground">
            Review your selected products before checkout.
          </p>

          {items.length === 0 ? (
            <div className="rounded-xl border border-border bg-white p-6">
              <p className="text-sm text-muted-foreground">Your cart is empty.</p>
              <Link
                href="/shop"
                className="mt-3 inline-block text-sm font-medium text-background-primary"
              >
                Continue shopping
              </Link>
            </div>
          ) : (
            <div className="overflow-hidden rounded-xl border border-border bg-white">
              {items.map((item, index) => (
                <article
                  key={item.productId}
                  className={`grid grid-cols-1 gap-3 p-4 sm:grid-cols-[100px_1fr_auto] ${
                    index === items.length - 1 ? "" : "border-b border-border"
                  }`}
                >
                  <div className="relative h-[90px] w-[100px] overflow-hidden rounded-md bg-background-secondary">
                    <Image src={item.image} alt={item.title} fill className="object-contain" />
                  </div>

                  <div>
                    <p className="line-clamp-2 text-sm font-medium">{item.title}</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {formatPrice(item.price)} each
                    </p>
                  </div>

                  <div className="flex flex-col items-start gap-3 sm:items-end">
                    <div className="inline-flex items-center rounded-full border border-border">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.productId, -1)}
                        className="p-2"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="min-w-8 text-center text-sm">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.productId, 1)}
                        className="p-2"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(item.productId)}
                      className="inline-flex items-center gap-1 text-xs text-red-600"
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <aside className="h-fit rounded-xl border border-border bg-white p-4">
          <h2 className="text-lg font-semibold">Order summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
            </div>
            <div className="flex items-center justify-between border-t border-border pt-2 font-semibold">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          <Link
            href="/checkout"
            className={`mt-4 inline-flex w-full items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-white ${
              items.length === 0
                ? "pointer-events-none bg-gray-400"
                : "bg-background-primary"
            }`}
          >
            Proceed to checkout
          </Link>
        </aside>
      </section>
    </GridLayout>
  );
}
