import MusicCard from "@/components/MusicCard";
import { api } from "@/lib/api";
import { Music } from "@/lib/types/data";
import { use } from "react";

export default function Home() {
  async function getTenMusics() {
    const res = await api.get(
      "/music/hotspot?number=20&dataInit=2000-01-01&dataFinished=2024-09-01"
    );

    return res.data;
  }

  const musics: Music[] = use(getTenMusics());

  return (
    <div className="flex flex-col h-screen items-center justify-center my-40 gap-12">
      <input
        type="text"
        placeholder="Pesquise pelas mais badaladas do momento"
        className="w-1/3 px-4 py-3 text-white bg-opacity-20 rounded-xl bg-[#3f3352]"
      />
      <div className="w-full flex flex-col items-center justify-center">
        <div className="border px-4 py-2 w-2/12 text-center rounded-xl border-[#3F3352]">
          <p className="text-white ">Top 10 do país</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 mt-4 w-3/4">
          {musics.map((music, index) => (
            <MusicCard key={index} music={music} />
          ))}
        </div>
      </div>
    </div>
  );
}
