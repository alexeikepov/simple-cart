"use client";

import { useState } from "react";
import { addToCart, confirmOrder } from "@/actions/action";
import ProductGrid from "@/components/ProductGrid";
import { CartModal } from "@/components/Cart";
import Nav from "./Nav";
import { CartItem, ShopProps } from "@/types/type";

export default function Shop({
  products = [],
  cart = { id: 0, items: [] },
  currentUser = null,
}: ShopProps) {
  async function handleAddToCart(productId: number) {
    if (!currentUser) {
      return;
    }
    await addToCart(productId);
  }

  async function handleCheckout() {
    if (cart.items.length === 0) return;

    await confirmOrder();

    alert("Purchase Complete! Thank you for your purchase!");
  }

  const cartItemCount = cart.items.reduce(
    (sum: number, item: CartItem) => sum + item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav cartItemCount={cartItemCount} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductGrid
          products={products}
          currentUser={currentUser}
          onAddToCart={handleAddToCart}
        />
      </main>
    </div>
  );
}
