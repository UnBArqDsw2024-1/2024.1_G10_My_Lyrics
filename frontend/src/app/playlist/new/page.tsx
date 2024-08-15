"use client";

import { use } from "react";
import { UserContext } from "@/context/UserContext";
import { api } from "@/lib/api";
import { redirect } from "next/navigation";

export default function NewPlaylist() {
  const { user } = use(UserContext);

  try {
    if (window && user === null) {
      redirect("/login");
    }
  } catch (error) {
    console.error("Erro ao carregar user:", error);
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

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
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="bg-[#32284d] bg-opacity-50 p-12 rounded-lg shadow-md w-4/12 text-white items-center flex flex-col gap-8">
        <h1 className="text-3xl font-bold m-0">Criar uma nova playlist</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="newPlaylistName"
            placeholder="Nome da nova playlist"
            className="w-full px-3 py-2 bg-[#b8b2ca] bg-opacity-20 rounded-xl focus:outline-none focus:ring-0 backdrop-blur-md font-roboto"
          />
          <button type="submit">Criar Playlist</button>
        </form>
      </div>
    </div>
  );
}
