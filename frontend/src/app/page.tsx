"use client";
import MusicCard from "@/components/MusicCard";
import { api } from "@/lib/api";
import type { Artists, Music, User } from "@/lib/types/data";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Feather, User as UserIcon } from "react-feather";

interface SearchResult {
  artists: Artists[];
  musics: Music[];
  users: User[];
}

export default function Home() {
  const [musics, setMusics] = useState<Music[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [searchResults, setSearchResults] = useState<SearchResult>();
  const [loading, setLoading] = useState<boolean>(false);

  async function getTenMusics() {
    const today = new Date();
    const dataFinished = today.toISOString().split("T")[0];

    const res = await api.get(
      `/music/hotspot?number=20&dataInit=1000-01-01&dataFinished=${dataFinished}`
    );

    return res.data;
  }

  useEffect(() => {
    const fetchMusics = getTenMusics();
    fetchMusics.then(setMusics);
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchText.length > 2) {
        setLoading(true);
        const res = await api.get(`/user/searchAny?text=${searchText}`);
        setSearchResults(res.data);
        setLoading(false);
      } else {
        setSearchResults(undefined);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText]);

  function handleSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(e.target.value);
  }

  return (
    <div className="flex flex-col items-center justify-center mt-60 mb-40 gap-12">
      <div className="flex flex-col items-center relative justify-center w-1/2">
        <input
          type="text"
          placeholder="Pesquise pelas músicas e albuns mais badalados(as) do momento, ou até mesmo um amigo"
          className="px-4 py-3 w-full text-white bg-opacity-20 rounded-xl bg-[#3f3352]"
          value={searchText}
          onChange={handleSearchInput}
        />
        {loading && (
          <div className="w-full mt-2 text-center text-white">
            Carregando...
          </div>
        )}
        {searchResults && !loading && (
          <div className="w-full mt-2 bg-[#2b213a] rounded-lg shadow-lg z-10">
            {searchResults.artists.length === 0 &&
            searchResults.musics.length === 0 &&
            searchResults.users.length === 0 ? (
              <div className="p-4 text-center text-white">
                Nenhum resultado encontrado
              </div>
            ) : (
              <>
                {searchResults.musics.length > 0 && (
                  <div className="p-4">
                    <h3 className="text-white font-semibold mb-2">Músicas</h3>
                    {searchResults.musics.map((result) => (
                      <Link
                        key={result.id}
                        className="flex flex-row items-center p-2 hover:bg-[#3f3352] rounded-md cursor-pointer"
                        href={`/musica/${result.id}`}
                      >
                        <Image
                          src={result.iconUrl}
                          alt={result.title}
                          width={36}
                          height={36}
                          className="rounded-full"
                        />
                        <p className="text-white font-medium ml-4">
                          {result.title}
                        </p>
                      </Link>
                    ))}
                  </div>
                )}
                {searchResults.artists.length > 0 && (
                  <div className="p-4">
                    <h3 className="text-white font-semibold mb-2">Artistas</h3>
                    {searchResults.artists.map((result) => (
                      <Link
                        key={result.id}
                        className="flex flex-row items-center p-2 hover:bg-[#3f3352] rounded-md cursor-pointer"
                        href={`/artista/${result.id}`}
                      >
                        <Image
                          src={result.profileUrl}
                          alt={result.name}
                          width={36}
                          height={36}
                          className="rounded-full"
                        />
                        <p className="text-white font-medium ml-4">
                          {result.name}
                        </p>
                      </Link>
                    ))}
                  </div>
                )}
                {searchResults.users.length > 0 && (
                  <div className="p-4">
                    <h3 className="text-white font-semibold mb-2">Usuários</h3>
                    {searchResults.users.map((result) => (
                      <Link
                        key={result.id}
                        className="flex flex-row items-center p-2 hover:bg-[#3f3352] rounded-md cursor-pointer"
                        href={`/user/${result.id}`}
                      >
                        {result.iconUrl ? (
                          <Image
                            src={result.iconUrl}
                            alt={result.name}
                            width={36}
                            height={36}
                            className="rounded-full w-[36px] h-[36px] object-cover"
                          />
                        ) : (
                          <div className="w-[36px] h-[36px] bg-[#3f3352] rounded-full flex items-center justify-center">
                            <UserIcon size={20} color="#5A4D6D" />
                          </div>
                        )}
                        <p className="text-white font-medium ml-4">
                          {result.name}
                        </p>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <div className="border-b px-4 py-2 w-2/12 text-center border-[#3F3352] mb-10">
          <p className="text-white text-xl">Top 20 do país</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mt-4 w-3/4">
          {musics.map((music, index) => (
            <MusicCard key={index} music={music} position={index + 1} />
          ))}
        </div>
      </div>
    </div>
  );
}
