import Image from "next/image";
import { Music } from "@/lib/types/data";
import Link from "next/link";

export default function MusicCard({ music }: { music: Music }) {
  return (
    <Link href={`/musica/${music.id}`}>
      <div className="text-white flex bg-[#140b26] px-6 py-3 rounded-xl shadow-md gap-4 justify-between items-center cursor-pointer hover:bg-[#1c1032] transition-colors duration-300">
        <div className="flex gap-4">
          <Image src={music.iconUrl} alt={music.title} width={60} height={50} />
          <div>
            <p>{music.title}</p>
            <p>{music.artists[0].name}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}