"use client";

import { createContext, useContext, useState } from "react";

const UserContext = createContext<any | null>(null);

export function UserProvider({ children, user }) {
  const [cart, setCart] = useState([]);
  return (
    <UserContext.Provider value={{ user, cart, setCart }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === null)
    throw new Error("useUser must be used within a UserProvider");

  return context;
}
