import { NextResponse } from "next/server";

import { fail } from "@/lib/api";
import { findUserByEmail, toPublicUser } from "@/lib/data-store";
import { verifyPassword } from "@/lib/password";
import { createSessionToken, setSessionCookie } from "@/lib/session";

interface LoginPayload {
  email?: string;
  password?: string;
}

export async function POST(request: Request): Promise<NextResponse> {
  let payload: LoginPayload;

  try {
    payload = (await request.json()) as LoginPayload;
  } catch {
    return fail("Invalid request body.", 400);
  }

  const email = payload.email?.trim().toLowerCase() ?? "";
  const password = payload.password ?? "";

  if (!email || !password) {
    return fail("Email and password are required.", 400);
  }

  const user = await findUserByEmail(email);

  if (!user || !verifyPassword(password, user.passwordHash)) {
    return fail("Invalid email or password.", 401);
  }

  const response = NextResponse.json({ user: toPublicUser(user) }, { status: 200 });
  setSessionCookie(response, createSessionToken(user));

  return response;
}
