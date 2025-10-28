import { getCarts } from "@/cart/db";
import ExampleTable from "@/components/ExamleTable";

export default async function AdminPage({ searchParams }) {
  const filter = await searchParams;
  const carts = await getCarts();
  console.log(carts, "carts");
  return (
    <div>
      <ExampleTable data={carts} />
    </div>
  );
}
