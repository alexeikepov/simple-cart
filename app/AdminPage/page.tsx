import { getProducts } from "@/cart/db";
import AdminProductList from "@/components/AdminProductList";

export default async function AdminPage() {
  const products = await getProducts();

  return (
    <div>
      <AdminProductList products={products} />
    </div>
  );
}
