"use client";
import React, { useEffect, useState } from "react";
import { api } from "@/lib/api";
import Image from "next/image";
import Logo from "@/assets/LOGO.svg";
import { User } from "@/lib/types/data";
import PlaylistsSection from "@/components/PlaylistsSection";

export default function UserPage({ params }: { params: { id: string } }) {
  async function fetchUser() {
    const user = await api.get("/user");

    return user.data;
  }

  async function fetchUserById(id: string) {
    const user = await api.get(`/user/byId/${id}`);

    return user.data;
  }

  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    fetchUser().then((user) => setUser(user));
  }, []);

  const [visitedUser, setVisitedUser] = useState<User | null>(null);
  useEffect(() => {
    fetchUserById(params.id).then((user) => setVisitedUser(user));
  }, [params.id]);

  const [isFollowing, setIsFollowing] = useState(false);

  async function handleFollowUser() {
    await api.patch(`/user/like/${params.id}`);
    setIsFollowing((prev) => !prev);
  }

  return (
    <div className="bg-gradient-to-b flex  justify-center w-screen min-h-screen pb-8">
      <div className="flex flex-col items-center mt-40">
        <div className="flex flex-col items-center background space-y-4">
          <div className="rounded-full overflow-hidden w-28 h-28 relative">
            <Image
              src={visitedUser?.iconUrl || Logo}
              width={112}
              height={112}
              alt="user"
              className="object-cover w-full h-full"
            />
          </div>
          <h2 className="text-3xl text-center text-white mb-16">
            {visitedUser?.name}
          </h2>
          <div className="flex flex-row space-x-4">
            <div className="inline-flex items-center mb-16">
              <button
                onClick={handleFollowUser}
                className="bg-transparent rounded-lg px-16 py-2 border-2 border-[#3F3352] mt-4 text-xs text-white hover:bg-[#3F3352] hover:text-white"
              >
                {isFollowing ? "seguindo" : "seguir"}
              </button>
            </div>
          </div>
        </div>
        <PlaylistsSection playlists={visitedUser?.playlists} />
      </div>
    </div>
  );
}
