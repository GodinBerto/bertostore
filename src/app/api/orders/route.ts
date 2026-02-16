import { NextRequest, NextResponse } from "next/server";

import { fail } from "@/lib/api";
import { createOrder, getOrders, getOrdersForUser } from "@/lib/data-store";
import { getSessionFromRequest } from "@/lib/session";
import { parseOrderCreateInput } from "@/lib/validators";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const session = getSessionFromRequest(request);

  if (!session) {
    return fail("Unauthorized.", 401);
  }

  if (session.role === "admin") {
    const orders = await getOrders();

    return NextResponse.json({ orders }, { status: 200 });
  }

  const orders = await getOrdersForUser(session.sub, session.email);

  return NextResponse.json({ orders }, { status: 200 });
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const session = getSessionFromRequest(request);

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return fail("Invalid request body.", 400);
  }

  const parsed = parseOrderCreateInput(payload);

  if (!parsed.ok) {
    return fail(parsed.error, 400);
  }

  try {
    const order = await createOrder({
      ...parsed.data,
      customerUserId: session?.sub,
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not create order.";

    return fail(message, 400);
  }
}
