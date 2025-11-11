import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import GridCellSVG from "./svg/gridSvg";
import GridLayout from "./ui/grid";
import Image from "next/image";
import { products } from "@/constant/products";

export default function PopularProduct() {
  return (
    <div>
      <GridLayout>
        <div className="grid grid-cols-5">
          <div className="col-span-2 p-3 flex flex-col gap-3 border-r border-border">
            <h1 className="text-3xl font-semibold">Popular Products</h1>
            <p className="text-sm text-muted-foreground">
              Explore our most sought-after products, handpicked for their
              exceptional performance, reliability, and customer satisfaction.
              Find the perfect fit for your needs today.
            </p>
          </div>
          <div className="col-span-2 relative">
            <div className="absolute w-full h-full top-0">
              <GridCellSVG angle={1000} spacing={10} />
            </div>
          </div>
          <div className="col-span-1 grid grid-rows-3 border-l border-border">
            <div className="row-span-2 border-b border-border"></div>
            <div className="row-span-1 grid grid-cols-3">
              <div className="col-span-1 flex justify-center items-center bg-background-primary text-foreground-primary">
                <ChevronLeft />
              </div>
              <div className="col-span-1 flex justify-center items-center font-semibold">
                01
              </div>
              <div className="col-span-1 flex justify-center items-center bg-background-primary text-foreground-primary">
                <ChevronRight />
              </div>
            </div>
          </div>
        </div>
      </GridLayout>

      <GridLayout>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {products.slice(0, 10).map((product, index) => {
            const isLastInRow = (index + 1) % 5 === 0; // last item in each row of 5
            const isInSecondRow = index >= 5 && index < 10; // 5th to 10th product in this slice

            return (
              <div
                className={`col-span-1 bg-white border-border p-4 group ${
                  isLastInRow ? "" : "border-r"
                } ${isInSecondRow ? "" : "border-b"}`}
                key={index}
              >
                {/* Image */}
                <div className="relative w-full aspect-4/3 mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Category */}
                <p className="text-xs text-muted-foreground">
                  {product.category}
                </p>

                {/* Title */}
                <h3 className="text-sm font-medium mt-1 line-clamp-2">
                  {product.title}
                </h3>

                {/* Rating */}
                <div className="flex items-center text-yellow-500 text-xs mt-1">
                  {Array.from({ length: product.rating }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>

                {/* Price */}
                <div className="mt-2 flex items-center gap-2">
                  <p className="text-primary font-semibold text-base">
                    ${product.price.toFixed(2)}
                  </p>
                  {product.oldPrice && (
                    <p className="text-xs text-muted-foreground line-through">
                      ${product.oldPrice.toFixed(2)}
                    </p>
                  )}
                </div>

                {/* Add to cart button */}
                <button className="mt-4 flex items-center justify-center w-full gap-2 bg-primary text-white rounded-full py-2 hover:bg-primary/90 transition">
                  <ShoppingBag className="w-4 h-4" />
                  <span className="text-sm font-medium">Add to Cart</span>
                </button>
              </div>
            );
          })}
        </div>
      </GridLayout>
    </div>
  );
}
