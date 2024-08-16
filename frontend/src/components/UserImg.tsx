"use client";
import Image from "next/image";
import Logo from "../assets/LOGO.svg";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import Link from "next/link";

export default function UserImg() {
  const user = useContext(UserContext);

  function getUserIcon() {
    if (user?.user.iconUrl != null) {
      return user.user.iconUrl;
    }
  }

  return (
    <Link
      className="flex items-center justify-center"
      href={`/user/${user.user.id}`}
    >
      <Image src={getUserIcon()} alt="Logo" width={100} height={100} />
    </Link>
  );
}
