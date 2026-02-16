"use client";

import { useEffect, useState } from "react";

import { getCartEventName, getCartTotalItemCount } from "@/lib/cart-client";

export default function CartCountBadge() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const syncCount = () => {
      setCount(getCartTotalItemCount());
    };

    syncCount();

    const cartEvent = getCartEventName();

    window.addEventListener("storage", syncCount);
    window.addEventListener(cartEvent, syncCount);

    return () => {
      window.removeEventListener("storage", syncCount);
      window.removeEventListener(cartEvent, syncCount);
    };
  }, []);

  if (count === 0) {
    return null;
  }

  return (
    <span className="absolute -right-1 -top-1 min-w-4 rounded-full bg-background-primary px-1 text-center text-[10px] font-semibold text-white">
      {count > 99 ? "99+" : count}
    </span>
  );
}
