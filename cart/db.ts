import { db } from "@/config/db";

export async function getCart(user) {
  await db("cart_items")
    .join("carts", "cart_items.cartId", "carts.id")
    .join("products", "cart_items.productId", "products.id")
    .where({
      "carts.userId": user?.id,
      "carts.status": "active",
    })
    .select("products.*", "cart_items.quantity");

  return;
}

export async function getProducts() {
  return db("products")
    .select("products.id", "products.name", "products.price")
    .orderBy("products.id", "asc");
}
