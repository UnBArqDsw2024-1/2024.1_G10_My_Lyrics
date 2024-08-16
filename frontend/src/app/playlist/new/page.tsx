'use client';

import { use, useContext } from 'react';
import { UserContext } from '@/context/UserContext';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function NewPlaylist() {
  const user = useContext(UserContext);
  const router = useRouter();

  if (user.user === false) {
    router.push('/login');
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (!formData.get('newPlaylistName')) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    try {
      const res = await api.post('/playlist', {
        title: formData.get('newPlaylistName')!,
      });

      if (!res.data || !user.user) {
        throw new Error('Erro ao criar playlist');
      }

      const updatedPlaylists = [...user.user.playlists, res.data];

      user.setUpdatedUser({ ...user.user, playlists: updatedPlaylists });

      router.push('/playlist');
    } catch (error) {
      console.error('Erro ao criar playlist:', error);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="bg-[#32284d] bg-opacity-50 p-12 rounded-lg shadow-md w-4/12 text-white items-center flex flex-col gap-8">
        <h1 className="text-3xl font-bold m-0">Criar uma nova playlist</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <input
            type="text"
            name="newPlaylistName"
            placeholder="Nome da nova playlist"
            className="w-full px-4 py-3 bg-[#b8b2ca] bg-opacity-20 rounded-xl focus:outline-none focus:ring-0 backdrop-blur-md font-roboto"
          />
          <button
            type="submit"
            className="p-4 text-white rounded-2xl transition-all bg-[#3f3352] bg-opacity-20 hover:bg-opacity-30 hover:bg-[#3f3352]"
          >
            Nova Playlist
          </button>
        </form>
      </div>
    </div>
  );
}
