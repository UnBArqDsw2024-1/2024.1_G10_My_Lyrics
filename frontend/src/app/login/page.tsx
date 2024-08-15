"use client";

import React, { use } from "react";
import Logo from "../../assets/LOGO.svg";
import Image from "next/image";
import { api } from "@/lib/api";
import local from "next/font/local";
import { UserContext } from "@/context/UserContext";

export default function Login() {
  const user = use(UserContext);

  async function handleLogin(formData: FormData) {
    if (!formData.get("email") || !formData.get("password")) {
      alert("Por favor, preencha todos os campos!!!!!!!!!!");
      return;
    }

    try {
      const res = await api.post("/user/login", {
        email: formData.get("email"),
        password: formData.get("password"),
      });
      user.setUpdatedUser(res.data.user);
    } catch (error) {}
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="bg-[#32284d] bg-opacity-50 p-16 rounded-lg shadow-md w-4/12">
        <div className="flex flex-col items-center justify-center">
          <Image src={Logo} alt="Logo" className="mb-16 w-3/4" />
        </div>
        <form action={handleLogin}>
          <div className="mb-4 pb-3">
            <label className="block text-white text-lg font-medium mb-1">
              Email
            </label>
            <input
              className="w-full px-3 py-2 text-white bg-[#b8b2ca] bg-opacity-20 rounded-xl focus:outline-none focus:ring-0 backdrop-blur-md font-roboto"
              type="email"
              id="email"
              name="email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-white text-lg font-medium mb-1">
              Senha
            </label>
            <input
              className="w-full px-3 py-2 text-[#ffffff] bg-[#b8b2ca] bg-opacity-25 rounded-xl focus:outline-none focus:ring-0"
              type="password"
              id="password"
              name="password"
            />
          </div>
          <div className="mb-4 pt-4 flex items-center justify-center">
            <button
              className="w-3/4 py-3 text-xl font-bold bg-black text-white rounded-2xl transition-all duration-300 hover:bg-white hover:text-black"
              type="submit"
            >
              Entrar
            </button>
          </div>
          <div className="text-center">
            <a
              className="text-sm text-white underline hover:text-gray-200"
              href="/register"
            >
              Registrar-se
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
