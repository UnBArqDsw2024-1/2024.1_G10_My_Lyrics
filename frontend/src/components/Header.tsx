"use client";

import Image from "next/image";
import Logo from "../assets/LOGO.svg";
import Link from "next/link";
import UserImg from "./UserImg";
import { UserContext } from "@/context/UserContext";
import { use } from "react";

export default function Header() {
  const user = use(UserContext);

  const playListLink =
    user.user && user.user.playlists && user.user.playlists.length > 0
      ? "/playlist"
      : "/playlist/new";

  return (
    <div className="flex justify-between text-white items-center px-12 absolute top-0 left-0 right-0 mt-8">
      <Link href="/" className="w-1/12 cursor-pointer">
        <Image src={Logo} alt="Logo" />
      </Link>

      <div className="flex gap-4 items-center">
        <Link href="/login" className="text-xl">
          Categorias
        </Link>
        <div className="border h-5 border-[#332b41]"></div>
        <Link href={playListLink} className="text-xl">
          Playlist
        </Link>
        <div className="border h-5 border-[#332b41]"></div>
        <Link
          href="https://github.com/lyrics-app/my-lyrics"
          className="text-xl"
        >
          Músicas & Artistas
        </Link>
      </div>
      <UserImg />
    </div>
  );
}
