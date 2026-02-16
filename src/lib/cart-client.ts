export interface CartItem {
  productId: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

const CART_STORAGE_KEY = "bertostore_cart";
const CART_EVENT_NAME = "cart:updated";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function emitCartUpdated(): void {
  if (!isBrowser()) {
    return;
  }

  window.dispatchEvent(new Event(CART_EVENT_NAME));
}

export function getCartItems(): CartItem[] {
  if (!isBrowser()) {
    return [];
  }

  const raw = window.localStorage.getItem(CART_STORAGE_KEY);

  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as CartItem[];

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed;
  } catch {
    return [];
  }
}

export function setCartItems(items: CartItem[]): void {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  emitCartUpdated();
}

export function clearCartItems(): void {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.removeItem(CART_STORAGE_KEY);
  emitCartUpdated();
}

export function addToCart(item: CartItem): void {
  const items = getCartItems();
  const existing = items.find((entry) => entry.productId === item.productId);

  if (existing) {
    existing.quantity += item.quantity;
  } else {
    items.push(item);
  }

  setCartItems(items);
}

export function updateCartItemQuantity(productId: string, quantity: number): void {
  const items = getCartItems();
  const nextItems = items
    .map((item) =>
      item.productId === productId ? { ...item, quantity: Math.max(1, quantity) } : item
    )
    .filter((item) => item.quantity > 0);

  setCartItems(nextItems);
}

export function removeCartItem(productId: string): void {
  const items = getCartItems();
  const nextItems = items.filter((item) => item.productId !== productId);

  setCartItems(nextItems);
}

export function getCartTotalItemCount(): number {
  return getCartItems().reduce((sum, item) => sum + item.quantity, 0);
}

export function getCartSubtotal(): number {
  return getCartItems().reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function getCartEventName(): string {
  return CART_EVENT_NAME;
}
