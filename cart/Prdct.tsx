"use client";

import { addToCart } from "@/actions/action";
import { useCtx } from "./ctx";
import Nav from "@/components/Nav";
import ProductGrid from "@/components/ProductGrid";
import { CartItem } from "@/types/type";

export default function Prdct({ products }) {
  const { cart, setCart, user } = useCtx();

  async function handleAddToCart(product) {
    if (!user) return;
    const t = [...cart];

    const existing = t.find((p) => p.id === product.id);
    console.log("existing", existing);

    if (existing) existing.quantity += 1;
    else t.push({ ...product, quantity: 1 });
    setCart(t);

    await addToCart(product, Boolean(existing));
  }

  return (
    <div>
      <Nav />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-xl p-5 shadow-sm bg-white hover:shadow-md transition"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {product.name}
              {console.log("cart", cart)}
            </h3>
            <p className="font-bold text-blue-600 mb-4">{product.price} $</p>
            <button
              onClick={() => handleAddToCart(product)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
