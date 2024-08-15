"use client";
import Image from "next/image";
import Logo from "../assets/LOGO.svg";
import { use } from "react";
import { UserContext } from "@/context/UserContext";

export default function UserImg() {
  const { user } = use(UserContext);

  try {
    if (user) {
      return (
        <div className="border h-5 border-[#332b41]">
          <Image src={user.iconUrl!} alt="User Icon" width={100} height={100} />
        </div>
      );
    }
  } catch (error) {
    console.error("Erro ao carregar user:", error);
  }
}
