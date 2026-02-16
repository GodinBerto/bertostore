import { redirect } from "next/navigation";

import RegisterForm from "@/components/auth/register-form";
import { getCurrentUser } from "@/lib/server-auth";

interface RegisterPageProps {
  searchParams: Promise<{ next?: string }>;
}

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    redirect(currentUser.role === "admin" ? "/dashboard" : "/account");
  }

  const params = await searchParams;
  const redirectTo = params.next;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Create your account</h1>
        <p className="text-sm text-muted-foreground">
          Sign up to place orders faster and track your purchase status.
        </p>
      </div>

      <RegisterForm redirectTo={redirectTo} />
    </div>
  );
}
