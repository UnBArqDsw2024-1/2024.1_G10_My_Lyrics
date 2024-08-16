"use client";

import PlaylistCard from "@/components/PlaylistCard";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function Playlist() {
  const user = useContext(UserContext);
  const router = useRouter();

  if (!user.user) {
    router.push("/login");
  }

  return (
    <div className="flex flex-col items-center justify-center text-white mt-40 gap-10">
      <h1 className="text-3xl font-bold">Playlist</h1>
      <button
        className="px-5 py-3 text-white bg-[#6BC5D2] rounded-lg"
        onClick={() => router.push("/playlist/new")}
      >
        Criar nova playlist
      </button>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mx-auto">
        {user.user &&
          user.user?.playlists?.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
      </div>
    </div>
  );
}
