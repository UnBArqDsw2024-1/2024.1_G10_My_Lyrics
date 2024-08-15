"use client";

import { api } from "@/lib/api";
import { Playlist, Music } from "@/lib/types/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { on } from "events";
import MusicCard from "./MusicCard";
import { useRouter } from "next/navigation";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  playlist: Playlist;
}

export default function Modal({ isOpen, onClose, playlist }: ModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMusic, setFilteredMusic] = useState<Music[]>([]);
  const [selectedMusic, setSelectedMusic] = useState<string>("");
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  async function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const query = e.target.value;
    setSearchTerm(query);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(async () => {
      if (query.length > 3) {
        try {
          const res = await api.get(`/music/search?title=${query}`);
          setFilteredMusic(res.data);
        } catch (error) {
          console.error(error);
        }
      } else {
        setFilteredMusic([]);
      }
    }, 300);

    setTimeoutId(newTimeoutId);
  }

  async function handleAddMusic() {
    if (!selectedMusic) return;

    try {
      onClose();
      await api.post(`/playlist/${playlist.id}/music`, {
        music_id: selectedMusic,
      });
    } catch (error) {
      console.error(error);
    }
  }

  const handleSelectMusic = (musicId: string) => {
    setSelectedMusic(musicId);
  };

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm transition-opacity duration-300 flex items-center justify-center">
        <div className="flex min-h-screen items-center justify-center p-4 text-center xl:w-2/4 w-3/4">
          <div className="relative bg-[#3F3352] rounded-lg shadow-lg">
            <div className="p-6">
              <div className="flex items-center justify-between gap-8">
                <h3 className="text-xl font-bold text-white text-left">
                  A sua playlist {playlist.title} está pronta para receber uma
                  música nova!
                </h3>
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-500"
                  onClick={onClose}
                >
                  <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-5 sm:mt-6">
                <form className="w-full flex flex-col gap-8">
                  <input
                    type="text"
                    name="musicId"
                    placeholder="Nome da música"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full px-4 py-3 bg-[#b8b2ca] bg-opacity-20 rounded-xl focus:outline-none focus:ring-0 backdrop-blur-md font-roboto text-white"
                  />
                  {filteredMusic.length > 0 && (
                    <ul className="bg-[#3F3352] rounded-lg max-h-96 overflow-y-auto mt-2 flex flex-col gap-4 px-4">
                      {filteredMusic.map((music) => (
                        <li
                          key={music.id}
                          onClick={() => handleSelectMusic(music.id)}
                        >
                          <MusicCard
                            music={music}
                            isModal
                            isSelected={selectedMusic === music.id}
                          />
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="flex gap-4">
                    <button
                      onClick={onClose}
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-[#d06161] text-base font-medium hover:bg-[#a34949] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddMusic}
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#6BC5D2] text-base font-medium text-white hover:bg-[#417a83] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
