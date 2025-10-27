import { useCtx } from "./ctx";

export default function Prdct({ product }) {
  const { cart, setCart, user } = useCtx();

  function handleAddToCart(product) {
    if (!user) return;
    setCart([...cart, product]);
  }

  return (
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
        onClick={() => handleAddToCart(product)}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium"
      >
        Add to Cart
      </button>
    </div>
  );
}
