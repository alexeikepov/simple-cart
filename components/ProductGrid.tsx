"use client";

interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
}

interface ProductGridProps {
  products: Product[];
  currentUser: any;
  onAddToCart: (productId: number) => void;
  onSignInClick: () => void;
}

export default function ProductGrid({
  products = [],
  currentUser,
  onAddToCart,
  onSignInClick,
}: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <p className="text-center text-gray-500 italic">
        No products available yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="border rounded-xl p-5 shadow-sm bg-white hover:shadow-md transition"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {product.name}
          </h3>
          <p className="text-gray-500 text-sm mb-3">
            {product.description || "No description"}
          </p>
          <p className="font-bold text-blue-600 mb-4">{product.price} ₪</p>

          <button
            onClick={() =>
              currentUser ? onAddToCart(product.id) : onSignInClick()
            }
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
