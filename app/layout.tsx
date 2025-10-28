import "../ui/main.css";
import { Provider } from "@/cart/ctx";
import { getCart } from "@/cart/db";
import { getUser } from "@/auth/db";

export default async function RootLayout({ children }) {
  const user = await getUser();
  const cart = await getCart(user);

  console.log("user", user?.id);

  return (
    <html lang="en">
      <body>
        <Provider user={user} initCart={cart}>
          {children}
        </Provider>
      </body>
    </html>
  );
}
