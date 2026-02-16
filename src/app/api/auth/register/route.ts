import { NextResponse } from "next/server";

import { fail } from "@/lib/api";
import { createUser, toPublicUser } from "@/lib/data-store";
import { createSessionToken, setSessionCookie } from "@/lib/session";

interface RegisterPayload {
  name?: string;
  email?: string;
  password?: string;
}

export async function POST(request: Request): Promise<NextResponse> {
  let payload: RegisterPayload;

  try {
    payload = (await request.json()) as RegisterPayload;
  } catch {
    return fail("Invalid request body.", 400);
  }

  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim().toLowerCase() ?? "";
  const password = payload.password ?? "";

  if (name.length < 2) {
    return fail("Name must be at least 2 characters.", 400);
  }

  if (!email.includes("@") || email.length < 5) {
    return fail("A valid email is required.", 400);
  }

  if (password.length < 8) {
    return fail("Password must be at least 8 characters.", 400);
  }

  const user = await createUser({ name, email, password, role: "customer" });

  if (!user) {
    return fail("An account with this email already exists.", 409);
  }

  const response = NextResponse.json({ user: toPublicUser(user) }, { status: 201 });
  setSessionCookie(response, createSessionToken(user));

  return response;
}
