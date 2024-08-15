"use client";

import { use } from "react";
import { api } from "@/lib/api";
import { redirect } from "next/navigation";

async function handleNewPlaylist(formData: FormData) {
  if (!formData.get("newPlaylistName")) {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  try {
    await api.post("/playlist", {
      title: formData.get("newPlaylistName"),
    });
  } catch (error) {
    console.error("Erro ao criar playlist:", error);
  }
}

export default function NewPlaylist() {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="bg-[#32284d] bg-opacity-50 p-12 rounded-lg shadow-md w-4/12 text-white items-center flex flex-col gap-8">
        <h1 className="text-3xl font-bold m-0">Criar uma nova playlist</h1>
        <form className="w-full" action={handleNewPlaylist}>
          <div className="pb-3">
            <label className="block text-lg font-medium mb-1">
              Digite o nome da playlist
            </label>
            <input
              className="w-full px-3 py-2 bg-[#b8b2ca] bg-opacity-20 rounded-xl focus:outline-none focus:ring-0 backdrop-blur-md font-roboto"
              type="newPlaylistName"
              id="newPlaylistName"
              name="newPlaylistName"
            />
          </div>
          <div className="my-8 flex items-center justify-center">
            <button
              className="w-2/4 py-3 text-xl font-bold bg-black rounded-2xl transition-all duration-300 hover:bg-white hover:text-black"
              type="submit"
            >
              Criar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
