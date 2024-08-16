'use client';

import Image from 'next/image';
import Logo from '../assets/LOGO.svg';
import Link from 'next/link';
import UserImg from './UserImg';
import { UserContext } from '@/context/UserContext';
import { use, useEffect, useState } from 'react';

export default function Header() {
  const user = use(UserContext);
  const [playlistsLink, setPlaylistsLink] = useState('');

  useEffect(() => {
    if (user.user && user.user.playlists && user.user.playlists.length > 0) {
      setPlaylistsLink('/playlist');
    } else {
      setPlaylistsLink('/playlist/new');
    }
  }, [user.user]);

  const isLoggedHeader = () => {
    if (user.user) {
      return <UserImg />;
    } else {
      return (
        <div className="flex items-center gap-4">
          <a
            className="rounded-lg px-4 py-2 font-bold text-white"
            href="/register"
          >
            Registrar
          </a>
          <a
            className="bg-[#6BC5D2] rounded-lg px-4 py-2 font-bold text-black"
            href="/login"
          >
            Entrar
          </a>
        </div>
      );
    }
  };

  return (
    <div className="flex justify-between text-white items-center px-12 absolute top-0 left-0 right-0 mt-8">
      <Link href="/" className="w-1/12 cursor-pointer none hidden md:block">
        <Image src={Logo} alt="Logo" width={100} height={100} />
      </Link>

      <div className="flex gap-4 items-center">
        <Link href={playlistsLink} className="text-xl">
          Playlist
        </Link>
        <div className="border h-5 border-[#332b41]"></div>
        <Link href="/top" className="text-xl">
          Músicas & Artistas
        </Link>
      </div>
      {isLoggedHeader()}
    </div>
  );
}
