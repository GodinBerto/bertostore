import { NextRequest, NextResponse } from "next/server";

import { fail } from "@/lib/api";
import { createProduct, getActiveProducts, getProducts } from "@/lib/data-store";
import { getSessionFromRequest } from "@/lib/session";
import { parseProductCreateInput } from "@/lib/validators";

function applyFilters(request: NextRequest, products: Awaited<ReturnType<typeof getProducts>>) {
  const query = request.nextUrl.searchParams.get("q")?.toLowerCase().trim();
  const category = request.nextUrl.searchParams.get("category")?.trim();
  const sort = request.nextUrl.searchParams.get("sort")?.trim();

  let filtered = products;

  if (query) {
    filtered = filtered.filter(
      (product) =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
  }

  if (category) {
    filtered = filtered.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (sort === "price-asc") {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  } else if (sort === "name") {
    filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
  } else {
    filtered = [...filtered].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }

  return filtered;
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const session = getSessionFromRequest(request);
  const includeInactive =
    request.nextUrl.searchParams.get("includeInactive") === "1" &&
    session?.role === "admin";

  const source = includeInactive ? await getProducts() : await getActiveProducts();
  const products = applyFilters(request, source);

  return NextResponse.json({ products }, { status: 200 });
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const session = getSessionFromRequest(request);

  if (!session || session.role !== "admin") {
    return fail("Unauthorized.", 401);
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return fail("Invalid request body.", 400);
  }

  const parsed = parseProductCreateInput(payload);

  if (!parsed.ok) {
    return fail(parsed.error, 400);
  }

  const product = await createProduct(parsed.data);

  return NextResponse.json({ product }, { status: 201 });
}
