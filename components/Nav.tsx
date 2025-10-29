"use client";

import { useCtx } from "@/cart/ctx";
import { CartModal } from "./CartModal";
import { Product } from "@/types/type";

export default function Nav() {
  const { cart } = useCtx();

  // console.log("cart", cart);

  const totalProd = cart.reduce(
    (total: number, prod: Product) => total + (prod.quantity ?? 0),
    0,
  );

  return (
    <header className="bg-white rounded-xl shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-2xl font-bold text-gray-900">My Shop</h1>

          <div className="flex items-center gap-4">
            <a
              href="/shop"
              className="inline-flex items-center rounded-md border px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 transition"
            >
              Shop
            </a>
            <a
              href="/AdminPage"
              className="inline-flex items-center rounded-md border px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 transition"
            >
              Admin
            </a>
            <a
              href="/cartFilter"
              className="inline-flex items-center rounded-md border px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 transition"
            >
              Cart Filter
            </a>
            <button
              type="button"
              popoverTarget="cart"
              className="relative inline-flex items-center rounded-md border px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100 active:scale-[0.98] transition"
            >
              <span>Cart ({totalProd})</span>
              {totalProd > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalProd}
                </span>
              )}
            </button>
            <CartModal />
          </div>
        </div>
      </div>
    </header>
  );
}
