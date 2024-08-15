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

  console.log(user.user.playlists);

  return (
    <div className="flex flex-col items-center justify-center text-white mt-40 gap-10 w-screen">
      <h1 className="text-3xl font-bold">Playlist</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mx-auto">
        {user.user.playlists?.map((playlist) => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </div>
  );
}
