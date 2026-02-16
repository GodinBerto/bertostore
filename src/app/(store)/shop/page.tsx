import Image from "next/image";
import Link from "next/link";

import AddToCartButton from "@/components/cart/add-to-cart-button";
import GridLayout from "@/components/ui/grid";
import { getActiveProducts, getProductCategories } from "@/lib/data-store";

type SearchValue = string | string[] | undefined;

interface ShopPageProps {
  searchParams: Promise<Record<string, SearchValue>>;
}

function firstValue(value: SearchValue): string {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const query = firstValue(params.q).trim().toLowerCase();
  const category = firstValue(params.category).trim();
  const sort = firstValue(params.sort).trim();

  const [products, categories] = await Promise.all([
    getActiveProducts(),
    getProductCategories(),
  ]);

  let filteredProducts = products;

  if (query) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
  }

  if (category) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (sort === "price-asc") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sort === "name") {
    filteredProducts = [...filteredProducts].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  } else {
    filteredProducts = [...filteredProducts].sort((a, b) =>
      b.updatedAt.localeCompare(a.updatedAt)
    );
  }

  return (
    <div>
      <GridLayout>
        <section className="grid grid-cols-1 gap-6 p-4 md:grid-cols-4">
          <div className="space-y-2 md:col-span-1">
            <h1 className="text-3xl font-semibold">Shop Products</h1>
            <p className="text-sm text-muted-foreground">
              Find products, compare prices, and add inventory-backed items to
              your cart instantly.
            </p>
            <p className="text-sm font-medium">{filteredProducts.length} products found</p>
          </div>

          <form
            action="/shop"
            className="grid grid-cols-1 gap-3 rounded-xl border border-border bg-white p-3 md:col-span-3 md:grid-cols-4"
          >
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Search by product name"
              className="rounded-md border border-border px-3 py-2 text-sm md:col-span-2"
            />

            <select
              name="category"
              defaultValue={category}
              className="rounded-md border border-border px-3 py-2 text-sm"
            >
              <option value="">All categories</option>
              {categories.map((entry) => (
                <option key={entry} value={entry}>
                  {entry}
                </option>
              ))}
            </select>

            <select
              name="sort"
              defaultValue={sort}
              className="rounded-md border border-border px-3 py-2 text-sm"
            >
              <option value="">Newest</option>
              <option value="price-asc">Price: Low to high</option>
              <option value="price-desc">Price: High to low</option>
              <option value="name">Name: A to Z</option>
            </select>

            <button
              type="submit"
              className="rounded-md bg-background-primary px-4 py-2 text-sm font-semibold text-white md:col-span-4"
            >
              Apply filters
            </button>
          </form>
        </section>
      </GridLayout>

      <GridLayout>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product, index) => {
            const isRightEdge = (index + 1) % 4 === 0;
            const isLastRow = index >= filteredProducts.length - (filteredProducts.length % 4 || 4);

            return (
              <article
                key={product.id}
                className={`group border-border p-4 ${isRightEdge ? "" : "border-r"} ${
                  isLastRow ? "" : "border-b"
                }`}
              >
                <Link href={`/product/${product.id}`} className="block">
                  <div className="relative mb-4 aspect-4/3 overflow-hidden rounded-lg bg-background-secondary">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{product.category}</p>
                  <h2 className="mt-1 line-clamp-2 min-h-[48px] text-sm font-semibold">
                    {product.title}
                  </h2>
                </Link>

                <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">
                  {product.description}
                </p>

                <div className="mt-3 flex items-end justify-between">
                  <div>
                    <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
                    {product.compareAtPrice ? (
                      <p className="text-xs text-muted-foreground line-through">
                        ${product.compareAtPrice.toFixed(2)}
                      </p>
                    ) : null}
                  </div>
                  <p className="text-xs text-muted-foreground">Stock: {product.stock}</p>
                </div>

                <AddToCartButton
                  productId={product.id}
                  title={product.title}
                  image={product.image}
                  price={product.price}
                  className="mt-4 w-full rounded-md"
                />
              </article>
            );
          })}
        </section>
      </GridLayout>
    </div>
  );
}
