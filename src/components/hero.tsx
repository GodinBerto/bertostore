"use client";
import { ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";
import GridLayout from "./ui/grid";
import { categoriesLinks } from "@/constant/links";
import Link from "next/link";
import BackgroundCover from "./backgroundCover";
import { cn } from "@/lib/utils";
import { useCategoriesUiStore } from "@/store/categories-ui-store";

export default function HeroSection() {
  const isDesktopHeroCategoriesOpen = useCategoriesUiStore(
    (state) => state.isDesktopHeroCategoriesOpen
  );

  return (
    <GridLayout>
      <div className="grid grid-cols-1 md:grid-cols-4">
        <div
          id="hero-categories-panel"
          className={cn(
            "col-span-1 hidden border-r border-border md:block",
            !isDesktopHeroCategoriesOpen && "md:hidden"
          )}
        >
          <ul className="flex flex-col">
            {categoriesLinks.map(({ label, href, icon: Icon }) => (
              <li key={label} className="group">
                <Link
                  href={href}
                  className="flex items-center gap-3 px-3 py-4 hover:bg-background-primary hover:text-accent-foreground transition-colors"
                >
                  <Icon className="w-4 h-4 text-muted-foreground group-hover:text-button-foreground" />
                  <span className="text-sm font-medium">{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div
          className={cn(
            "relative col-span-1 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center bg-no-repeat text-white",
            isDesktopHeroCategoriesOpen ? "md:col-span-3" : "md:col-span-4"
          )}
        >
          <BackgroundCover />
          <div className="flex h-full flex-col justify-center gap-5 px-6 py-10 md:px-10">
            <h1 className="relative text-4xl font-semibold md:text-5xl">
              Upgrade
              <br /> Your Setup For Peak
              <br /> Performance
            </h1>
            <p className="relative max-w-3xl">
              Experience the perfect mix of power and reliability. From office
              work to gaming, our custom PCs deliver speed and style. Build
              yours to match your needs and budget.
            </p>

            <Button asChild className="relative flex w-fit gap-4">
              <Link href="/shop">
                Explore Products{" "}
                <span className="p-1 rounded-full bg-white">
                  <ArrowUpRight size={30} className="rounded-full text-button" />
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </GridLayout>
  );
}
