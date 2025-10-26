"use client";

import { updateCartStatus } from "@/actions/action";
import { useUser } from "@/cart/ctx";
import { log } from "console";

export interface Cart {
  id: number;
  quantity: number[];
  order_status: string;
}

interface CartModalProps {
  open: boolean;
  cartId: number;
  items: { id: number; name: string }[];
  onClose: () => void;
  onPurchaseComplete: (purchasedIds: number[]) => void;
}

export function CartModal({
  open,
  cartId,
  items,
  onClose,
  onPurchaseComplete,
}: CartModalProps) {
  // if (!open) return null;
  const temp = useUser();
  console.log(temp);

  async function handlePurchase() {
    await updateCartStatus(cartId, "on its way!");
    onPurchaseComplete(items.map((i) => i.id));
  }

  return (
    <div id="cart" popover="auto" className="pop">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-80">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-800">
          Your Cart
        </h2>

        {items.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Cart is empty</p>
        ) : (
          <ul className="space-y-2 mb-4">
            {items.map((item) => (
              <li
                key={item.id}
                className="border-b pb-1 text-gray-700 font-medium"
              >
                {item.name}
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-col space-y-2">
          <button
            onClick={handlePurchase}
            disabled={items.length === 0}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium"
          >
            Purchase
          </button>

          <button
            onClick={onClose}
            className="w-full bg-gray-300 hover:bg-gray-400 py-2 rounded-lg font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
