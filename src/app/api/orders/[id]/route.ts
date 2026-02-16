import { NextRequest, NextResponse } from "next/server";

import { fail } from "@/lib/api";
import { findOrderById, updateOrderStatus } from "@/lib/data-store";
import { OrderStatus } from "@/lib/models";
import { getSessionFromRequest } from "@/lib/session";

interface RouteContext {
  params: Promise<{ id: string }>;
}

const allowedStatuses: OrderStatus[] = [
  "pending",
  "paid",
  "fulfilled",
  "cancelled",
];

export async function GET(
  request: NextRequest,
  context: RouteContext
): Promise<NextResponse> {
  const session = getSessionFromRequest(request);

  if (!session) {
    return fail("Unauthorized.", 401);
  }

  const { id } = await context.params;
  const order = await findOrderById(id);

  if (!order) {
    return fail("Order not found.", 404);
  }

  if (
    session.role !== "admin" &&
    order.customerUserId !== session.sub &&
    order.shipping.email.toLowerCase() !== session.email.toLowerCase()
  ) {
    return fail("Forbidden.", 403);
  }

  return NextResponse.json({ order }, { status: 200 });
}

export async function PATCH(
  request: NextRequest,
  context: RouteContext
): Promise<NextResponse> {
  const session = getSessionFromRequest(request);

  if (!session || session.role !== "admin") {
    return fail("Unauthorized.", 401);
  }

  const { id } = await context.params;

  let payload: { status?: string };

  try {
    payload = (await request.json()) as { status?: string };
  } catch {
    return fail("Invalid request body.", 400);
  }

  const status = payload.status as OrderStatus | undefined;

  if (!status || !allowedStatuses.includes(status)) {
    return fail("Invalid order status.", 400);
  }

  const order = await updateOrderStatus(id, status);

  if (!order) {
    return fail("Order not found.", 404);
  }

  return NextResponse.json({ order }, { status: 200 });
}
