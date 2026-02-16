import DashboardSidebar from "@/components/dashboard/sidebar";
import { requireAdminUser } from "@/lib/server-auth";

export default async function DashboardLayout({ children }: _children) {
  const user = await requireAdminUser();

  return (
    <div className="min-h-screen bg-[linear-gradient(120deg,#f7f8fb_0%,#eef2ff_45%,#f8fbff_100%)]">
      <div className="mx-auto max-w-[1400px] px-4 py-4">
        <div className="mb-4 rounded-xl border border-border bg-white px-4 py-3 text-sm text-muted-foreground">
          Signed in as <span className="font-medium text-foreground">{user.email}</span>
        </div>
        <div className="overflow-hidden rounded-xl border border-border bg-white lg:flex">
          <DashboardSidebar />
          <main className="flex-1 p-4 lg:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
