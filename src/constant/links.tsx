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
  { label: "Laptops", href: "/laptops", icon: Laptop },
  { label: "Desktops", href: "/desktops", icon: Server },
  { label: "Monitors", href: "/monitors", icon: Monitor },
  { label: "Components", href: "/components", icon: Cpu },
  { label: "Peripherals", href: "/peripherals", icon: Keyboard },
  { label: "Gaming", href: "/gaming", icon: Gamepad2 },
  { label: "Accessories", href: "/accessories", icon: Headphones },
  { label: "Networking", href: "/networking", icon: Wifi },
  { label: "Software", href: "/software", icon: AppWindow },
  { label: "Deals", href: "/deals", icon: BadgePercent },
];

export const navLinks = [
  { label: "Home", href: "/laptops" },
  { label: "Shop", href: "/laptops" },
  { label: "Blog", href: "/laptops" },
  { label: "Contact Us", href: "/laptops" },
];

export const footerLinks = [
  {
    title: "COMPANY",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "SHOP",
    links: [
      { label: "All Products", href: "/products" },
      { label: "New Arrivals", href: "/new-arrivals" },
      { label: "Best Sellers", href: "/best-sellers" },
      { label: "Brands", href: "/brands" },
      { label: "Deals & Offers", href: "/deals" },
    ],
  },
  {
    title: "HELP",
    links: [
      { label: "Customer Support", href: "/support" },
      { label: "FAQ", href: "/faq" },
      { label: "Returns & Refunds", href: "/returns" },
      { label: "Shipping Info", href: "/shipping" },
      { label: "Warranty", href: "/warranty" },
    ],
  },
];
