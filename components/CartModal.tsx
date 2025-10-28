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
      <div className="bg-white px-5 py-4 w-150 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2 text-gray-800">
          Your Cart
        </h2>

        {cart.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Cart is empty</p>
        ) : (
          <ul className="space-y-4 mb-4">
            {cart.map((prod) => {
              const subtotal = prod.price * prod.quantity;

              return (
                <li
                  key={prod.id}
                  className="border rounded-lg p-3 bg-gray-50 shadow-sm"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-800">{prod.name}</p>
                      <p className="text-sm text-gray-500">
                        Price per item:{" "}
                        <span className="font-medium">${prod.price}</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Subtotal:{" "}
                        <span className="font-semibold">${subtotal}</span>
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-400 rounded-md text-white px-2 py-1"
                        onClick={() => handleIncreseProduct(prod.id)}
                      >
                        +
                      </button>

                      <span className="text-gray-700 font-semibold">
                        x{prod.quantity}
                      </span>

                      <button
                        className="bg-green-500 hover:bg-green-400 rounded-md text-white px-2 py-1"
                        onClick={() => handleReduceProduct(prod.id)}
                      >
                        -
                      </button>

                      <button
                        className="bg-red-500 hover:bg-red-700 rounded-md text-white px-2 py-1"
                        onClick={() => handlerRemoveProduct(prod.id)}
                      >
                        Del
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {/* ✅ TOTAL PRICE */}
        <div className="border-t pt-3">
          <div className="flex justify-between text-lg font-semibold text-gray-800 mb-3">
            <span>Total:</span>
            <span>
              ${cart.reduce((sum, p) => sum + p.price * p.quantity, 0)}
            </span>
          </div>

          <button
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:text-gray-500 text-white py-2 rounded-lg font-medium"
          >
            Checkout
          </button>
        </div>
      </div>
    </main>
  );
}
