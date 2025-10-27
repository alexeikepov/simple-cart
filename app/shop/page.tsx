import { getProducts, getCart, getUser } from "@/actions/action";
import Prdct from "@/cart/Prdct";
import Shop from "@/components/Shop";
import { cookies } from "next/headers";

export default async function Home() {
  const products = await getProducts();
  const cart = await getCart();
  const user = await getUser();
  console.log(user);

  return (
    <div>
      <Prdct products={products} />
    </div>
  );
}
