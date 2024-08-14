"use client";
import { use } from "react";
import { api } from "@/lib/api";
import { Music } from "@/lib/types/data";
import Image from "next/image";

async function getMusicById(id: string): Promise<Music> {
  const res = await api.get(`/music/${id}`);
  return res.data;
}

export default function Musica({ params }: { params: { id: string } }) {
  const music = use(getMusicById(params.id));

  const musicVerses = music.verses.map((verse) => verse.text);
  console.log(music);

  const youtubeVideoId = music.youtubeUrl.split("v=")[1]?.split("&")[0];

  return (
    <div className="flex justify-evenly items-start mt-40 mb-20 gap-12">
      <div className="flex flex-col gap-4">
        <Image src={music.iconUrl} alt={music.title} width={300} height={300} />
        <p className="text-xl text-white">{music.title}</p>
        <p className="text-sm text-gray-400">{music.album.artists[0].name}</p>
      </div>
      <div>
        {music.verses.map((verse) => (
          <div key={verse.id} className="flex flex-col">
            <p className="text-xl text-white m-0">{verse.text}</p>
          </div>
        ))}
      </div>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${youtubeVideoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
