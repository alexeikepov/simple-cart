import { getCarts } from "@/cart/db";
import ExampleTable from "@/components/ExampleTable";

export default async function CartFilter({ searchParams }) {
  const filter = (await searchParams) || {};
  const carts = await getCarts(filter);

  return (
    <div>
      <ExampleTable data={carts} />
    </div>
  );
}
