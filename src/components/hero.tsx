"use client";
import { ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";
import GridLayout from "./ui/grid";
import { categoriesLinks } from "@/constant/links";
import Link from "next/link";

export default function HeroSection() {
  return (
    <GridLayout>
      <div className="grid grid-cols-4">
        <div className="col-span-1 border-r border-border">
          {/* <h2 className="font-semibold text-lg mb-3">All Categories</h2> */}
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

        <div className="text-white col-span-3 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center bg-no-repeat relative">
          <div className="bg-black/50 h-full w-full absolute top-0 left-0" />
          <div className="flex flex-col gap-5 px-10 py-4 justify-center h-full">
            <h1 className="text-5xl font-semibold relative">
              Upgrade
              <br /> Your Setup For Peak
              <br /> Performance
            </h1>
            <p className="max-w-3xl relative">
              Experience the perfect mix of power and reliability. From office
              work to gaming, our custom PCs deliver speed and style. Build
              yours to match your needs and budget.
            </p>

            <Button className="w-fit flex gap-4 relative">
              Explore Our Product{" "}
              <span className="p-1 rounded-full bg-white">
                <ArrowUpRight
                  size={30}
                  className=" rounded-full  text-button"
                />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </GridLayout>
  );
}
