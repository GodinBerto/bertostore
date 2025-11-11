import { Menu } from "lucide-react";
import GridLayout from "./ui/grid";
import { navLinks } from "@/constant/links";
import Link from "next/link";

export default function SubNavbar() {
  return (
    <GridLayout>
      <div className="grid grid-cols-4">
        <div className="col-span-1 bg-background-primary text-foreground-primary px-3 py-2 flex justify-between items-center">
          <h1 className="text-sm">All Categories</h1>
          <Menu />
        </div>

        <div className="col-span-3">
          <ul className="grid grid-cols-4 text-sm">
            {navLinks.map((link, index) => (
              <li
                key={index}
                className="p-2 border-r border-border last:border-r-0 hover:bg-border"
              >
                <Link
                  href={link.href}
                  className="block text-center py-2 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </GridLayout>
  );
}
