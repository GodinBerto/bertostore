import { createHmac } from "node:crypto";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { AppUser, UserRole } from "@/lib/models";

const SESSION_COOKIE = "bertostore_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

export interface SessionPayload {
  sub: string;
  email: string;
  role: UserRole;
  name: string;
  exp: number;
}

function getSessionSecret(): string {
  return process.env.SESSION_SECRET ?? "replace-this-in-production";
}

function encodeBase64Url(value: string): string {
  return Buffer.from(value).toString("base64url");
}

function decodeBase64Url(value: string): string {
  return Buffer.from(value, "base64url").toString("utf8");
}

function signValue(value: string): string {
  return createHmac("sha256", getSessionSecret())
    .update(value)
    .digest("base64url");
}

export function createSessionToken(
  user: Pick<AppUser, "id" | "email" | "name" | "role">
): string {
  const header = encodeBase64Url(JSON.stringify({ alg: "HS256", typ: "JWT" }));

  const payload: SessionPayload = {
    sub: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  };

  const encodedPayload = encodeBase64Url(JSON.stringify(payload));
  const signature = signValue(`${header}.${encodedPayload}`);

  return `${header}.${encodedPayload}.${signature}`;
}

export function parseSessionToken(token?: string): SessionPayload | null {
  if (!token) {
    return null;
  }

  const [header, payload, signature] = token.split(".");

  if (!header || !payload || !signature) {
    return null;
  }

  const expectedSignature = signValue(`${header}.${payload}`);

  if (signature !== expectedSignature) {
    return null;
  }

  try {
    const parsedPayload = JSON.parse(decodeBase64Url(payload)) as SessionPayload;

    if (!parsedPayload.exp || parsedPayload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return parsedPayload;
  } catch {
    return null;
  }
}

export function setSessionCookie(response: NextResponse, token: string): void {
  response.cookies.set({
    name: SESSION_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export function clearSessionCookie(response: NextResponse): void {
  response.cookies.set({
    name: SESSION_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

export async function getSessionFromCookies(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  return parseSessionToken(token);
}

export function getSessionFromRequest(request: NextRequest): SessionPayload | null {
  return parseSessionToken(request.cookies.get(SESSION_COOKIE)?.value);
}
