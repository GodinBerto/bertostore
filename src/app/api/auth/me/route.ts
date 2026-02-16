import { NextResponse } from "next/server";

import { findUserById, toPublicUser } from "@/lib/data-store";
import { getSessionFromCookies } from "@/lib/session";

export async function GET(): Promise<NextResponse> {
  const session = await getSessionFromCookies();

  if (!session) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  const user = await findUserById(session.sub);

  if (!user) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  return NextResponse.json({ user: toPublicUser(user) }, { status: 200 });
}
