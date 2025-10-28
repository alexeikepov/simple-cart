"use client";

import { Checkout, removeProductCart, updateProductQuantity } from "@/cart/api";
import { useCtx } from "@/cart/ctx";
import { Product } from "@/types/type";

export interface Cart {
  id: number;
  quantity: number[];
  order_status: string;
}

export function CartModal() {
  const { cart, setCart } = useCtx();

  async function handleCheckout() {
    setCart([]);
    await Checkout();
  }

  async function handleIncreseProduct(prodId: number) {
    const t = [...cart];
    const existing = t.find((p) => p.id === prodId);

    if (existing) existing.quantity += 1;
    setCart(t);
    await updateProductQuantity(prodId, +1);
  }

  async function handleReduceProduct(prodId: number) {
    const t = [...cart];
    const existing = t.find((p) => p.id === prodId);

    if (existing.quantity === 1) {
      const newCart = t.filter((p) => p.id !== prodId);
      setCart(newCart);
      await removeProductCart(prodId);
    } else {
      existing.quantity -= 1;
      setCart(t);
      await updateProductQuantity(prodId, -1);
    }
  }

  async function handlerRemoveProduct(prodId: number) {
    const filterCart = cart.filter((p: Product) => p.id !== prodId);

    setCart(filterCart);
    await removeProductCart(prodId);
  }

  return (
    <main id="cart" popover="auto" className="pop">
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
                className="border-b pb-1 flex justify-between text-gray-700 font-medium"
              >
                <span>
                  <button onClick={() => handlerRemoveProduct(prod.id)}>
                    Del
                  </button>
                </span>
                <span>{prod.name}</span>
                <span>x{prod.quantity}</span>
                <span>
                  <button onClick={() => handleIncreseProduct(prod.id)}>
                    +
                  </button>
                </span>
                <span>
                  <button onClick={() => handleReduceProduct(prod.id)}>
                    -
                  </button>
                </span>
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-col space-y-2">
          <button
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium"
          >
            Checkout
          </button>
        </div>
      </div>
    </main>
  );
}
