"use server";

import { db } from "@/config/db";
import { Product } from "@/types/type";
import { revalidatePath } from "next/cache";

export async function addProductAdmin(data) {
  if (!data.id) {
    await db("products").insert(data);
  } else {
    await db("products").where({ id: data.id }).update(data);
  }
  revalidatePath("/shop");
}

export async function deleteProductAdmin(productId: number) {
  await db("products").where("id", productId).del();
  revalidatePath("/shop");
}
