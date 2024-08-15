"use client";

import Image from "next/image";
import Logo from "../assets/LOGO.svg";
import Link from "next/link";
import UserImg from "./UserImg";
import { UserContext } from "@/context/UserContext";
import { use, useEffect, useState } from "react";

export default function Header() {
  const user = use(UserContext);
  const [playlistsLink, setPlaylistsLink] = useState("");

  useEffect(() => {
    if (user.user && user.user.playlists && user.user.playlists.length > 0) {
      setPlaylistsLink("/playlist");
    } else {
      setPlaylistsLink("/playlist/new");
    }
  }, [user.user]);

  return (
    <div className="flex justify-between text-white items-center px-12 absolute top-0 left-0 right-0 mt-8">
      <Link href="/" className="w-1/12 cursor-pointer">
        <Image src={Logo} alt="Logo" width={100} height={100} />
      </Link>

      <div className="flex gap-4 items-center">
        <Link href={playlistsLink} className="text-xl">
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
