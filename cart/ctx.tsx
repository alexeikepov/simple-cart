"use client";

import { createContext, useContext, useState } from "react";

const Ctx = createContext<any | null>(null);

export function Provider({ children, user, initCart }) {
  const [cart, setCart] = useState(initCart || []);

  return (
    <Ctx.Provider value={{ user, cart, setCart }}>{children}</Ctx.Provider>
  );
}

export function useCtx() {
  const context = useContext(Ctx);
  if (context === null)
    throw new Error("useUser must be used within a Provider");

  return context;
}
