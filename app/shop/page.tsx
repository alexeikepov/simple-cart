import Shop from "@/components/Shop";
import { getProducts, getCart, getUser } from "@/actions/action";
import { cookies } from "next/headers";

export default async function Home() {
  const products = await getProducts();
  const cart = await getCart();
  const user = await getUser();
  console.log(user);

  return (
    <div>
      <Shop products={products} cart={cart} currentUser={user} />
    </div>
  );
}
