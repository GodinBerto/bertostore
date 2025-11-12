import BackgroundCover from "./backgroundCover";
import GridLayout from "./ui/grid";
import { Button } from "@/components/ui/button";

export default function QuickLinks() {
  return (
    <GridLayout>
      <div className="grid grid-cols-4 h-[700px] gap-4 text-white">
        {/* Gaming PC */}
        <div className="col-span-1 border-r border-border h-full bg-[url('/images/gaming-desktop.jpg')] bg-cover bg-center bg-no-repeat relative flex flex-col justify-end p-6">
          <BackgroundCover />
          <div className="relative z-10 space-y-2">
            <h1 className="text-2xl font-bold">Powerful Gaming PCs</h1>
            <p className="text-sm text-gray-200 max-w-xs">
              Dominate every game with top-tier graphics, liquid cooling, and
              unmatched performance.
            </p>
            <Button className="mt-3 text-sm font-medium">Shop Now</Button>
          </div>
        </div>

        {/* Gaming Laptops + Accessories */}
        <div className="col-span-2 h-full border-x border-border grid grid-rows-2 gap-4">
          {/* Gaming Laptops */}
          <div className="row-span-1 border-b border-border bg-[url('/images/gaming-laptop.png')] bg-cover bg-center bg-no-repeat relative flex flex-col justify-end p-6">
            <BackgroundCover />
            <div className="relative z-10 space-y-2">
              <h1 className="text-2xl font-bold">High-Performance Laptops</h1>
              <p className="text-sm text-gray-200 max-w-md">
                Take your gaming anywhere with ultra-fast processors, vibrant
                displays, and powerful GPUs.
              </p>
              <Button className="mt-3 text-sm font-medium">Explore More</Button>
            </div>
          </div>

          {/* Accessories */}
          <div className="row-span-1 bg-[url('/images/game-headphones.jpg')] bg-cover bg-center bg-no-repeat relative flex flex-col justify-end p-6">
            <BackgroundCover />
            <div className="relative z-10 space-y-2">
              <h1 className="text-2xl font-bold">Elite Accessories</h1>
              <p className="text-sm text-gray-200 max-w-md">
                Immerse yourself fully — from precision headsets to RGB
                keyboards and streaming gear.
              </p>
              <Button className="mt-3 text-sm font-medium">Browse Gear</Button>
            </div>
          </div>
        </div>

        {/* Gaming Chair */}
        <div className="col-span-1 border-r border-border h-full bg-[url('/images/gaming-chair.jpg')] bg-cover bg-center bg-no-repeat relative flex flex-col justify-end p-6">
          <BackgroundCover />
          <div className="relative z-10 space-y-2">
            <h1 className="text-2xl font-bold">Ergonomic Gaming Chairs</h1>
            <p className="text-sm text-gray-200 max-w-xs">
              Stay comfortable through long sessions with designs made for
              ultimate support and style.
            </p>
            <Button className="mt-3 text-sm font-medium">
              View Collection
            </Button>
          </div>
        </div>
      </div>
    </GridLayout>
  );
}
