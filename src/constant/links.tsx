import {
  Laptop,
  Monitor,
  Cpu,
  Keyboard,
  Gamepad2,
  Headphones,
  Wifi,
  AppWindow,
  BadgePercent,
  Server,
} from "lucide-react";

export const categoriesLinks = [
  { label: "Laptops", href: "/shop?category=Laptop", icon: Laptop },
  { label: "Desktops", href: "/shop?category=Desktop", icon: Server },
  { label: "Monitors", href: "/shop?category=Monitor", icon: Monitor },
  { label: "Components", href: "/shop?category=Components", icon: Cpu },
  { label: "Peripherals", href: "/shop?category=Peripherals", icon: Keyboard },
  { label: "Gaming", href: "/shop?category=Gaming", icon: Gamepad2 },
  {
    label: "Accessories",
    href: "/shop?category=Accessories",
    icon: Headphones,
  },
  { label: "Networking", href: "/shop?category=Networking", icon: Wifi },
  { label: "Software", href: "/shop?category=Software", icon: AppWindow },
  { label: "Deals", href: "/shop?sort=price-asc", icon: BadgePercent },
];

export const navLinks = [{ label: "Shop", href: "/shop" }];

export const footerLinks = [
  {
    title: "COMPANY",
    links: [
      { label: "Home", href: "/" },
      { label: "Shop", href: "/shop" },
      { label: "Account", href: "/account" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
  {
    title: "SHOP",
    links: [
      { label: "All Products", href: "/shop" },
      { label: "Laptops", href: "/shop?category=Laptop" },
      { label: "Desktops", href: "/shop?category=Desktop" },
      { label: "Monitors", href: "/shop?category=Monitor" },
      { label: "Deals & Offers", href: "/shop?sort=price-asc" },
    ],
  },
  {
    title: "HELP",
    links: [
      { label: "Customer Support", href: "/account" },
      { label: "Checkout", href: "/checkout" },
      { label: "Cart", href: "/cart" },
      { label: "Order Tracking", href: "/account" },
      { label: "Policies", href: "/account" },
    ],
  },
];
