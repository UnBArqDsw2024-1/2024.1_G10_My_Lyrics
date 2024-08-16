import Link from "next/link";
import type { Playlist } from "@/lib/types/data";
import Image from "next/image";
import { Music as MusicIcon, Trash2 } from "react-feather";
import { api } from "@/lib/api";

export default function PlaylistCard({ playlist }: { playlist: Playlist }) {
  const missing = playlist.musics
    ? playlist.musics?.length >= 4
      ? 0
      : 4 - playlist.musics.length
    : 4;

  return (
    <Link
      href={`/playlist/${playlist.id}`}
      className="p-6 bg-[#2c243a] rounded-lg w-[300px] h-[336px] flex flex-col"
      key={playlist.id}
    >
      <div className="flex flex-row justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{playlist.title}</h2>
      </div>
      {playlist.musics?.length > 0 ? (
        <div className="grid grid-cols-2 w-full h-full">
          {playlist.musics.map((music) => (
            <Image
              key={music.id}
              src={music.iconUrl}
              alt={music.title}
              width={50}
              height={50}
              className="object-none w-full h-full"
            />
          ))}
          {Array(missing)
            .fill(0)
            .map((_, index) => {
              return (
                <div
                  className="flex items-center justify-center bg-[#262033]"
                  key={index}
                >
                  <MusicIcon size={50} color="#4d3d64" />
                </div>
              );
            })}
        </div>
      ) : (
        <p className="text-sm">Sua playlist não contem músicas :(</p>
      )}
    </Link>
  );
}
