import { Music } from "@/lib/types/data";

export default function MusicItem({ music }: { music: Music }) {
  return (
    <div className="flex flex-row gap-4 items-center">
      <img src={music.iconUrl} alt={music.title} className="w-32 h-32" />
      <p className="text-xl">{music.title}</p>
    </div>
  );
}
