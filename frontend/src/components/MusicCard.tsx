'use client';

import Image from 'next/image';
import type { Music } from '@/lib/types/data';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

interface MusicCardProps {
  music: Music;
  position?: number;
  like?: boolean;
  isModal?: boolean;
  isSelected?: boolean;
}

export default function MusicCard({
  music,
  position,
  like,
  isModal = false,
  isSelected = false,
}: MusicCardProps) {
  async function handleClickLike() {
    if (like === undefined || like === false) {
      await api.patch(`/music/like/${music.id}`);
    } else {
      await api.patch(`/music/unlike/${music.id}`);
    }

    window.location.reload();
  }

  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isModal === false) {
      router.push(`/musica/${music.id}`);
    } else {
      e.preventDefault();
    }
  };

  return (
    <div>
      <div
        className={`text-white flex rounded-xl shadow-md gap-4 items-center cursor-pointer transition-colors duration-300 justify-between ${
          isSelected ? 'bg-[#29174b]' : 'bg-[#5A4D6D] bg-opacity-25'
        }`}
      >
        <button
          className="flex items-center gap-4 w-full py-4 px-6"
          onClick={handleClick}
        >
          {position && (
            <p className="mr-2 bg-[#3f3352] p-2 rounded-full text-white w-10 h-10 text-center font-medium text-md">
              {position}
            </p>
          )}
          <Image src={music.iconUrl} alt={music.title} width={60} height={50} />
          <div className="text-start">
            <p className="text-white font-bold">{music.title}</p>
            {music.artists && (
              <p className="opacity-50">
                {music.artists.map((artist) => artist.name).join(', ')}
              </p>
            )}
          </div>
        </button>
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
