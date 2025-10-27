import { getProducts } from "@/cart/db";
import Prdct from "@/cart/Prdct";

export default async function Home() {
  const products = await getProducts();

  return (
    <div>
      <Prdct products={products} />
    </div>
  );
}
