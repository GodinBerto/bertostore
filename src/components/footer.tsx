import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

import { footerLinks } from "@/constant/links";
import { Button } from "@/components/ui/button";
import GridLayout from "@/components/ui/grid";

export default function Footer() {
  return (
    <div>
      <GridLayout className="overflow-hidden">
        <div className="flex w-full items-center justify-center leading-none text-[64px] sm:text-[96px] lg:text-[160px]">
          BERTO STORE
        </div>
      </GridLayout>

      <GridLayout>
        <div className="grid grid-cols-1 md:grid-cols-6">
          <div className="col-span-1 grid grid-rows-2 border-r border-border">
            <div className="border-b border-border p-3">
              <p className="text-lg md:text-xl">
                Browse through our wide collection of tech products and
                accessories.
              </p>
            </div>
            <div className="p-3" />
          </div>

          <div className="col-span-1 grid grid-cols-1 sm:grid-cols-3 md:col-span-3">
            {footerLinks.map((section, index) => (
              <div
                key={index}
                className="border-b border-border p-3 sm:last:border-r md:border-b-0 md:border-r"
              >
                <h3 className="mb-4 font-semibold">{section.title}</h3>
                {section.links.map((link, linkIndex) => (
                  <div key={linkIndex} className="mb-2">
                    <Link
                      href={link.href}
                      className="text-muted-foreground transition-colors hover:text-background-primary"
                    >
                      {link.label}
                    </Link>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="col-span-1 p-3 md:col-span-2">
            <p className="mb-4 text-lg md:text-xl">
              Subscribe to get the latest deals, new arrivals, and tech updates.
            </p>

            <form className="flex flex-col gap-3 sm:flex-row sm:gap-0">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-border px-3 py-2 focus:outline-none"
              />
              <Button type="submit" className="rounded-none sm:rounded-l-none">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </GridLayout>

      <GridLayout>
        <div className="flex flex-col items-center justify-between gap-4 px-3 py-6 text-sm text-muted-foreground sm:flex-row">
          <div className="flex gap-4">
            <Link
              href="#"
              aria-label="Facebook"
              className="transition-colors hover:text-foreground"
            >
              <Facebook size={20} />
            </Link>
            <Link
              href="#"
              aria-label="Instagram"
              className="transition-colors hover:text-foreground"
            >
              <Instagram size={20} />
            </Link>
            <Link
              href="#"
              aria-label="Twitter"
              className="transition-colors hover:text-foreground"
            >
              <Twitter size={20} />
            </Link>
            <Link
              href="#"
              aria-label="YouTube"
              className="transition-colors hover:text-foreground"
            >
              <Youtube size={20} />
            </Link>
          </div>

          <div className="text-center sm:text-right">
            &copy; {new Date().getFullYear()} Berto Store. All rights reserved.
          </div>
        </div>
      </GridLayout>
    </div>
  );
}
