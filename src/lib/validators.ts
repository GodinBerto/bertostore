import { OrderCreateInput, ProductInput, ShippingDetails } from "@/lib/models";

interface Success<T> {
  ok: true;
  data: T;
}

interface Failure {
  ok: false;
  error: string;
}

type ParseResult<T> = Success<T> | Failure;

type JsonRecord = Record<string, unknown>;

function ensureRecord(payload: unknown): payload is JsonRecord {
  return typeof payload === "object" && payload !== null && !Array.isArray(payload);
}

function getString(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  return value.trim();
}

function getOptionalString(value: unknown): string | undefined {
  const parsed = getString(value);

  if (!parsed) {
    return undefined;
  }

  return parsed;
}

function getNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const numericValue = Number(value);

    if (Number.isFinite(numericValue)) {
      return numericValue;
    }
  }

  return null;
}

function getBoolean(value: unknown): boolean | null {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "string") {
    const normalized = value.toLowerCase();

    if (normalized === "true") {
      return true;
    }

    if (normalized === "false") {
      return false;
    }
  }

  return null;
}

export function parseProductCreateInput(payload: unknown): ParseResult<ProductInput> {
  if (!ensureRecord(payload)) {
    return { ok: false, error: "Invalid request body." };
  }

  const title = getString(payload.title);
  const description = getString(payload.description);
  const category = getString(payload.category);
  const image = getString(payload.image);
  const supplierName = getString(payload.supplierName);
  const supplierUrl = getString(payload.supplierUrl);

  const price = getNumber(payload.price);
  const compareAtPrice =
    payload.compareAtPrice !== undefined ? getNumber(payload.compareAtPrice) : undefined;
  const stock = getNumber(payload.stock);
  const featured = payload.featured !== undefined ? getBoolean(payload.featured) : false;
  const active = payload.active !== undefined ? getBoolean(payload.active) : true;

  if (!title || title.length < 3) {
    return { ok: false, error: "Title must be at least 3 characters." };
  }

  if (!description || description.length < 10) {
    return { ok: false, error: "Description must be at least 10 characters." };
  }

  if (!category) {
    return { ok: false, error: "Category is required." };
  }

  if (!image || !image.startsWith("/")) {
    return { ok: false, error: "Image path must start with '/'." };
  }

  if (!supplierName) {
    return { ok: false, error: "Supplier name is required." };
  }

  if (!supplierUrl || !supplierUrl.startsWith("http")) {
    return { ok: false, error: "Supplier URL must start with http or https." };
  }

  if (price === null || price < 0) {
    return { ok: false, error: "Price must be a valid number greater than or equal to 0." };
  }

  if (stock === null || stock < 0) {
    return { ok: false, error: "Stock must be a valid number greater than or equal to 0." };
  }

  if (compareAtPrice !== undefined && (compareAtPrice === null || compareAtPrice < 0)) {
    return { ok: false, error: "Compare-at price must be greater than or equal to 0." };
  }

  if (featured === null || active === null) {
    return { ok: false, error: "Featured and active fields must be true or false." };
  }

  return {
    ok: true,
    data: {
      title,
      description,
      category,
      image,
      price,
      compareAtPrice: compareAtPrice ?? undefined,
      stock,
      supplierName,
      supplierUrl,
      featured,
      active,
    },
  };
}

export function parseProductUpdateInput(
  payload: unknown
): ParseResult<Partial<ProductInput>> {
  if (!ensureRecord(payload)) {
    return { ok: false, error: "Invalid request body." };
  }

  const updates: Partial<ProductInput> = {};

  if (payload.title !== undefined) {
    const title = getString(payload.title);

    if (!title || title.length < 3) {
      return { ok: false, error: "Title must be at least 3 characters." };
    }

    updates.title = title;
  }

  if (payload.description !== undefined) {
    const description = getString(payload.description);

    if (!description || description.length < 10) {
      return { ok: false, error: "Description must be at least 10 characters." };
    }

    updates.description = description;
  }

  if (payload.category !== undefined) {
    const category = getString(payload.category);

    if (!category) {
      return { ok: false, error: "Category is required." };
    }

    updates.category = category;
  }

  if (payload.image !== undefined) {
    const image = getString(payload.image);

    if (!image || !image.startsWith("/")) {
      return { ok: false, error: "Image path must start with '/'." };
    }

    updates.image = image;
  }

  if (payload.supplierName !== undefined) {
    const supplierName = getString(payload.supplierName);

    if (!supplierName) {
      return { ok: false, error: "Supplier name is required." };
    }

    updates.supplierName = supplierName;
  }

  if (payload.supplierUrl !== undefined) {
    const supplierUrl = getString(payload.supplierUrl);

    if (!supplierUrl || !supplierUrl.startsWith("http")) {
      return { ok: false, error: "Supplier URL must start with http or https." };
    }

    updates.supplierUrl = supplierUrl;
  }

  if (payload.price !== undefined) {
    const price = getNumber(payload.price);

    if (price === null || price < 0) {
      return { ok: false, error: "Price must be greater than or equal to 0." };
    }

    updates.price = price;
  }

  if (payload.compareAtPrice !== undefined) {
    const compareAtPrice = getNumber(payload.compareAtPrice);

    if (compareAtPrice === null || compareAtPrice < 0) {
      return { ok: false, error: "Compare-at price must be greater than or equal to 0." };
    }

    updates.compareAtPrice = compareAtPrice;
  }

  if (payload.stock !== undefined) {
    const stock = getNumber(payload.stock);

    if (stock === null || stock < 0) {
      return { ok: false, error: "Stock must be greater than or equal to 0." };
    }

    updates.stock = stock;
  }

  if (payload.featured !== undefined) {
    const featured = getBoolean(payload.featured);

    if (featured === null) {
      return { ok: false, error: "Featured must be true or false." };
    }

    updates.featured = featured;
  }

  if (payload.active !== undefined) {
    const active = getBoolean(payload.active);

    if (active === null) {
      return { ok: false, error: "Active must be true or false." };
    }

    updates.active = active;
  }

  if (Object.keys(updates).length === 0) {
    return { ok: false, error: "No valid update fields were provided." };
  }

  return { ok: true, data: updates };
}

export function parseOrderCreateInput(payload: unknown): ParseResult<OrderCreateInput> {
  if (!ensureRecord(payload)) {
    return { ok: false, error: "Invalid request body." };
  }

  const itemsValue = payload.items;
  const shippingValue = payload.shipping;
  const notes = getOptionalString(payload.notes);
  const customerUserId = getOptionalString(payload.customerUserId);

  if (!Array.isArray(itemsValue) || itemsValue.length === 0) {
    return { ok: false, error: "At least one order item is required." };
  }

  const items: OrderCreateInput["items"] = [];

  for (const item of itemsValue) {
    if (!ensureRecord(item)) {
      return { ok: false, error: "Order items are invalid." };
    }

    const productId = getString(item.productId);
    const quantity = getNumber(item.quantity);

    if (!productId) {
      return { ok: false, error: "Each item requires a product ID." };
    }

    if (quantity === null || quantity < 1) {
      return { ok: false, error: "Each item quantity must be at least 1." };
    }

    items.push({ productId, quantity: Math.floor(quantity) });
  }

  if (!ensureRecord(shippingValue)) {
    return { ok: false, error: "Shipping details are required." };
  }

  const shipping: ShippingDetails = {
    fullName: getString(shippingValue.fullName) ?? "",
    email: getString(shippingValue.email)?.toLowerCase() ?? "",
    phone: getString(shippingValue.phone) ?? "",
    address1: getString(shippingValue.address1) ?? "",
    address2: getOptionalString(shippingValue.address2),
    city: getString(shippingValue.city) ?? "",
    state: getString(shippingValue.state) ?? "",
    postalCode: getString(shippingValue.postalCode) ?? "",
    country: getString(shippingValue.country) ?? "",
  };

  if (shipping.fullName.length < 2) {
    return { ok: false, error: "Shipping full name is required." };
  }

  if (!shipping.email.includes("@")) {
    return { ok: false, error: "A valid shipping email is required." };
  }

  if (shipping.phone.length < 7) {
    return { ok: false, error: "A valid phone number is required." };
  }

  if (!shipping.address1 || !shipping.city || !shipping.state) {
    return { ok: false, error: "Shipping address, city, and state are required." };
  }

  if (!shipping.postalCode || !shipping.country) {
    return { ok: false, error: "Postal code and country are required." };
  }

  return {
    ok: true,
    data: {
      customerUserId,
      items,
      shipping,
      notes,
    },
  };
}
