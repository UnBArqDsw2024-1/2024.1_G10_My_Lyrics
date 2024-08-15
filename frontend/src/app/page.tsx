'use client';
import MusicCard from '@/components/MusicCard';
import { api } from '@/lib/api';
import type { Music } from '@/lib/types/data';
import { useEffect, useState } from 'react';

export default function Home() {
  const [musics, setMusics] = useState<Music[]>([]);

  async function getTenMusics() {
    const today = new Date();
    const dataFinished = today.toISOString().split('T')[0];

    const res = await api.get(
      `/music/hotspot?number=20&dataInit=1000-01-01&dataFinished=${dataFinished}`
    );

    return res.data;
  }

  useEffect(() => {
    const fetchMusics = getTenMusics();
    fetchMusics.then(setMusics);
  }, []);

  return (
    <div className="flex flex-col h-screen items-center justify-center mt-60 mb-40 gap-12">
      <input
        type="text"
        placeholder="Pesquise pelas músicas mais badaladas do momento"
        className="w-1/3 px-4 py-3 text-white bg-opacity-20 rounded-xl bg-[#3f3352]"
      />
      <div className="w-full flex flex-col items-center justify-center">
        <div className="border-b px-4 py-2 w-2/12 text-center border-[#3F3352] mb-10">
          <p className="text-white text-xl">Top 20 do país</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mt-4 w-3/4">
          {musics.map((music, index) => (
            <MusicCard key={index} music={music} position={index + 1} />
          ))}
        </div>
      </div>
    </div>
  );
}
