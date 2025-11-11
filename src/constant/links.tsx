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
