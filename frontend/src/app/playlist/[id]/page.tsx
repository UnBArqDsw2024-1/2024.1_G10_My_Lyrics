'use client';

import MusicCard from '@/components/MusicCard';
import { api } from '@/lib/api';
import type { Playlist } from '@/lib/types/data';
import { useContext, useEffect, useState } from 'react';
import Modal from '@/components/Modal';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/context/UserContext';

export default function PlaylistPage({ params }: { params: { id: string } }) {
  const [playlist, setPlaylist] = useState<Playlist | undefined>(undefined);
  const user = useContext(UserContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const handleDelete = async (playlist: Playlist) => {
    try {
      await api.delete(`/playlist/${playlist.id}`);

      const updatedPlaylists = user.user?.playlists?.filter(
        (p) => p.id !== playlist.id
      );

      user.setUpdatedUser({ ...user.user, playlists: updatedPlaylists });

      router.push('/playlist');
    } catch (error) {
      console.error('Erro ao deletar playlist:', error);
    }
  };

  useEffect(() => {
    api
      .get(`/playlist/${params.id}`)
      .then((res) => {
        setPlaylist(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [params.id]);

  return (
    <div className="flex items-center justify-center mt-40 mb-20 gap-12">
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-bold text-white text-center">
          {playlist?.title}
        </h2>
        <p className="text-sm">{playlist?.description}</p>
        <button
          className="px-5 py-3 text-white bg-[#6BC5D2] rounded-lg"
          onClick={() => setIsModalOpen(true)}
        >
          Adicionar música a {playlist?.title}
        </button>
        <button
          className="px-5 py-3 text-white bg-[#cc4047] rounded-lg"
          onClick={() => handleDelete(playlist!)}
        >
          Deletar playlist
        </button>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          playlist={playlist!}
        />
        <div className="mt-24 text-white flex flex-col gap-4 items-center">
          {playlist && playlist.musics?.length > 0 ? (
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold">Musics</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {playlist.musics.map((music) => (
                  <MusicCard key={music.id} music={music} />
                ))}
              </div>
            </div>
          ) : (
            <p className="text-xl font-bold">
              Sua playlist não contem músicas :(
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
