"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";

interface ProductRecord {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  supplierName: string;
  supplierUrl: string;
  featured: boolean;
  active: boolean;
  updatedAt: string;
}

interface ProductsResponse {
  error?: string;
  products?: ProductRecord[];
  product?: ProductRecord;
}

interface ProductFormState {
  title: string;
  category: string;
  description: string;
  image: string;
  price: string;
  compareAtPrice: string;
  stock: string;
  supplierName: string;
  supplierUrl: string;
  featured: boolean;
  active: boolean;
}

const initialForm: ProductFormState = {
  title: "",
  category: "",
  description: "",
  image: "/images/products/laptop.jpg",
  price: "",
  compareAtPrice: "",
  stock: "",
  supplierName: "",
  supplierUrl: "https://supplier.example.com/",
  featured: false,
  active: true,
};

export default function DashboardProductsPage() {
  const [products, setProducts] = useState<ProductRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductFormState>(initialForm);

  const sortedProducts = useMemo(
    () => [...products].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt)),
    [products]
  );

  async function fetchProducts() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/products?includeInactive=1");
      const result = (await response.json()) as ProductsResponse;

      if (!response.ok || !result.products) {
        setError(result.error ?? "Could not load products.");
        return;
      }

      setProducts(result.products);
    } catch {
      setError("Network error while loading products.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  function setField<K extends keyof ProductFormState>(
    field: K,
    value: ProductFormState[K]
  ) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmitting(true);
    setError(null);

    const payload = {
      title: form.title,
      category: form.category,
      description: form.description,
      image: form.image,
      price: Number(form.price),
      compareAtPrice: form.compareAtPrice ? Number(form.compareAtPrice) : undefined,
      stock: Number(form.stock),
      supplierName: form.supplierName,
      supplierUrl: form.supplierUrl,
      featured: form.featured,
      active: form.active,
    };

    const endpoint = editingId ? `/api/products/${editingId}` : "/api/products";
    const method = editingId ? "PATCH" : "POST";

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as ProductsResponse;

      if (!response.ok) {
        setError(result.error ?? "Could not save product.");
        return;
      }

      await fetchProducts();
      setEditingId(null);
      setForm(initialForm);
    } catch {
      setError("Network error while saving product.");
    } finally {
      setSubmitting(false);
    }
  }

  function startEdit(product: ProductRecord) {
    setEditingId(product.id);
    setForm({
      title: product.title,
      category: product.category,
      description: product.description,
      image: product.image,
      price: product.price.toString(),
      compareAtPrice:
        product.compareAtPrice !== undefined ? product.compareAtPrice.toString() : "",
      stock: product.stock.toString(),
      supplierName: product.supplierName,
      supplierUrl: product.supplierUrl,
      featured: product.featured,
      active: product.active,
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(initialForm);
  }

  async function deleteProduct(productId: string) {
    const confirmed = window.confirm("Delete this product?");

    if (!confirmed) {
      return;
    }

    setError(null);

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      const result = (await response.json()) as ProductsResponse;

      if (!response.ok) {
        setError(result.error ?? "Could not delete product.");
        return;
      }

      await fetchProducts();

      if (editingId === productId) {
        cancelEdit();
      }
    } catch {
      setError("Network error while deleting product.");
    }
  }

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl font-semibold">Product Management</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Add new listings, update supplier details, and manage storefront visibility.
        </p>
      </section>

      <section className="rounded-lg border border-border bg-white p-4">
        <h2 className="text-lg font-semibold">
          {editingId ? "Edit product" : "Add new product"}
        </h2>

        <form onSubmit={submitForm} className="mt-4 space-y-3">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <input
              value={form.title}
              onChange={(event) => setField("title", event.target.value)}
              placeholder="Product title"
              className="rounded-md border border-border px-3 py-2"
              required
            />
            <input
              value={form.category}
              onChange={(event) => setField("category", event.target.value)}
              placeholder="Category (e.g., Laptop)"
              className="rounded-md border border-border px-3 py-2"
              required
            />
            <input
              value={form.image}
              onChange={(event) => setField("image", event.target.value)}
              placeholder="Image path /images/products/example.jpg"
              className="rounded-md border border-border px-3 py-2"
              required
            />
            <input
              value={form.stock}
              onChange={(event) => setField("stock", event.target.value)}
              type="number"
              min="0"
              placeholder="Stock"
              className="rounded-md border border-border px-3 py-2"
              required
            />
            <input
              value={form.price}
              onChange={(event) => setField("price", event.target.value)}
              type="number"
              step="0.01"
              min="0"
              placeholder="Price"
              className="rounded-md border border-border px-3 py-2"
              required
            />
            <input
              value={form.compareAtPrice}
              onChange={(event) => setField("compareAtPrice", event.target.value)}
              type="number"
              step="0.01"
              min="0"
              placeholder="Compare-at price (optional)"
              className="rounded-md border border-border px-3 py-2"
            />
            <input
              value={form.supplierName}
              onChange={(event) => setField("supplierName", event.target.value)}
              placeholder="Supplier name"
              className="rounded-md border border-border px-3 py-2"
              required
            />
            <input
              value={form.supplierUrl}
              onChange={(event) => setField("supplierUrl", event.target.value)}
              placeholder="Supplier URL"
              className="rounded-md border border-border px-3 py-2"
              required
            />
          </div>

          <textarea
            value={form.description}
            onChange={(event) => setField("description", event.target.value)}
            placeholder="Product description"
            className="min-h-24 w-full rounded-md border border-border px-3 py-2"
            required
          />

          <div className="flex flex-wrap items-center gap-4 text-sm">
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(event) => setField("featured", event.target.checked)}
              />
              Featured
            </label>
            <label className="inline-flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(event) => setField("active", event.target.checked)}
              />
              Active in storefront
            </label>
          </div>

          {error ? (
            <p className="rounded-md bg-red-100 px-3 py-2 text-sm text-red-700">{error}</p>
          ) : null}

          <div className="flex flex-wrap gap-2">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-full bg-background-primary px-4 py-2 text-sm font-semibold text-white disabled:bg-gray-400"
            >
              {submitting
                ? "Saving..."
                : editingId
                ? "Update product"
                : "Create product"}
            </button>
            {editingId ? (
              <button
                type="button"
                onClick={cancelEdit}
                className="rounded-full border border-border px-4 py-2 text-sm"
              >
                Cancel edit
              </button>
            ) : null}
          </div>
        </form>
      </section>

      <section className="rounded-lg border border-border bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Inventory ({products.length})</h2>
          <button
            type="button"
            onClick={fetchProducts}
            className="rounded-full border border-border px-3 py-1 text-xs"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <p className="text-sm text-muted-foreground">Loading products...</p>
        ) : (
          <div className="space-y-3">
            {sortedProducts.map((product) => (
              <article
                key={product.id}
                className="grid grid-cols-1 gap-3 rounded-md border border-border p-3 md:grid-cols-[72px_1fr_auto]"
              >
                <div className="relative h-[72px] w-[72px] overflow-hidden rounded-md bg-background-secondary">
                  <Image src={product.image} alt={product.title} fill className="object-contain" />
                </div>

                <div>
                  <p className="line-clamp-1 text-sm font-semibold">{product.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {product.category} • Stock: {product.stock} • ${product.price.toFixed(2)}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs">
                    <span
                      className={`rounded-full px-2 py-0.5 ${
                        product.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {product.active ? "Active" : "Hidden"}
                    </span>
                    {product.featured ? (
                      <span className="rounded-full bg-blue-100 px-2 py-0.5 text-blue-700">
                        Featured
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <button
                    type="button"
                    onClick={() => startEdit(product)}
                    className="rounded-full border border-border px-3 py-1 text-xs"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteProduct(product.id)}
                    className="rounded-full border border-red-200 px-3 py-1 text-xs text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}

            {sortedProducts.length === 0 ? (
              <p className="text-sm text-muted-foreground">No products available.</p>
            ) : null}
          </div>
        )}
      </section>
    </div>
  );
}
