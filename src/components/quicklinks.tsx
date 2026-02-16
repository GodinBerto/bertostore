import Link from "next/link";

import BackgroundCover from "@/components/backgroundCover";
import { Button } from "@/components/ui/button";
import GridLayout from "@/components/ui/grid";

export default function QuickLinks() {
  return (
    <GridLayout>
      <div className="grid grid-cols-1 gap-4 text-white md:grid-cols-4 md:h-[700px]">
        <div className="relative col-span-1 h-full border-r border-border bg-[url('/images/gaming-desktop.jpg')] bg-cover bg-center bg-no-repeat p-6">
          <BackgroundCover />
          <div className="relative z-10 flex h-full flex-col justify-end space-y-2">
            <h1 className="text-2xl font-bold">Powerful Gaming PCs</h1>
            <p className="max-w-xs text-sm text-gray-200">
              Dominate every game with top-tier graphics, liquid cooling, and
              unmatched performance.
            </p>
            <Button asChild className="mt-3 w-fit text-sm font-medium">
              <Link href="/shop?category=Desktop">Shop Now</Link>
            </Button>
          </div>
        </div>

        <div className="col-span-1 grid h-full grid-rows-2 gap-4 border-x border-border md:col-span-2">
          <div className="relative row-span-1 border-b border-border bg-[url('/images/gaming-laptop.png')] bg-cover bg-center bg-no-repeat p-6">
            <BackgroundCover />
            <div className="relative z-10 flex h-full flex-col justify-end space-y-2">
              <h1 className="text-2xl font-bold">High-Performance Laptops</h1>
              <p className="max-w-md text-sm text-gray-200">
                Take your gaming anywhere with ultra-fast processors, vibrant
                displays, and powerful GPUs.
              </p>
              <Button asChild className="mt-3 w-fit text-sm font-medium">
                <Link href="/shop?category=Laptop">Explore More</Link>
              </Button>
            </div>
          </div>

          <div className="relative row-span-1 bg-[url('/images/game-headphones.jpg')] bg-cover bg-center bg-no-repeat p-6">
            <BackgroundCover />
            <div className="relative z-10 flex h-full flex-col justify-end space-y-2">
              <h1 className="text-2xl font-bold">Elite Accessories</h1>
              <p className="max-w-md text-sm text-gray-200">
                From precision headsets to RGB keyboards and streaming gear,
                upgrade your complete setup in one place.
              </p>
              <Button asChild className="mt-3 w-fit text-sm font-medium">
                <Link href="/shop?category=Accessories">Browse Gear</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="relative col-span-1 h-full border-r border-border bg-[url('/images/gaming-chair.jpg')] bg-cover bg-center bg-no-repeat p-6">
          <BackgroundCover />
          <div className="relative z-10 flex h-full flex-col justify-end space-y-2">
            <h1 className="text-2xl font-bold">Ergonomic Gaming Chairs</h1>
            <p className="max-w-xs text-sm text-gray-200">
              Stay comfortable through long sessions with designs made for
              ultimate support and style.
            </p>
            <Button asChild className="mt-3 w-fit text-sm font-medium">
              <Link href="/shop?q=chair">View Collection</Link>
            </Button>
          </div>
        </div>
      </div>
    </GridLayout>
  );
}
