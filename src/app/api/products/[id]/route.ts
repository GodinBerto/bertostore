import { NextRequest, NextResponse } from "next/server";

import { fail } from "@/lib/api";
import { deleteProduct, findProductById, updateProduct } from "@/lib/data-store";
import { getSessionFromRequest } from "@/lib/session";
import { parseProductUpdateInput } from "@/lib/validators";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(
  request: NextRequest,
  context: RouteContext
): Promise<NextResponse> {
  const { id } = await context.params;
  const session = getSessionFromRequest(request);
  const product = await findProductById(id);

  if (!product) {
    return fail("Product not found.", 404);
  }

  if (!product.active && session?.role !== "admin") {
    return fail("Product not found.", 404);
  }

  return NextResponse.json({ product }, { status: 200 });
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

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return fail("Invalid request body.", 400);
  }

  const parsed = parseProductUpdateInput(payload);

  if (!parsed.ok) {
    return fail(parsed.error, 400);
  }

  const product = await updateProduct(id, parsed.data);

  if (!product) {
    return fail("Product not found.", 404);
  }

  return NextResponse.json({ product }, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  context: RouteContext
): Promise<NextResponse> {
  const session = getSessionFromRequest(request);

  if (!session || session.role !== "admin") {
    return fail("Unauthorized.", 401);
  }

  const { id } = await context.params;
  const deleted = await deleteProduct(id);

  if (!deleted) {
    return fail("Product not found.", 404);
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
