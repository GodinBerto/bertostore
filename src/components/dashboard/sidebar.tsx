"use client";

import Link from "next/link";
import { LayoutDashboard, Package, ReceiptText, Store, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";

const links = [
  {
    href: "/dashboard",
    label: "Overview",
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/products",
    label: "Products",
    icon: Package,
  },
  {
    href: "/dashboard/orders",
    label: "Orders",
    icon: ReceiptText,
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full border-r border-border bg-white p-4 lg:w-64">
      <Link href="/dashboard" className="text-xl font-semibold">
        BERTO <span className="text-blue-600">ADMIN</span>
      </Link>

      <nav className="mt-6 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.href;

          return (
            <Link
              href={link.href}
              key={link.href}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                active
                  ? "bg-background-primary text-white"
                  : "text-foreground hover:bg-background-secondary"
              }`}
            >
              <Icon size={16} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 space-y-1">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-background-secondary"
        >
          <Store size={16} />
          Storefront
        </Link>
        <Link
          href="/logout"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
        >
          <LogOut size={16} />
          Logout
        </Link>
      </div>
    </aside>
  );
}
