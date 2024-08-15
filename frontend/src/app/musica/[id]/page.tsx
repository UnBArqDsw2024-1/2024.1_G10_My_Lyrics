'use client';
import { useEffect, useRef, useState } from 'react';
import { api } from '@/lib/api';
import type { Music, Verse } from '@/lib/types/data';
import Image from 'next/image';
import YouTubePlayer from './YoutubePlayer';

async function getMusicById(id: string): Promise<Music> {
  const res = await api.get(`/music/${id}`);
  return res.data;
}

export default function Musica({ params }: { params: { id: string } }) {
  const [music, setMusic] = useState<Music>();
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [youtubeVideoId, setYoutubeVideoId] = useState<string | null>(null);

  const playerRef = useRef<HTMLVideoElement>(null);
  const currentVerseRef = useRef<HTMLDivElement>(null);

  function handleClickVerse(verse: Verse) {
    playerRef.current?.seekTo((verse.startTime - 10) / 1000);
  }

  function setPlayerRef(ref: HTMLVideoElement) {
    playerRef.current = ref;
  }

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
    const scrollToVerse = () => {
      if (currentVerseRef.current) {
        currentVerseRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    };

    const timeoutId = setTimeout(scrollToVerse, 50);
    return () => clearTimeout(timeoutId);
  }, [currentTime]);

  return (
    <div className="flex flex-row items-start justify-center mt-40">
      {music ? (
        <>
          <div className="flex flex-col gap-4 fixed left-20 bg-[#32284d] p-6 rounded">
            <p className="text-4xl text-white font-bold">{music.title}</p>
            {music.album.artists.map((artist) => {
              return (
                <a
                  href={`/artista/${artist.id}`}
                  key={artist.name}
                  className="text-lg text-gray-400 underline underline-offset-2"
                >
                  {artist.name}
                </a>
              );
            })}
            <Image
              src={music.iconUrl}
              alt={music.title}
              width={250}
              height={200}
            />
            {music.album && (
              <div className="mt-2 border-t-2 border-gray-400">
                <h1 className="mt-2 text-white font-medium text-xl">Album</h1>
                {music.album.coverUrl && (
                  <Image
                    src={music.album.coverUrl}
                    alt={music.album.title}
                    width={250}
                    height={200}
                    className="mt-2"
                  />
                )}
                <p className="text-white text-lg mt-4">{music.album.title}</p>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-4 mr-20 max-h-1/2 overflow-y-auto">
            <h1 className="text-2xl text-white font-bold">Letra</h1>
            <span className="h-[1px] w-full bg-gray-600 mb-2" />
            {music.verses.map((verse) => (
              <div
                key={verse.id}
                className={`flex flex-col p-3 ${
                  currentTime >= verse.startTime && currentTime <= verse.endTime
                    ? 'bg-[#432f64]'
                    : 'hover:bg-[#251a37]'
                } cursor-pointer`}
                ref={
                  currentTime >= verse.startTime && currentTime <= verse.endTime
                    ? currentVerseRef
                    : null
                }
                onClick={() => handleClickVerse(verse)}
              >
                <p className="text-xl text-white m-0 font-medium">
                  {verse.text}
                </p>
                {verse.translatedText && (
                  <p className="text-lg text-white m-0 opacity-50">
                    {verse.translatedText}
                  </p>
                )}
              </div>
            ))}
          </div>
          {youtubeVideoId ? (
            <div className="fixed right-10">
              <YouTubePlayer
                videoId={youtubeVideoId}
                setCurrentTime={setCurrentTime}
                setPlayerRef={setPlayerRef}
              />
            </div>
          ) : (
            <p>Video não encontrado</p>
          )}
          <span className="w-full fixed bottom-0 bg-gradient-to-t from-[#09001B] from-50% to-[#09001B]/0 h-32" />
        </>
      ) : (
        <div className="flex flex-col gap-4">
          <p className="text-4xl text-white font-bold">Carregando...</p>
        </div>
      )}
    </div>
  );
}
