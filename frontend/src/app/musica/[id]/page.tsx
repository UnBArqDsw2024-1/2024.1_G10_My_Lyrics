'use client';
import { useEffect, useRef, useState } from 'react';
import { api } from '@/lib/api';
import type { Music, Verse } from '@/lib/types/data';
import Image from 'next/image';
import YouTubePlayer from './YoutubePlayer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

async function getMusicById(id: string): Promise<Music> {
  const res = await api.get(`/music/${id}`);
  return res.data;
}

export default function Musica({ params }: { params: { id: string } }) {
  const [music, setMusic] = useState<Music>();
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [youtubeVideoId, setYoutubeVideoId] = useState<string | null>(null);

  const playerRef = useRef<YT.Player | null>(null);
  const currentVerseRef = useRef<HTMLDivElement | null>(null);

  function handleClickVerse(verse: Verse) {
    if (playerRef.current) {
      playerRef.current.seekTo((verse.startTime - 10) / 1000, true);
      playerRef.current.playVideo();
    }
  }

  function setPlayerRef(ref: YT.Player) {
    playerRef.current = ref;
  }

  async function handleClickLike() {
    if (!music) return;

    if (music.liked === undefined || music.liked === false) {
      await api.patch(`/music/like/${music.id}`);
    } else {
      await api.patch(`/music/unlike/${music.id}`);
    }

    window.location.reload();
  }

  setTimeout(() => {
    if (!playerRef.current) {
      window.location.reload();
    }
  }, 500);

  useEffect(() => {
    const fetchMusic = async () => {
      const fetchedMusic = await getMusicById(params.id);
      setMusic(fetchedMusic);

      const videoId = fetchedMusic.youtubeUrl.split('v=')[1]?.split('&')[0];
      setYoutubeVideoId(videoId);
    };

    fetchMusic();
  }, [params.id]);

  useEffect(() => {
    if (currentVerseRef.current) {
      currentVerseRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [currentTime]);

  return (
    <div className="flex justify-center items-start mt-40">
      {music ? (
        <>
          <div className="relative lg:fixed left-20 top-40 flex flex-col gap-10">
            <div className="flex flex-col mt-10 gap-4 bg-[#5A4D6D] bg-opacity-25 p-6 rounded">
              {music.album.artists.map((artist) => (
                <div key={artist.name} className="flex flex-row items-center">
                  <Image
                    src={artist.profileUrl}
                    alt={artist.name}
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                  <div className="ml-3 flex flex-col items-start">
                    <h1 className="text-white font-bold">{artist.name}</h1>
                    <a
                      href={`/artista/${artist.id}`}
                      className="text-md text-gray-400 underline underline-offset-2 mt-1"
                    >
                      Sobre
                    </a>
                  </div>
                </div>
              ))}
              {music.album && (
                <div className="mt-2 bg-[#5A4D6D] bg-opacity-25 p-6 rounded text-center">
                  {music.album.coverUrl && (
                    <Image
                      src={music.album.coverUrl}
                      alt={music.album.title}
                      width={150}
                      height={150}
                      className="mt-2 rounded"
                    />
                  )}
                  <p className="text-white text-lg mt-4">{music.title}</p>
                  <p className="text-white text-lg opacity-50">
                    {music.album.title}
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="relative w-1/2 2xl:w-2/3 2xl:ml-64 max-h-[calc(100vh-10rem)] overflow-y-auto no-scrollbar">
            <div className="flex flex-row items-center justify-between text-3xl text-white font-bold mb-4 mt-12 border-b border-gray-400 pb-4 w-1/2">
              <h1>{music.title}</h1>
              <div
                onMouseDown={handleClickLike}
                className="flex items-center gap-3 cursor-pointer flex-row"
              >
                <p className="text-white font-medium text-2xl">{music.likes}</p>
                {music.liked !== undefined && (
                  <FontAwesomeIcon
                    icon={faHeart}
                    className={`
                 ${music.liked ? 'text-[#7338d3]' : 'text-gray-500'} w-6 h-6
              `}
                  />
                )}
              </div>
            </div>
            {music.verses.map((verse) => {
              const isVerseActive =
                currentTime >= verse.startTime && currentTime <= verse.endTime;
              const isLastVerse =
                music.verses.indexOf(verse) === music.verses.length - 1;

              return (
                <div
                  key={verse.id}
                  className={`flex flex-col ${
                    isVerseActive ? 'opacity-100' : 'opacity-25'
                  } cursor-pointer mt-4  w-fit pr-10 hover:opacity-100 transition-opacity duration-300
                    ${isLastVerse ? 'mb-20' : ''}
                  `}
                  ref={isVerseActive ? currentVerseRef : null}
                  onMouseDown={() => handleClickVerse(verse)}
                >
                  <p className="text-2xl text-white m-0 font-medium">
                    {verse.text}
                  </p>
                  {verse.translatedText && (
                    <p className="text-lg text-white m-0 opacity-50">
                      {verse.translatedText}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
          {youtubeVideoId ? (
            <div className="absolute top-32 2xl:fixed 2xl:right-10 2xl:top-56">
              <YouTubePlayer
                videoId={youtubeVideoId}
                setCurrentTime={setCurrentTime}
                setPlayerRef={setPlayerRef}
              />
            </div>
          ) : (
            <p>Video não encontrado</p>
          )}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#09001B] to-transparent pointer-events-none" />
        </>
      ) : (
        <div className="flex flex-col gap-4">
          <p className="text-4xl text-white font-bold">Carregando...</p>
        </div>
      )}
    </div>
  );
}
