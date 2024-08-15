'use client';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import type { Artists, Music, Verse } from '@/lib/types/data';

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
        <div className="flex flex-col bg-[#5A4D6D] bg-opacity-25 p-6 rounded m-10">
          <h1 className="text-white">{artist.name}</h1>
        </div>
      ) : (
        <h1>Carregando...</h1>
      )}
    </div>
  );
}
