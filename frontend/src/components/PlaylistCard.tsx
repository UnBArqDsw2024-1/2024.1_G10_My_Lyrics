import Link from "next/link";
import MusicCard from "./MusicCard";
import { Playlist } from "@/lib/types/data";

export default function PlaylistCard({ playlist }: { playlist: Playlist }) {
  return (
    <Link
      href={`/playlist/${playlist.id}`}
      className="p-6 bg-[#3F3352] rounded-lg w-1/4"
      key={playlist.id}
    >
      <h2 className="text-xl font-bold">{playlist.title}</h2>
      <p className="text-sm">{playlist.description}</p>
      {playlist.musics?.length > 0 ? (
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">Musics</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {playlist.musics.map((music) => (
              <MusicCard key={music.id} music={music} />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-sm">Sua playlist não contem músicas :(</p>
      )}
    </Link>
  );
}
