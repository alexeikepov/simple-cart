"use server";

import { getUser } from "@/auth/db";
import { db } from "@/config/db";
import { Product } from "@/types/type";

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
    await db("cart_items")
      .where({
        cartId: cart.id,
        productId: product.id,
      })
      .increment("quantity", 1);
  } else {
    await db("cart_items").insert({
      cartId: cart.id,
      productId: product.id,
      quantity: 1,
    });
  }
}

export async function updateProductQuantity(productId: number, change: number) {
  const user = await getUser();
  const userId = user?.id;

  const cart = await db("carts").where({ userId, status: "active" }).first();

  if (cart) {
    await db("cart_items")
      .where({
        cartId: cart.id,
        productId,
      })
      .increment("quantity", change);
  }
}

export async function removeProductCart(productId: number) {
  const user = await getUser();
  const userId = user?.id;

  const cart = await db("carts").where({ userId, status: "active" }).first();

  if (cart) {
    await db("cart_items")
      .where({
        cartId: cart.id,
        productId: productId,
      })
      .del();
  }
}

export async function Checkout() {
  const user = await getUser();
  const userId = user?.id;

  const cart = await db("carts").where({ userId, status: "active" }).first();

  await db("carts")
    .where({ id: cart.id })
    .update({ status: "purchased", updatedAt: db.fn.now() });
}
