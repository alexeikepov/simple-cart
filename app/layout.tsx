import { Assistant } from "next/font/google";
import "../ui/main.css";
import { UserProvider } from "@/cart/ctx";

export default function RootLayout({ children }) {
  const user = { id: 1 };
  return (
    <html lang="en">
      <body>
        <UserProvider user={user}>{children}</UserProvider>
      </body>
    </html>
  );
}
