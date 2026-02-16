import Link from "next/link";
import { LayoutDashboard, Search, ShoppingCart, User } from "lucide-react";

import GridLayout from "./ui/grid";
import CartCountBadge from "@/components/cart/cart-count-badge";
import { getCurrentUser } from "@/lib/server-auth";

export default async function Navbar() {
  const user = await getCurrentUser();

  return (
    <GridLayout>
      <div className="w-full flex flex-wrap items-center justify-between gap-3 p-3 md:flex-nowrap md:p-0">
        <Link
          href="/"
          className="flex h-15 w-fit items-center gap-3 border-r border-border p-3"
        >
          <h1 className="text-xl font-semibold">
            BERTO <span className="text-blue-500">STORE</span>
          </h1>
        </Link>

        <div className="flex h-15 flex-1 items-center justify-end gap-2 border-l border-border p-2 md:gap-3 md:p-3">
          <form
            action="/shop"
            className="flex w-full max-w-[360px] items-center rounded-full bg-background-secondary px-3 py-1"
          >
            <input
              type="text"
              name="q"
              placeholder="Search products"
              className="w-full bg-transparent text-sm outline-none"
            />
            <button
              type="submit"
              aria-label="Search products"
              className="text-foreground/80"
            >
              <Search size={18} />
            </button>
          </form>

          <Link
            href="/cart"
            className="relative flex items-center rounded-full bg-background-secondary p-2"
            aria-label="Open cart"
          >
            <ShoppingCart size={20} className="text-foreground/80" />
            <CartCountBadge />
          </Link>

          {user ? (
            <>
              {user.role === "admin" ? (
                <Link
                  href="/dashboard"
                  className="flex items-center rounded-full bg-background-secondary p-2"
                  aria-label="Dashboard"
                >
                  <LayoutDashboard size={20} className="text-foreground/80" />
                </Link>
              ) : null}
              <Link
                href="/account"
                className="hidden rounded-full bg-background-secondary px-3 py-2 text-sm font-medium md:block"
              >
                {user.name.split(" ")[0]}
              </Link>
              <Link
                href="/logout"
                className="rounded-full bg-background-primary px-3 py-2 text-xs font-medium text-white md:text-sm"
              >
                Logout
              </Link>
            </>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 rounded-full bg-background-secondary px-3 py-2 text-sm font-medium"
            >
              <User size={16} />
              Login
            </Link>
          )}
        </div>
      </div>
    </GridLayout>
  );
}
