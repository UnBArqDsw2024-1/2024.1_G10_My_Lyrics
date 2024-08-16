import Image from "next/image";
import Logo from "../assets/LOGO.svg";
import Link from "next/link";
import { Suspense, use } from "react";
import UserImg from "./UserImg";

export default function Header() {
  return (
    <div className="flex justify-between text-white items-center px-12 absolute top-0 left-0 right-0 mt-8">
      <Link href="/" className="w-1/12 cursor-pointer">
        <Image src={Logo} alt="Logo" width={100} height={100} />
      </Link>

      <div className="flex gap-4 items-center">
        <a href="/login" className="text-xl">
          Categorias
        </a>
        <div className="border h-5 border-[#332b41]"></div>
        <a href="/playlist/new" className="text-xl">
          Playlist
        </a>
        <div className="border h-5 border-[#332b41]"></div>
        <a href="https://github.com/lyrics-app/my-lyrics" className="text-xl">
          Músicas & Artistas
        </a>
      </div>
      <Suspense fallback={<div>Carregando...</div>}>
        <UserImg />
      </Suspense>
    </div>
  );
}
