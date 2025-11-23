import GridLayout from "./ui/grid";
import { footerLinks } from "@/constant/links";
import { Button } from "./ui/button";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <div>
      {/* BIG TITLE */}
      <GridLayout className="overflow-hidden">
        <div className="text-[120px] sm:text-[100px] md:text-[120px] lg:text-[150px] xl:text-[200px] 2xl:text-[250px] w-full flex justify-center items-center leading-none">
          BERTO STORE
        </div>
      </GridLayout>

      {/* MAIN GRID */}
      <GridLayout>
        <div className="grid grid-cols-1 md:grid-cols-6">
          {/* LEFT TEXT */}
          <div className="col-span-1 grid grid-rows-2 border-r border-border">
            <div className="p-3 border-b border-border">
              <p className="text-lg md:text-xl">
                Browse through our wide collection of tech products and
                accessories.
              </p>
            </div>
            <div className="p-3"></div>
          </div>

          {/* FOOTER LINKS */}
          <div className="col-span-1 md:col-span-3 grid grid-cols-1 sm:grid-cols-3">
            {footerLinks.map((section, index) => (
              <div
                key={index}
                className="p-3 border-b md:border-b-0 md:border-r border-border"
              >
                <h3 className="font-semibold mb-4">{section.title}</h3>
                {section.links.map((link, linkIndex) => (
                  <div key={linkIndex} className="mb-2">
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-background-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* NEWSLETTER */}
          <div className="col-span-1 md:col-span-2 p-3">
            <p className="text-lg md:text-xl mb-4">
              Subscribe to get the latest deals, new arrivals, and tech updates.
            </p>

            <form className="flex flex-col sm:flex-row gap-3 sm:gap-0">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-border focus:outline-none"
              />
              <Button type="submit" className="rounded-none sm:rounded-l-none">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </GridLayout>

      {/* SOCIALS + COPYRIGHT */}
      <GridLayout>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 px-3 text-sm text-muted-foreground">
          {/* Social Icons */}
          <div className="flex gap-4">
            <Link
              href="#"
              aria-label="Facebook"
              className="hover:text-foreground transition-colors"
            >
              <Facebook size={20} />
            </Link>
            <Link
              href="#"
              aria-label="Instagram"
              className="hover:text-foreground transition-colors"
            >
              <Instagram size={20} />
            </Link>
            <Link
              href="#"
              aria-label="Twitter"
              className="hover:text-foreground transition-colors"
            >
              <Twitter size={20} />
            </Link>
            <Link
              href="#"
              aria-label="YouTube"
              className="hover:text-foreground transition-colors"
            >
              <Youtube size={20} />
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-center sm:text-right">
            © 2024 Berto Studio. All rights reserved.
          </div>
        </div>
      </GridLayout>
    </div>
  );
}
