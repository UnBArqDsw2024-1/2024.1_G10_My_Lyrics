"use client";
import React, { use, useEffect, useState } from "react";
import { api } from "@/lib/api";
import Image from "next/image";
import Logo from "@/assets/LOGO.svg";
import type { User } from "@/lib/types/data";
import { redirect } from "next/navigation";
import PlaylistsSection from "@/components/PlaylistsSection";

export default function UserPage() {
  async function fetchUser() {
    const user = await api.get("/user");

    return user.data;
  }

  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    fetchUser().then((user) => setUser(user));
  }, []);

  const [useCensoredMusics, setCensoredMusics] = useState(user?.censoredMusics);

  function handleCensoredMusicsChange(isChecked: boolean) {
    api.patch("/user", { censoredMusics: isChecked });
    setCensoredMusics(isChecked);
  }

  const [progress, setProgress] = useState(0);
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = () => {
    setIsPressed(true);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsPressed(false);

          api.delete("/user").then(() => {
            redirect("/login");
          });
        }
        return prev + 1;
      });
    }, 10);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
    setProgress(0);
  };

  const [userData, setUserData] = useState({
    name: user?.name,
    email: user?.email,
    password: "",
  });

  function handleSaveUser() {
    if (userData.password === "") {
      api.put("/user", (userData.email, userData.name));
    } else {
      api.put("/user", userData);
    }
  }

  return (
    <div className="bg-gradient-to-b flex  justify-center w-screen pb-8 ">
      <div className="flex flex-col items-center mt-40">
        <div className="flex flex-col items-center background space-y-4 mb-20">
          <div className="rounded-full overflow-hidden w-28 h-28 relative">
            <Image
              src={user?.iconUrl || Logo}
              width={112}
              height={112}
              alt="user"
              className="object-cover w-full h-full"
            />
          </div>
          <h2 className="text-3xl text-center text-white mb-16">
            {user?.name}
          </h2>
          <div className="flex flex-row space-x-4">
            <div className="inline-flex items-center mb-16">
              <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
                <input
                  id="switch-component"
                  type="checkbox"
                  className="absolute w-8 h-4 transition-colors duration-300 rounded-full appearance-none cursor-pointer peer bg-gray-400 checked:bg-violet-500 peer-checked:border-gray-900 peer-checked:before:bg-violet-500"
                  checked={useCensoredMusics}
                  onChange={(e) => handleCensoredMusicsChange(e.target.checked)}
                />
                <label
                  htmlFor="switch-component"
                  className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-gray-900 peer-checked:before:bg-gray-900"
                >
                  <div
                    className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                    data-ripple-dark="true"
                  ></div>
                </label>
              </div>
            </div>

            <label className="text-white text-lg  mb-16">
              Filtrar Palavrões
            </label>
          </div>

          {/* <div className="grid grid-cols-2 gap-10 w-[720px]">
            <div className="space-y-2">
              <label className="text-white" htmlFor="">
                Nome
              </label>

              <div className="space-x-4">
                <input
                  className="pl-4 rounded-lg w-64 h-14 bg-violet-900 bg-opacity-20 text-slate-200"
                  type="text"
                  placeholder="Nome"
                  value={user?.name}
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                  disabled
                />

                <button className="bg-cyan-300 h-14 rounded-lg justify-self-center px-4">
                  icon
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-white" htmlFor="">
                Email
              </label>

              <div className="space-x-4">
                <input
                  className="pl-4 rounded-lg w-64 h-14 bg-violet-900 bg-opacity-20 text-slate-200"
                  type="text"
                  placeholder="Email"
                  value={user?.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  disabled
                />

                <button className="bg-cyan-300 h-14 rounded-lg justify-self-center px-4">
                  icon
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-white" htmlFor="">
                Senha
              </label>

              <div className="space-x-4">
                <input
                  className="pl-4 rounded-lg w-64 h-14 bg-violet-900 bg-opacity-20 text-slate-200"
                  type="text"
                  placeholder="*************"
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                  disabled
                />

                <button className="bg-cyan-300 h-14 rounded-lg justify-self-center px-4">
                  icon
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between w-[720px] ">
            <button
              className={`relative bg-transparent rounded-lg px-4 py-2 border border-inherit mt-4 text-xs text-white`}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
            >
              {isPressed && (
                <div
                  className="absolute top-0 border-inherit rounded-lg  left-0 h-full bg-red-500"
                  style={{ width: `${progress}%` }}
                ></div>
              )}
              <span className="relative z-10">
                Deletar Conta (Pressione por 5 segundos)
              </span>
            </button>

            <button className="bg-transparent rounded-lg px-4 py-2 border border-inherit mt-4 text-xs text-white">
              Salvar
            </button>
          </div> */}
        </div>
        <PlaylistsSection playlists={user?.playlists} />
      </div>
    </div>
  );
}
