import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen bg-[linear-gradient(120deg,#f7f8fb_0%,#e8ecff_40%,#f7f9ff_100%)] px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <Link href="/" className="text-2xl font-semibold">
            BERTO <span className="text-blue-600">STORE</span>
          </Link>
          <Link href="/shop" className="text-sm font-medium text-background-primary">
            Browse products
          </Link>
        </div>

        <div className="mx-auto w-full max-w-md rounded-2xl border border-border bg-white p-6 shadow-sm">
          {children}
        </div>
      </div>
    </main>
  );
}
