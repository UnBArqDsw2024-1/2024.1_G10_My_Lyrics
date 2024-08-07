"use client";

import { api } from "@/lib/api";
import { Playlist } from "@/lib/types/Playlist";
import { useEffect, useState } from "react";

export default function PlaylistPage({ params }: { params: { id: string } }) {
  const [playlist, setPlaylist] = useState<Playlist | null>(null);

  useEffect(() => {
    api
      .get(`/playlist/${params.id}`)
      .then((res) => {
        console.log(res.data);
        setPlaylist(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [params.id]);

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-bold">{playlist?.title}</h1>
        <p className="text-lg">{playlist?.description}</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {playlist?.musics.map((music) => (
          <div
            key={music.id}
            className="flex flex-col items-center justify-center gap-4"
          >
            <img src={music.iconUrl} alt={music.title} className="w-32 h-32" />
            <p className="text-xl">{music.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
