'use client';
import React from 'react';
import { api } from '../api';

export default function Login() {
  async function handleLogin(formData: FormData) {
    if (!formData.get('email') || !formData.get('password')) {
      alert('Por favor, preencha todos os campos!!!!!!!!!!');
      return;
    }

    try {
      const response = await api.post('/user/login', {
        email: formData.get('email'),
        password: formData.get('password'),
      });

      console.log(response);
    } catch (error) {}
  }

  return (
    <div className="bg-gradient-to-b from-black to-[#0B0129] flex items-center justify-center w-screen h-screen">
      <div className="bg-[#362f4a] bg-opacity-50 p-16 rounded-lg shadow-md 2xl:w-3/12 xl:w-4/12 lg:w-5/12 md:w-6/12 w-3/4">
        <h2 className="text-3xl font-bold text-center text-white mb-16">
          Entrar no My Lyrics
        </h2>
        <form action={handleLogin}>
          <div className="mb-4 pb-3">
            <label className="block text-white text-lg font-bold mb-1">
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
            <label className="block text-white text-lg font-bold mb-1">
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
              className="w-3/4 py-3 text-xl font-bold bg-black text-white rounded-2xl"
              type="submit"
            >
              Entrar
            </button>
          </div>
          <div className="text-center">
            <a className="text-sm text-white underline hover:text-gray-200">
              Registrar-se
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
