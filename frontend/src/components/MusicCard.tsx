import Image from 'next/image';
import type { Music } from '@/lib/types/data';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { api } from '@/lib/api';

interface MusicCardProps {
  music: Music;
  position?: number;
  like?: boolean;
}

export default function MusicCard({ music, position, like }: MusicCardProps) {
  async function handleClickLike() {
    if (like === undefined || like === false) {
      await api.patch(`/music/like/${music.id}`);
    } else {
      await api.patch(`/music/unlike/${music.id}`);
    }

    window.location.reload();
  }

  return (
    <div>
      <div className="text-white flex bg-[#5A4D6D] bg-opacity-25 rounded-xl shadow-md gap-4 items-center cursor-pointer hover:bg-[#29174b] hover:bg-opacity-100 transition-colors duration-300 justify-between">
        <Link
          href={`/musica/${music.id}`}
          className="flex items-center gap-4 w-full py-4 px-6"
        >
          {position && (
            <p className="mr-2 bg-[#3f3352] p-2 rounded-full text-white w-10 h-10 text-center font-medium text-md">
              {position}
            </p>
          )}
          <Image src={music.iconUrl} alt={music.title} width={60} height={50} />
          <div>
            <p className="text-white font-bold">{music.title}</p>
            {music.artists && (
              <p className="opacity-50">
                {music.artists.map((artist) => artist.name).join(', ')}
              </p>
            )}
          </div>
        </Link>
        <div
          onClick={handleClickLike}
          className="flex items-center gap-2 cursor-pointer mr-4"
        >
          {like !== undefined && (
            <FontAwesomeIcon
              icon={faHeart}
              className={`
                 ${like ? 'text-[#7338d3]' : 'text-gray-500'}
              `}
            />
          )}
        </div>
      </div>
    </div>
  );
}
