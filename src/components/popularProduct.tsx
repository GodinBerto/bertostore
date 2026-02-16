import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import AddToCartButton from "@/components/cart/add-to-cart-button";
import GridLayout from "@/components/ui/grid";
import { getFeaturedProducts } from "@/lib/data-store";

export default async function PopularProduct() {
  const products = await getFeaturedProducts(10);

  return (
    <div>
      <GridLayout>
        <div className="grid grid-cols-1 md:grid-cols-6">
          <div className="col-span-1 border-r border-border p-3 md:col-span-2">
            <h1 className="text-3xl font-semibold">Popular Products</h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Explore our most sought-after products, handpicked for their
              exceptional performance, reliability, and customer satisfaction.
              Find the perfect fit for your needs today.
            </p>
            <div className="mt-6">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-background-secondary"
              >
                View all products
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <div className="hidden border-l border-border md:col-span-4 md:block" />
        </div>
      </GridLayout>

      <GridLayout>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {products.map((product, index) => {
            const isLastInRow = (index + 1) % 5 === 0;
            const isInSecondRow = index >= 5 && index < 10;

            return (
              <div
                className={`group col-span-1 border-border bg-white p-4 ${
                  isLastInRow ? "" : "border-r"
                } ${isInSecondRow ? "" : "border-b"}`}
                key={product.id}
              >
                <div className="relative mb-4 aspect-4/3 w-full overflow-hidden rounded-lg">
                  <Link href={`/product/${product.id}`}>
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </Link>
                </div>

                <p className="text-xs text-muted-foreground">{product.category}</p>

                <Link href={`/product/${product.id}`}>
                  <h3 className="mt-1 line-clamp-2 min-h-[40px] text-sm font-medium">
                    {product.title}
                  </h3>
                </Link>

                <div className="mt-2 flex items-center gap-2">
                  <p className="text-base font-semibold text-background-primary">
                    ${product.price.toFixed(2)}
                  </p>
                  {product.compareAtPrice ? (
                    <p className="text-xs text-muted-foreground line-through">
                      ${product.compareAtPrice.toFixed(2)}
                    </p>
                  ) : null}
                </div>

                <AddToCartButton
                  productId={product.id}
                  title={product.title}
                  image={product.image}
                  price={product.price}
                  className="mt-4 w-full rounded-md"
                />
              </div>
            );
          })}
        </div>
      </GridLayout>
    </div>
  );
}
