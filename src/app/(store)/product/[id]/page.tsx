import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import AddToCartButton from "@/components/cart/add-to-cart-button";
import GridLayout from "@/components/ui/grid";
import { findProductById, getFeaturedProducts } from "@/lib/data-store";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const product = await findProductById(id);

  if (!product || !product.active) {
    notFound();
  }

  const recommended = (await getFeaturedProducts(4)).filter(
    (entry) => entry.id !== product.id
  );

  return (
    <div>
      <GridLayout>
        <section className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-xl border border-border bg-background-secondary">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="space-y-4">
            <p className="text-sm font-medium text-background-primary">{product.category}</p>
            <h1 className="text-3xl font-semibold">{product.title}</h1>
            <p className="text-sm text-muted-foreground">{product.description}</p>

            <div className="flex items-center gap-3">
              <p className="text-2xl font-semibold">${product.price.toFixed(2)}</p>
              {product.compareAtPrice ? (
                <p className="text-sm text-muted-foreground line-through">
                  ${product.compareAtPrice.toFixed(2)}
                </p>
              ) : null}
            </div>

            <p className="text-sm text-muted-foreground">Available stock: {product.stock}</p>

            <AddToCartButton
              productId={product.id}
              title={product.title}
              image={product.image}
              price={product.price}
              className="w-full rounded-md md:w-fit"
            />

            <div className="rounded-lg border border-border bg-white p-4 text-sm">
              <p className="font-medium">Dropshipping supplier</p>
              <p className="mt-1 text-muted-foreground">{product.supplierName}</p>
              <Link
                href={product.supplierUrl}
                className="mt-2 inline-block text-background-primary underline"
                target="_blank"
              >
                Open supplier page
              </Link>
            </div>
          </div>
        </section>
      </GridLayout>

      {recommended.length > 0 ? (
        <GridLayout>
          <section className="border-t border-border p-4">
            <h2 className="text-xl font-semibold">You may also like</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {recommended.map((item) => (
                <Link
                  href={`/product/${item.id}`}
                  key={item.id}
                  className="rounded-lg border border-border p-3 transition-colors hover:bg-background-secondary"
                >
                  <div className="relative mb-2 aspect-[4/3] overflow-hidden rounded-md bg-white">
                    <Image src={item.image} alt={item.title} fill className="object-contain" />
                  </div>
                  <p className="line-clamp-2 text-sm font-medium">{item.title}</p>
                  <p className="mt-1 text-sm font-semibold">${item.price.toFixed(2)}</p>
                </Link>
              ))}
            </div>
          </section>
        </GridLayout>
      ) : null}
    </div>
  );
}
