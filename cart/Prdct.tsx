import { addToCart } from "@/actions/action";
import { useCtx } from "./ctx";

export default function Prdct({ product }) {
  const { cart, setCart, user } = useCtx();

  async function handleAddToCart(product) {
    if (!user) return;
    const t = [...cart];

    const existing = t.find((p) => p.id === product.id);
    if (existing) existing.quantity += 1;
    else t.push({ product, quantity: 1 });
    setCart(t);
    // await addToCart(product);
  }

  return (
    <div
      key={product.id}
      className="border rounded-xl p-5 shadow-sm bg-white hover:shadow-md transition"
    >
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        {product.name}
        {console.log("cart", cart)}
      </h3>
      <p className="text-gray-500 text-sm mb-3">
        {product.description || "No description"}
      </p>
      <p className="font-bold text-blue-600 mb-4">{product.price} $</p>

      <button
        onClick={() => handleAddToCart(product)}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium"
      >
        Add to Cart
      </button>
    </div>
  );
}
