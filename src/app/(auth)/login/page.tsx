import { redirect } from "next/navigation";

import LoginForm from "@/components/auth/login-form";
import { getCurrentUser } from "@/lib/server-auth";

interface LoginPageProps {
  searchParams: Promise<{ next?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    redirect(currentUser.role === "admin" ? "/dashboard" : "/account");
  }

  const params = await searchParams;
  const redirectTo = params.next;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Sign in to your account</h1>
        <p className="text-sm text-muted-foreground">
          Access your orders, saved details, and the admin dashboard.
        </p>
      </div>

      <LoginForm redirectTo={redirectTo} />

      <div className="rounded-lg border border-dashed border-border bg-background-secondary/50 p-3 text-xs text-muted-foreground">
        Admin access default: <strong>admin@bertostore.com</strong> / <strong>Admin123!</strong>
      </div>
    </div>
  );
}
