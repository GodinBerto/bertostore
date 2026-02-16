"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { categoriesLinks, navLinks } from "@/constant/links";
import { useCategoriesUiStore } from "@/store/categories-ui-store";
import GridLayout from "./ui/grid";

export default function SubNavbar() {
  const pathname = usePathname();
  const [isDesktopViewport, setIsDesktopViewport] = useState(false);
  const isMobileCategoriesOpen = useCategoriesUiStore(
    (state) => state.isMobileCategoriesOpen
  );
  const isDesktopHeroCategoriesOpen = useCategoriesUiStore(
    (state) => state.isDesktopHeroCategoriesOpen
  );
  const openMobileCategories = useCategoriesUiStore(
    (state) => state.openMobileCategories
  );
  const closeMobileCategories = useCategoriesUiStore(
    (state) => state.closeMobileCategories
  );
  const openDesktopHeroCategories = useCategoriesUiStore(
    (state) => state.openDesktopHeroCategories
  );
  const closeDesktopHeroCategories = useCategoriesUiStore(
    (state) => state.closeDesktopHeroCategories
  );

  const isHomePage = pathname === "/";
  const shouldUseHeroCategoriesOnDesktop = isDesktopViewport && isHomePage;
  const isCategoryControlOpen = shouldUseHeroCategoriesOnDesktop
    ? isDesktopHeroCategoriesOpen
    : isMobileCategoriesOpen;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const syncViewport = () => {
      setIsDesktopViewport(mediaQuery.matches);
    };

    syncViewport();
    mediaQuery.addEventListener("change", syncViewport);

    return () => {
      mediaQuery.removeEventListener("change", syncViewport);
    };
  }, []);

  function toggleCategories() {
    if (isCategoryControlOpen) {
      closeMobileCategories();
      closeDesktopHeroCategories();
      return;
    }

    if (shouldUseHeroCategoriesOnDesktop) {
      closeMobileCategories();
      openDesktopHeroCategories();
      return;
    }

    openMobileCategories();
  }

  return (
    <GridLayout>
      <div className="grid grid-cols-1">
        <div className="grid grid-cols-3 md:grid-cols-4">
          <button
            type="button"
            onClick={toggleCategories}
            className="col-span-2 flex items-center justify-between bg-background-primary px-3 py-2 text-foreground-primary md:col-span-1"
            aria-expanded={isCategoryControlOpen}
            aria-controls={
              shouldUseHeroCategoriesOnDesktop
                ? "hero-categories-panel"
                : "categories-panel"
            }
          >
            <span className="text-sm">All Categories</span>
            <span className="flex items-center gap-2">
              {isCategoryControlOpen ? <X size={16} /> : <Menu size={18} />}
            </span>
          </button>

          <div className="col-span-1 md:col-span-3">
            <ul className="grid grid-cols-2 text-sm md:grid-cols-4">
              {navLinks.map((link, index) => (
                <li
                  key={index}
                  className="border-r border-border p-2 last:border-r-0 hover:bg-border"
                >
                  <Link
                    href={link.href}
                    className="block py-2 text-center transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          id="categories-panel"
          className={`grid transition-all duration-300 ${
            isMobileCategoriesOpen
              ? "grid-rows-[1fr] border-t border-border"
              : "grid-rows-[0fr]"
          } ${shouldUseHeroCategoriesOnDesktop ? "md:hidden" : "md:block"}`}
        >
          <div className="overflow-hidden">
            <ul className="grid grid-cols-2 md:grid-cols-5">
              {categoriesLinks.map(({ label, href, icon: Icon }, index) => {
                const isLastInMobileRow = (index + 1) % 2 === 0;
                const isInMobileLastRow = index >= categoriesLinks.length - 2;
                const isLastInDesktopRow = (index + 1) % 5 === 0;
                const isInDesktopLastRow = index >= categoriesLinks.length - 5;

                return (
                  <li
                    key={label}
                    className={`border-border p-3 hover:bg-background-secondary ${
                      isLastInMobileRow ? "" : "border-r"
                    } ${isInMobileLastRow ? "" : "border-b"} ${
                      isLastInDesktopRow ? "md:border-r-0" : "md:border-r"
                    } ${isInDesktopLastRow ? "md:border-b-0" : "md:border-b"}`}
                  >
                    <Link
                      href={href}
                      onClick={closeMobileCategories}
                      className="flex items-center gap-2 text-sm font-medium"
                    >
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </GridLayout>
  );
}
