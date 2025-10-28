import { db } from "@/config/db";
import { Product } from "@/types/type";
import { revalidatePath } from "next/cache";

export async function addProductAdmin(data: Product) {
  const name = String(data.name ?? "").trim();
  const price = Number(data.price);

  await db("products").insert({
    name,
    price,
  });

  revalidatePath("/shop");
}

export async function updateProductAdmin(data: Product) {
  const id = Number(data.id);
  const name = String(data.name ?? "").trim();
  const price = Number(data.price);

  await db("products").where({ id }).update({
    name,
    price,
  });

  return { id, name, price };
}

export async function deleteProductAdmin(productId: number) {
  await db("products").where("id", productId).del();
  revalidatePath("/shop");
}
