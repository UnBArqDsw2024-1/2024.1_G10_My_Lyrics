"use client";
import Image from "next/image";
import Logo from "../assets/LOGO.svg";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";

export default function UserImg() {
  const { user } = useContext(UserContext);

  function getUserIcon() {
    if (user?.iconUrl != null) {
      return user.iconUrl;
    }

    return Logo;
  }

  return (
    <div className="flex items-center justify-center">
      <Image src={getUserIcon()} alt="Logo" width={100} height={100} />
    </div>
  );
}
