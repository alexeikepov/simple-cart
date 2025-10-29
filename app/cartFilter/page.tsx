import { getCarts } from "@/cart/db";
import ExampleTable from "@/components/ExamleTable";

export default async function СartFilter({ searchParams }) {
  const filter = await searchParams;

  const filters = {
    status: filter.status || undefined,
    name: filter.name || undefined,
  };

  const carts = await getCarts(filters);

  // console.log(carts, "carts");

  return (
    <div>
      <ExampleTable data={carts} />
    </div>
  );
}
