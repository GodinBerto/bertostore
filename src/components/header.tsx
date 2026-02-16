import Link from "next/link";

import { getCurrentUser } from "@/lib/server-auth";
import GridLayout from "./ui/grid";

export default async function NavHeader() {
  const user = await getCurrentUser();

  return (
    <GridLayout>
      <div className="flex w-full flex-wrap items-center justify-between gap-2 p-3 text-xs text-muted-foreground">
        <p>Free shipping on orders above $500</p>
        <div className="flex items-center gap-4">
          <Link href="/shop" className="hover:text-foreground">
            New arrivals
          </Link>
          <Link href="/checkout" className="hover:text-foreground">
            Fast checkout
          </Link>
          <Link href={user ? "/account" : "/login"} className="hover:text-foreground">
            {user ? `${user.name} (${user.role})` : "Sign in"}
          </Link>
        </div>
      </div>
    </GridLayout>
  );
}
