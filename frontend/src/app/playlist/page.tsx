"use client";

import PlaylistCard from "@/components/PlaylistCard";
import { UserContext } from "@/context/UserContext";
import { redirect } from "next/navigation";
import { use } from "react";

export default function Playlist() {
  const user = use(UserContext);

  if (!user.user) {
    redirect("/");
  }

  const playlistMusics = user.user.playlists.flatMap(
    (playlist) => playlist.musics
  );

  return (
    <div className="flex flex-col items-center justify-center text-white mt-40 gap-10 w-screen">
      <h1 className="text-3xl font-bold">Playlist</h1>
      <div className="flex items-center w-full gap-4 flex-col">
        {user.user.playlists?.map((playlist) => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </div>
  );
}
