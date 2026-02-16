import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import {
  AppUser,
  DashboardStats,
  Order,
  OrderCreateInput,
  OrderStatus,
  Product,
  ProductInput,
  PublicUser,
  UserRole,
} from "@/lib/models";
import { hashPassword } from "@/lib/password";
import { seedProducts } from "@/lib/seed-data";

const DATA_DIR = path.join(process.cwd(), "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");
const PRODUCTS_FILE = path.join(DATA_DIR, "products.json");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");

let readyPromise: Promise<void> | null = null;

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseJson<T>(raw: string, fallback: T): T {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function readJsonFile<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const raw = await readFile(filePath, "utf8");

    if (!raw.trim()) {
      return fallback;
    }

    return parseJson(raw, fallback);
  } catch {
    return fallback;
  }
}

async function writeJsonFile<T>(filePath: string, data: T): Promise<void> {
  await writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

function buildProduct(input: ProductInput): Product {
  const now = new Date().toISOString();

  return {
    id: randomUUID(),
    slug: `${slugify(input.title)}-${Math.floor(Math.random() * 100000)}`,
    title: input.title,
    description: input.description,
    category: input.category,
    image: input.image,
    price: Number(input.price),
    compareAtPrice:
      input.compareAtPrice !== undefined ? Number(input.compareAtPrice) : undefined,
    stock: Number(input.stock),
    supplierName: input.supplierName,
    supplierUrl: input.supplierUrl,
    featured: Boolean(input.featured),
    active: input.active ?? true,
    createdAt: now,
    updatedAt: now,
  };
}

function createOrderNumber(): string {
  const numericPart = Date.now().toString().slice(-8);
  const randomPart = Math.floor(10 + Math.random() * 90);

  return `BST-${numericPart}${randomPart}`;
}

async function initializeData(): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });

  const users = await readJsonFile<AppUser[]>(USERS_FILE, []);
  const products = await readJsonFile<Product[]>(PRODUCTS_FILE, []);
  const orders = await readJsonFile<Order[]>(ORDERS_FILE, []);

  if (users.length === 0) {
    const adminEmail = normalizeEmail(
      process.env.DEFAULT_ADMIN_EMAIL ?? "admin@bertostore.com"
    );
    const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD ?? "Admin123!";

    users.push({
      id: randomUUID(),
      name: "Store Admin",
      email: adminEmail,
      passwordHash: hashPassword(adminPassword),
      role: "admin",
      createdAt: new Date().toISOString(),
    });
  }

  if (products.length === 0) {
    products.push(...seedProducts.map((product) => buildProduct(product)));
  }

  await Promise.all([
    writeJsonFile(USERS_FILE, users),
    writeJsonFile(PRODUCTS_FILE, products),
    writeJsonFile(ORDERS_FILE, orders),
  ]);
}

async function ensureDataReady(): Promise<void> {
  if (!readyPromise) {
    readyPromise = initializeData();
  }

  await readyPromise;
}

export function toPublicUser(user: AppUser): PublicUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
  };
}

export async function getUsers(): Promise<AppUser[]> {
  await ensureDataReady();
  const users = await readJsonFile<AppUser[]>(USERS_FILE, []);

  return users.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function findUserByEmail(email: string): Promise<AppUser | undefined> {
  const users = await getUsers();

  return users.find((user) => user.email === normalizeEmail(email));
}

export async function findUserById(userId: string): Promise<AppUser | undefined> {
  const users = await getUsers();

  return users.find((user) => user.id === userId);
}

export async function createUser(input: {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}): Promise<AppUser | null> {
  await ensureDataReady();

  const users = await readJsonFile<AppUser[]>(USERS_FILE, []);
  const email = normalizeEmail(input.email);

  if (users.some((user) => user.email === email)) {
    return null;
  }

  const user: AppUser = {
    id: randomUUID(),
    name: input.name.trim(),
    email,
    passwordHash: hashPassword(input.password),
    role: input.role ?? "customer",
    createdAt: new Date().toISOString(),
  };

  users.push(user);
  await writeJsonFile(USERS_FILE, users);

  return user;
}

export async function getProducts(): Promise<Product[]> {
  await ensureDataReady();
  const products = await readJsonFile<Product[]>(PRODUCTS_FILE, []);

  return products.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function getActiveProducts(): Promise<Product[]> {
  const products = await getProducts();

  return products.filter((product) => product.active);
}

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  const products = await getActiveProducts();

  return products.filter((product) => product.featured).slice(0, limit);
}

export async function findProductById(productId: string): Promise<Product | undefined> {
  const products = await getProducts();

  return products.find((product) => product.id === productId);
}

export async function createProduct(input: ProductInput): Promise<Product> {
  await ensureDataReady();

  const products = await readJsonFile<Product[]>(PRODUCTS_FILE, []);
  const product = buildProduct(input);

  products.unshift(product);
  await writeJsonFile(PRODUCTS_FILE, products);

  return product;
}

export async function updateProduct(
  productId: string,
  updates: Partial<ProductInput>
): Promise<Product | null> {
  await ensureDataReady();

  const products = await readJsonFile<Product[]>(PRODUCTS_FILE, []);
  const index = products.findIndex((product) => product.id === productId);

  if (index === -1) {
    return null;
  }

  const currentProduct = products[index];
  const title = updates.title?.trim() || currentProduct.title;

  const nextProduct: Product = {
    ...currentProduct,
    title,
    slug:
      title !== currentProduct.title
        ? `${slugify(title)}-${Math.floor(Math.random() * 100000)}`
        : currentProduct.slug,
    description: updates.description ?? currentProduct.description,
    category: updates.category ?? currentProduct.category,
    image: updates.image ?? currentProduct.image,
    price:
      updates.price !== undefined ? Number(updates.price) : currentProduct.price,
    compareAtPrice:
      updates.compareAtPrice !== undefined
        ? Number(updates.compareAtPrice)
        : currentProduct.compareAtPrice,
    stock:
      updates.stock !== undefined ? Number(updates.stock) : currentProduct.stock,
    supplierName: updates.supplierName ?? currentProduct.supplierName,
    supplierUrl: updates.supplierUrl ?? currentProduct.supplierUrl,
    featured:
      updates.featured !== undefined ? updates.featured : currentProduct.featured,
    active: updates.active !== undefined ? updates.active : currentProduct.active,
    updatedAt: new Date().toISOString(),
  };

  products[index] = nextProduct;
  await writeJsonFile(PRODUCTS_FILE, products);

  return nextProduct;
}

export async function deleteProduct(productId: string): Promise<boolean> {
  await ensureDataReady();

  const products = await readJsonFile<Product[]>(PRODUCTS_FILE, []);
  const remainingProducts = products.filter((product) => product.id !== productId);

  if (remainingProducts.length === products.length) {
    return false;
  }

  await writeJsonFile(PRODUCTS_FILE, remainingProducts);

  return true;
}

export async function createOrder(input: OrderCreateInput): Promise<Order> {
  await ensureDataReady();

  const products = await readJsonFile<Product[]>(PRODUCTS_FILE, []);
  const orders = await readJsonFile<Order[]>(ORDERS_FILE, []);

  if (input.items.length === 0) {
    throw new Error("Order requires at least one item.");
  }

  const orderItems: Order["items"] = [];
  let subtotal = 0;

  for (const item of input.items) {
    const quantity = Number(item.quantity);

    if (!Number.isFinite(quantity) || quantity < 1) {
      throw new Error("Item quantity must be at least 1.");
    }

    const product = products.find(
      (entry) => entry.id === item.productId && entry.active
    );

    if (!product) {
      throw new Error("One or more products are no longer available.");
    }

    if (product.stock < quantity) {
      throw new Error(`Not enough stock for ${product.title}.`);
    }

    product.stock -= quantity;
    product.updatedAt = new Date().toISOString();

    orderItems.push({
      productId: product.id,
      title: product.title,
      image: product.image,
      quantity,
      price: product.price,
    });

    subtotal += quantity * product.price;
  }

  const shippingFee = subtotal >= 500 ? 0 : 20;
  const now = new Date().toISOString();

  const order: Order = {
    id: randomUUID(),
    orderNumber: createOrderNumber(),
    customerUserId: input.customerUserId,
    shipping: {
      ...input.shipping,
      email: normalizeEmail(input.shipping.email),
    },
    items: orderItems,
    subtotal: Number(subtotal.toFixed(2)),
    shippingFee,
    total: Number((subtotal + shippingFee).toFixed(2)),
    status: "pending",
    notes: input.notes?.trim() || undefined,
    createdAt: now,
    updatedAt: now,
  };

  orders.unshift(order);

  await Promise.all([
    writeJsonFile(PRODUCTS_FILE, products),
    writeJsonFile(ORDERS_FILE, orders),
  ]);

  return order;
}

export async function getOrders(): Promise<Order[]> {
  await ensureDataReady();
  const orders = await readJsonFile<Order[]>(ORDERS_FILE, []);

  return orders.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function findOrderById(orderId: string): Promise<Order | undefined> {
  const orders = await getOrders();

  return orders.find((order) => order.id === orderId);
}

export async function getOrdersForUser(
  userId: string,
  email: string
): Promise<Order[]> {
  const normalizedEmail = normalizeEmail(email);
  const orders = await getOrders();

  return orders.filter(
    (order) =>
      order.customerUserId === userId ||
      normalizeEmail(order.shipping.email) === normalizedEmail
  );
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus
): Promise<Order | null> {
  await ensureDataReady();

  const orders = await readJsonFile<Order[]>(ORDERS_FILE, []);
  const index = orders.findIndex((order) => order.id === orderId);

  if (index === -1) {
    return null;
  }

  const nextOrder: Order = {
    ...orders[index],
    status,
    updatedAt: new Date().toISOString(),
  };

  orders[index] = nextOrder;
  await writeJsonFile(ORDERS_FILE, orders);

  return nextOrder;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const products = await getProducts();
  const orders = await getOrders();

  const totalRevenue = orders
    .filter((order) => order.status !== "cancelled")
    .reduce((sum, order) => sum + order.total, 0);

  return {
    totalProducts: products.length,
    activeProducts: products.filter((product) => product.active).length,
    lowStockProducts: products.filter((product) => product.stock < 6).length,
    totalOrders: orders.length,
    pendingOrders: orders.filter((order) => order.status === "pending").length,
    fulfilledOrders: orders.filter((order) => order.status === "fulfilled").length,
    totalRevenue: Number(totalRevenue.toFixed(2)),
  };
}

export async function getProductCategories(): Promise<string[]> {
  const products = await getActiveProducts();
  const categories = Array.from(new Set(products.map((product) => product.category)));

  return categories.sort((a, b) => a.localeCompare(b));
}
