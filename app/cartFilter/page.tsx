import { getCarts } from "@/cart/db";
import ExampleTable from "@/components/ExamleTable";

export default async function СartFilter({ searchParams }) {
  const filter = await searchParams;

  const carts = await getCarts(filter);

  console.log(filter, "filter");

  return (
    <div>
      <ExampleTable data={carts} />
    </div>
  );
}
