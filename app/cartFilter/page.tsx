import { getCarts } from "@/cart/db";
import ExampleTable from "@/components/ExamleTable";
import { db } from "@/config/db";

export default async function СartFilter({ searchParams }) {
  const filter = await searchParams;
  const carts = await getCarts();

  const res = await db("orders");

  console.log("res", res);

  return (
    <div>
      <ExampleTable data={carts} />
    </div>
  );
}
