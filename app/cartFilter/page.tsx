import ExampleTable from "@/components/ExamleTable";
import { db } from "@/config/db";
import { log } from "console";

export default async function AdminPage({ searchParams }) {
  const filter = await searchParams;
  const carts = await db("carts").where({ status: filter.status });
  console.log(carts, "carts");
  console.log(filter, "filter");
  return (
    <div>
      <ExampleTable data={carts} />
    </div>
  );
}
