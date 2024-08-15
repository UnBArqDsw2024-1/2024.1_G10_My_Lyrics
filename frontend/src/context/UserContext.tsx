"use client";

import { createContext, use, useState } from "react";
import { api } from "@/lib/api";
import { User } from "@/lib/types/data";

interface UserContextType {
  user: User | null;
  setUpdatedUser: (user: User) => void;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUpdatedUser: () => {},
});

async function getUser() {
  try {
    const res = await api.get("/user");
    return res.data;
  } catch {
    return null;
  }
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const setUpdatedUser = () => {
    setUser(use(getUser()));
  };

  return (
    <UserContext.Provider value={{ user, setUpdatedUser }}>
      {children}
    </UserContext.Provider>
  );
}
