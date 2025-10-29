import { db } from "@/config/db";

export async function getCart(user) {
  const cart = await db("cart_items")
    .join("carts", "cart_items.cartId", "carts.id")
    .join("products", "cart_items.productId", "products.id")
    .where({
      "carts.userId": user?.id,
      "carts.status": "active",
    })
    .select("products.*", "cart_items.quantity");

  return cart;
}

export async function getProducts() {
  return db("products")
    .select("products.id", "products.name", "products.price")
    .orderBy("products.id", "asc");
}

export async function getCarts(filters?: { status?: string; name?: string }) {
  let query = db("carts")
    .join("users", "carts.userId", "users.id")
    .join("cart_items", "cart_items.cartId", "carts.id")
    .join("products", "cart_items.productId", "products.id")
    .groupBy("carts.id", "users.user")
    .select(
      "carts.*",
      "users.user",
      db.raw(`
        json_agg(
          json_build_object(
            'productId', cart_items."productId",
            'name', products.name,
            'price', products.price,
            'quantity', cart_items.quantity
          )
        ) as items
      `),
    );

  if (filters?.status) query.where("carts.status", filters.status);

  if (filters?.name) query.whereILike("users.user", `%${filters.name}%`);

  return query;
}
