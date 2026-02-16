import Link from "next/link";

import NavHeader from "@/components/header";
import Navbar from "@/components/navbar";
import { VerticalSeperator } from "@/components/seperator";
import GridCellSVG from "@/components/svg/gridSvg";
import SubNavbar from "@/components/subNavbar";
import DashboardSidebar from "@/components/dashboard/sidebar";
import GridLayout from "@/components/ui/grid";
import { requireAdminUser } from "@/lib/server-auth";

export default async function DashboardLayout({ children }: _children) {
  const user = await requireAdminUser();

  return (
    <div className="min-h-screen bg-background">
      <NavHeader />
      <Navbar />
      <SubNavbar />
      <VerticalSeperator />

      <GridLayout>
        <div className="grid grid-cols-1 md:grid-cols-6">
          <div className="col-span-1 border-r border-border p-4 md:col-span-4">
            <h1 className="text-2xl font-semibold">Admin Control Center</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Run your dropshipping store from one dashboard: inventory, pricing, and order
              fulfillment.
            </p>
          </div>
          <div className="col-span-1 p-4 text-sm md:col-span-2">
            <p className="text-muted-foreground">
              Signed in as <span className="font-medium text-foreground">{user.email}</span>
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                href="/"
                className="rounded-full border border-border px-3 py-1.5 text-xs font-medium"
              >
                View Storefront
              </Link>
              <Link
                href="/logout"
                className="rounded-full bg-background-primary px-3 py-1.5 text-xs font-medium text-white"
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
      </GridLayout>

      <VerticalSeperator />

      <GridLayout className="min-h-[65vh]">
        <div className="grid min-h-[65vh] grid-cols-1 lg:grid-cols-12">
          <div className="col-span-1 border-r border-border lg:col-span-3">
            <DashboardSidebar />
          </div>
          <main className="relative col-span-1 bg-white lg:col-span-9">
            <div className="absolute inset-0 opacity-50">
              <GridCellSVG spacing={0.04} lineColor="#e7ebff" />
            </div>
            <div className="relative p-4 lg:p-6">{children}</div>
          </main>
        </div>
      </GridLayout>
    </div>
  );
}
