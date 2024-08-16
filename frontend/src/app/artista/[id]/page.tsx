"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Artists, Music, Verse } from "@/lib/types/data";
import Image from "next/image";
import MusicCard from "@/components/MusicCard";
import { Music as MusicIcon } from "react-feather";
import ArtitsComponent from "@/components/ArtitsComponent";

async function getArtistById(id: string): Promise<Artists> {
  const res = await api.get(`/artist/search-by-id?artist_id=${id}`);
  return res.data.artist;
}

export default function Artista({ params }: { params: { id: string } }) {
  const [artist, setArtist] = useState<Artists>();

  useEffect(() => {
    const fethArtist = async () => {
      const fetchedArtist = await getArtistById(params.id);

      setArtist(fetchedArtist);
    };

    fethArtist();
  }, [params.id]);

  return (
    <div className="flex flex-row items-start mt-40">
      {artist ? (
        <>
          <div className="flex flex-col bg-[#5A4D6D] bg-opacity-25 p-6 rounded m-10 items-center">
            <ArtitsComponent artist={artist} />
            <span className="bg-gray-400 w-full h-[1px] mt-2" />
            <div className="mt-4 items-center flex flex-col">
              <p className="text-white font-medium mb-2">Álbuns</p>
              {artist.albums.map((album) => (
                <div
                  key={album.id}
                  className="flex flex-col items-center mt-2 mb-8"
                >
                  {album.coverUrl ? (
                    <Image
                      src={album.coverUrl}
                      alt={artist.name}
                      width={150}
                      height={150}
                      className="rounded-lg"
                    />
                  ) : (
                    <div className="w-[150px] h-[150px] bg-[#3f3352] rounded-lg flex items-center justify-center">
                      <MusicIcon size={50} color="#5A4D6D" />
                    </div>
                  )}
                  <p className="text-white font-medium mt-2 max-w-[200px] text-center">
                    {album.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10">
            <h1 className="text-white font-bold text-4xl mb-10">Músicas</h1>
            <div className="grid grid-cols-4 mt-4 gap-10">
              {artist.musics.map((music) => (
                <MusicCard key={music.id} music={music} like={music.like} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <h1>Carregando...</h1>
      )}
    </div>
  );
}
