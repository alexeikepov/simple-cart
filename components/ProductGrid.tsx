"use client";

import Prdct from "@/cart/Prdct";

export default function ProductGrid({ products = [] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product, i) => (
        <div
          key={products.id}
          className="border rounded-xl p-5 shadow-sm bg-white hover:shadow-md transition"
        >
          <Nav />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {products.name}
            {console.log("cart", cart)}
          </h3>
          <p className="text-gray-500 text-sm mb-3">
            {products.description || "No description"}
          </p>
          <p className="font-bold text-blue-600 mb-4">{products.price} $</p>

          <button
            onClick={() => handleAddToCart(products)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
