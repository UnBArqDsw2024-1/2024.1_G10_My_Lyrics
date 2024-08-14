import { use } from "react";
import { api } from "@/lib/api";
import { Music } from "@/lib/types/data";

async function getMusicById(id: string): Promise<Music> {
  const res = await api.get(`/music/${id}`);
  return res.data;
}

export default function Musica({ params }: { params: { id: string } }) {
  const music = use(getMusicById(params.id));

  return (
    <div className="flex flex-col h-screen items-center justify-center my-40 gap-12">
      <h1 className="text-3xl text-white">{music.title}</h1>
      <p className="text-xl text-gray-400">{music.artists[0].name}</p>
    </div>
  );
}
