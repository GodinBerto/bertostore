"use client";

import { useState } from "react";
import { ShoppingBag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { addToCart } from "@/lib/cart-client";

interface AddToCartButtonProps {
  productId: string;
  title: string;
  image: string;
  price: number;
  quantity?: number;
  className?: string;
}

export default function AddToCartButton({
  productId,
  title,
  image,
  price,
  quantity = 1,
  className,
}: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);

  function handleClick() {
    addToCart({
      productId,
      title,
      image,
      price,
      quantity,
    });

    setAdded(true);

    window.setTimeout(() => {
      setAdded(false);
    }, 1200);
  }

  return (
    <Button onClick={handleClick} className={className}>
      <ShoppingBag className="h-4 w-4" />
      {added ? "Added" : "Add to Cart"}
    </Button>
  );
}
