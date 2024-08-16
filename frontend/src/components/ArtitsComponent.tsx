import { Artists } from "@/lib/types/data";
import Image from "next/image";
import Link from "next/link";

interface ArtitsComponentProps {
  artist: Artists;
}

export default function ArtitsComponent({ artist }: ArtitsComponentProps) {
  return (
    <Link href={`/artista/${artist.id}`}>
      <Image
        src={artist.profileUrl}
        alt={artist.name}
        width={180}
        height={180}
        className="rounded-full"
      />
      <h1 className="text-white mt-2 font-bold text-2xl text-center">
        {artist.name}
      </h1>
    </Link>
  );
}
