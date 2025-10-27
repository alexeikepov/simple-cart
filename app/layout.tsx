import "../ui/main.css";
import { Provider } from "@/cart/ctx";

export default function RootLayout({ children }) {
  const user = { id: 1 };
  return (
    <html lang="en">
      <body>
        <Provider user={user}>{children}</Provider>
      </body>
    </html>
  );
}
