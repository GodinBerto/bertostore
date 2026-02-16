"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface LoginFormProps {
  redirectTo?: string;
}

interface LoginResponse {
  error?: string;
  user?: {
    role: "admin" | "customer";
  };
}

export default function LoginForm({ redirectTo }: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = (await response.json()) as LoginResponse;

      if (!response.ok) {
        setError(result.error ?? "Could not sign in.");
        return;
      }

      router.push(
        redirectTo ||
          (result.user?.role === "admin" ? "/dashboard" : "/account")
      );
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-md border border-border px-3 py-2"
          placeholder="you@example.com"
          required
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-md border border-border px-3 py-2"
          placeholder="Your password"
          required
        />
      </div>

      {error ? (
        <p className="rounded-md bg-red-100 px-3 py-2 text-sm text-red-700">{error}</p>
      ) : null}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Signing in..." : "Sign in"}
      </Button>

      <p className="text-sm text-muted-foreground">
        Need an account?{" "}
        <Link href="/register" className="font-medium text-background-primary">
          Create one
        </Link>
      </p>
    </form>
  );
}
