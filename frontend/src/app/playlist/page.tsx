"use client";

import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

export default function Playlist() {
  const user = useContext(UserContext);

  if (user.user === false) {
    return <div>Login</div>;
  }
}
