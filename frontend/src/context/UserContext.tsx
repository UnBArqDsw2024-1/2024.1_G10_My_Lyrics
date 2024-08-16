"use client";

import { createContext, use, useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { User } from "@/lib/types/data";

interface UserContextType {
  user: User | false | null;
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
    return false;
  }
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getUser().then((user) => setUser(user));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUpdatedUser: setUser }}>
      {children}
    </UserContext.Provider>
  );
}
