"use client";

import MusicItem from "@/components/MusicItem";
import { api } from "@/lib/api";
import { Music, Playlist } from "@/lib/types/data";
import { useEffect, useState } from "react";

export default function PlaylistPage({ params }: { params: { id: string } }) {
  const [playlist, setPlaylist] = useState<Playlist | undefined>(undefined);

  const [selectedMusic, setSelectedMusic] = useState<Music | undefined>(undefined);

  useEffect(() => {
    api
      .get(`/playlist/${params.id}`)
      .then((res) => {
        setPlaylist(res.data);
        handleSelectMusic(res.data.musics[0]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [params.id]);

  async function handleSelectMusic(music: Music | undefined) {
    if(!music) {
      return
    }

    const musicId = music.id;
    try {
      const res = await api.get(`/music/${musicId}`);
      console.log(res.data);
      setSelectedMusic(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="grid grid-cols-3 items-center justify-items-center p-8 gap-16 sm:p-20">
      <div className="flex flex-col gap-4 items-start ">
        <div className="flex flex-row gap-4 items-center">
          <p>icon</p>
          <h1 className="text-3xl font-bold">{playlist?.title}</h1>
        </div>
        <p>{playlist?.description}</p>

        {playlist?.musics?.map((music) => (
          <MusicItem key={music.id} music={music} />
        ))}
      </div>

      <div className="flex flex-col gap-4 items-start">
        <h2 className="text-2xl font-bold">{selectedMusic?.title}</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-4 items-start">
            {selectedMusic?.verses.map((verse) => (
              <div key={verse.id}>
                <p>{verse.text}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4 items-start">
            {selectedMusic?.verses.map((verse) => (
              <div key={verse.id}>
                <p>{verse.translatedText}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-start">
        <h2 className="text-2xl font-bold">{selectedMusic?.title}</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-4 items-start">
            {selectedMusic?.verses.map((verse) => (
              <div key={verse.id}>
                <p>{verse.text}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-4 items-start">
            {selectedMusic?.verses.map((verse) => (
              <div key={verse.id}>
                <p>{verse.translatedText}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
