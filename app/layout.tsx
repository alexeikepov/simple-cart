import { db } from "@/scripts/db_conn";
import "../ui/main.css";
import { Provider } from "@/cart/ctx";

export default async function RootLayout({ children }) {
  const user = { id: 1 };

  const initCart = await db("cart_items")
    .join("carts", "cart_items.cartId", "carts.id")
    .join("products", "cart_items.productId", "products.id")
    .where({
      "carts.userId": user.id,
      "carts.status": "active",
    })
    .select("products.*", "cart_items.quantity");

  console.log("initCart", initCart);

  return (
    <html lang="en">
      <body>
        <Provider user={user} initCart={initCart}>
          {children}
        </Provider>
      </body>
    </html>
  );
}
