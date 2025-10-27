"use client";

import { useCtx } from "@/cart/ctx";

export interface Cart {
  id: number;
  quantity: number[];
  order_status: string;
}

export function CartModal() {
  const { cart } = useCtx();

  async function handlePurchase() {
    // await updateCartStatus(cartId, "on its way!");
    // onPurchaseComplete(items.map((i) => i.id));
  }

  return (
    <div id="cart" popover="auto" className="pop block">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-80">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-800">
          Your Cart
        </h2>

        {cart.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Cart is empty</p>
        ) : (
          <ul className="space-y-2 mb-4">
            {cart.map((prod) => (
              <li
                key={prod.id}
                className="border-b pb-1 text-gray-700 font-medium"
              >
                {prod.name}
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-col space-y-2">
          <button
            onClick={handlePurchase}
            disabled={cart.length === 0}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium"
          >
            Purchase
          </button>
        </div>
      </div>
    </div>
  );
}
