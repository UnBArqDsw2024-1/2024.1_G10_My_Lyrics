"use client";
import Image from "next/image";
import Logo from "../assets/LOGO.svg";
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import Link from "next/link";

export default function UserImg() {
  const user = useContext(UserContext);

  function getUserIcon() {
    console.log(user.user);

    if (user.user && user?.user.iconUrl != null) {
      return user.user.iconUrl;
    }
  }

  if (!user.user) {
    return <Image src={Logo} alt="Logo" width={100} height={100} />;
  }

  return (
    <Link
      className="flex items-center justify-center"
      href={`/user/${user.user.id}`}
    >
      {user.user.iconUrl == null ? (
        <Image src={Logo} alt="Logo" width={100} height={100} />
      ) : (
        <Image
          src={getUserIcon() as string}
          alt="Logo"
          width={100}
          height={100}
        />
      )}
    </Link>
  );
}
