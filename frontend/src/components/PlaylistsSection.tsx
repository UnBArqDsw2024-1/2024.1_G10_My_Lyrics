import { Playlist } from "@/lib/types/data";
import PlaylistCard from "./PlaylistCard";

interface PlaylistsSectionProps {
  playlists: Playlist[];
}

export default function PlaylistsSection({ playlists }: PlaylistsSectionProps) {
  if (playlists === undefined) {
    return <h2 className="text-3xl font-bold">Playlists</h2>;
  }

  if (playlists.length === 0) {
    return <h2 className="text-3xl font-bold">Playlists</h2>;
  }

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="text-3xl font-bold text-white">Playlists</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-white">
        {playlists.map((playlist) => (
          <PlaylistCard key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </div>
  );
}
