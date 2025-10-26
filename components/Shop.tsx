"use client";

import { useState } from "react";
import { addToCart, confirmOrder } from "@/actions/action";
import ProductGrid from "@/components/ProductGrid";
import { CartModal } from "@/components/Cart";
import HeaderCart from "./header";
import { CartItem, ShopProps } from "@/types/type";

export default function Shop({
  products = [],
  cart = { id: 0, items: [] },
  currentUser = null,
}: ShopProps) {
  const [authOpen, setAuthOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  async function handleAddToCart(productId: number) {
    if (!currentUser) {
      setAuthOpen(true);
      return;
    }
    await addToCart(productId);
  }

  async function handleAuthSuccess() {
    setAuthOpen(false);
  }

  async function handleCheckout() {
    if (cart.items.length === 0) return;

    await confirmOrder();

    alert("Purchase Complete! Thank you for your purchase!");
    setCartOpen(false);
  }

  const cartItemCount = cart.items.reduce(
    (sum: number, item: CartItem) => sum + item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {
        <HeaderCart
          cartItemCount={cartItemCount}
          onCartClick={() => setCartOpen(true)}
        />
      }
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductGrid
          products={products}
          currentUser={currentUser}
          onSignInClick={() => setAuthOpen(true)}
          onAddToCart={handleAddToCart}
        />

        <CartModal
          open={cartOpen}
          cartId={cart.id}
          items={cart.items.map((item) => ({
            id: item.product_id,
            name: item.name,
          }))}
          onClose={() => setCartOpen(false)}
          onPurchaseComplete={() => handleCheckout()}
        />
      </main>
    </div>
  );
}
