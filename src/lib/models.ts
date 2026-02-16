export type UserRole = "admin" | "customer";

export type OrderStatus = "pending" | "paid" | "fulfilled" | "cancelled";

export interface AppUser {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: string;
}

export interface PublicUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  image: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  supplierName: string;
  supplierUrl: string;
  featured: boolean;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductInput {
  title: string;
  description: string;
  category: string;
  image: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  supplierName: string;
  supplierUrl: string;
  featured?: boolean;
  active?: boolean;
}

export interface OrderItem {
  productId: string;
  title: string;
  image: string;
  quantity: number;
  price: number;
}

export interface ShippingDetails {
  fullName: string;
  email: string;
  phone: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerUserId?: string;
  shipping: ShippingDetails;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  status: OrderStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderCreateInput {
  customerUserId?: string;
  shipping: ShippingDetails;
  items: Array<{ productId: string; quantity: number }>;
  notes?: string;
}

export interface DashboardStats {
  totalProducts: number;
  activeProducts: number;
  lowStockProducts: number;
  totalOrders: number;
  pendingOrders: number;
  fulfilledOrders: number;
  totalRevenue: number;
}
