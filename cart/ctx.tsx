"use client";

import { createContext, useContext, useState } from "react";

const Ctx = createContext<any | null>(null);

export function Provider({ children, user }) {
  const [cart, setCart] = useState([]);
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
