"use client";

import MusicCard from "@/components/MusicCard";
import ArtitsComponent from "@/components/ArtitsComponent";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import { Artists, Music } from "@/lib/types/data";

export default function Top() {
  const [musics, setMusics] = useState<Music[]>([]);
  const [artists, setArtists] = useState<Artists[]>([]);

  async function getTenMusics() {
    const today = new Date();
    const dataFinished = today.toISOString().split("T")[0];

    const res = await api.get(
      `/music/hotspot?number=20&dataInit=1000-01-01&dataFinished=${dataFinished}`
    );

    return res.data;
  }

  useEffect(() => {
    const fetchMusics = getTenMusics();
    fetchMusics.then((musics) => {
      setMusics(musics);

      // Contando as aparições dos artistas
      const artistCount: Record<string, Artists & { count: number }> = {};

      musics.forEach((music: Music) => {
        music.artists.forEach((artist: Artists) => {
          if (artistCount[artist.id]) {
            artistCount[artist.id].count++;
          } else {
            artistCount[artist.id] = { ...artist, count: 1 };
          }
        });
      });

      // Ordenando artistas pela quantidade de aparições e pegando os 10 principais
      const sortedArtists = Object.values(artistCount)
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      setArtists(sortedArtists);
    });
  }, []);

  return (
    <div className="flex justify-center mt-60 mb-40 gap-4 md:gap-12 text-white px-8">
      <div className="flex flex-col gap-4">
        <h1 className="font-bold text-3xl">Top Músicas</h1>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
          {musics.map((music, index) => (
            <MusicCard key={index} music={music} position={index + 1} />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="font-bold text-3xl">Top Artistas</h1>
        <div className="flex flex-col gap-8">
          {artists.map((artist, index) => (
            <ArtitsComponent key={index} artist={artist} />
          ))}
        </div>
      </div>
    </div>
  );
}
