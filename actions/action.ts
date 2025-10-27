"use server";

import { db } from "@/scripts/db_conn";
import { Product } from "@/types/type";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface User {
  id: number;
  user: string;
  createdAt: string;
}

export async function connectUser(data: any) {
  const username = data.username?.trim();

  let user = await db<User>("users").where("user", username).first();

  if (!user) {
    const [newUser] = await db<User>("users")
      .insert({ user: username })
      .returning("*");
    user = newUser;
  }

  const cookieStore = await cookies();
  cookieStore.set("user_id", "", { path: "/", maxAge: 0 });
  cookieStore.set("user_id", String(user.id), {
    path: "/",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/shop");
}

export async function getProducts() {
  return db("products")
    .select("products.id", "products.name", "products.price")
    .orderBy("products.id", "asc");
}

export async function getUser() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value;
  console.log(userId);
  const user = await db<User>("users").where("id", Number(userId)).first();
  return user;
}

export async function getCart() {
  const user = await getUser();
  const userId = user?.id;

  const cart = await db("carts").where({ userId, status: "active" }).first();

  if (!cart) {
    return { id: 0, items: [] };
  }

  const items = await db("cart_items")
    .join("products", "cart_items.productId", "products.id")
    .select(
      "cart_items.id as cart_item_id",
      "cart_items.productId as product_id",
      "products.name",
      "products.price",
      "cart_items.quantity"
    )
    .where("cart_items.cartId", cart.id)
    .orderBy("cart_items.createdAt", "desc");

  return {
    id: cart.id,
    items,
  };
}

export async function addToCart(product: Product, isExisting: boolean) {
  const user = await getUser();
  const userId = user?.id;

  let cart = await db("carts").where({ userId, status: "active" }).first();

  if (!cart) {
    const [newCart] = await db("carts")
      .insert({ userId: userId, status: "active" })
      .returning("id");
    cart = newCart;
  }
  if (isExisting) {
    await db("cart_items").insert({
      cartId: cart.id,
      productId: product.id,
      quantity: +1,
    });
    revalidatePath("/shop");
  }
}

export async function confirmOrder() {
  const user = await getUser();
  const userId = user?.id;

  const activeCart = await db("carts")
    .where({ userId, status: "active" })
    .first();

  await db("carts")
    .where({ id: activeCart.id })
    .update({ status: "waiting_payment" });

  await db("carts").insert({
    userId,
    status: "active",
  });

  revalidatePath("/shop");
}

export async function updateCartStatus(cartId: number, newStatus: string) {
  const user = await getUser();
  const userId = user?.id;

  await db("carts").where({ id: cartId, userId }).update({ status: newStatus });

  revalidatePath("/shop");
}
