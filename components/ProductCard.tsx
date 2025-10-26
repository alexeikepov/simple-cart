"use client";

interface User {
  id: number;
  username: string;
  email: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface ProductCardProps {
  product: Product;
  currentUser: User | null;
  onSignInClick: () => void;
  onAddToCart: (productId: number) => void;
}

export default function ProductCard({
  product,
  currentUser,
  onSignInClick,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
      <p className="text-gray-600 mb-2">{product.description}</p>
      <p className="text-2xl font-bold text-green-600 mb-4">${product.price}</p>

      <div className="space-y-2">
        <button
          // onClick={handleAddToCart}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md cursor-pointer text-center transition-colors duration-200 select-none"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
