"use client";

import { api } from "@/lib/api";

export default function Register() {
  async function handleRegister(formData: FormData) {
    if (!formData.get('email') || !formData.get('password') || !formData.get('name') || !formData.get('password2')) {
      alert('Por favor, preencha todos os campos!!!!');
      return;
    }

    if (formData.get('password') !== formData.get('password2')) {
      alert('As senhas não conferem');
      return;
    }

    try {
      await api.post('/user', {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
      });
    } catch (error: any) {
      alert(error.response.data.message);
    }
  }

  return (
    <div className="bg-gradient-to-b from-black to-[#0B0129] min-h-screen flex items-center justify-center">
      <div className="bg-[#362f4a] bg-opacity-25 p-16 rounded-lg shadow-md 2xl:w-3/12 xl:w-4/12 lg:w-5/12 md:w-6/12 w-3/4">
        <h2 className="text-3xl font-bold text-center text-white mb-16">
          Registrar no My Lyrics
        </h2>
        <form action={handleRegister}>
          <div className="mb-4 pb-3">
            <label className="block text-white text-lg font-bold mb-1">
              Nome de Usuário
            </label>
            <input
              className="w-full px-3 py-2 text-white bg-[#b8b2ca] bg-opacity-20 rounded-xl focus:outline-none focus:ring-0 backdrop-blur-md font-roboto"
              type="text"
              id="text"
              name="name"
            />
          </div>
          <div className="mb-6">
            <label className="block text-white text-lg font-bold mb-1">
              Email
            </label>
            <input
              className="w-full px-3 py-2 text-[#ffffff] bg-[#b8b2ca] bg-opacity-25 rounded-xl focus:outline-none focus:ring-0"
              type="email"
              id="email"
              name="email"
            />
          </div>
          <div className="mb-4 pb-3">
            <label className="block text-white text-lg font-bold mb-1">
              Senha
            </label>
            <input
              className="w-full px-3 py-2 text-white bg-[#b8b2ca] bg-opacity-20 rounded-xl focus:outline-none focus:ring-0 backdrop-blur-md font-roboto"
              type="password"
              id="password"
              name="password"
            />
          </div>
          <div className="mb-4 pb-3">
            <label className="block text-white text-lg font-bold mb-1">
              Confirme sua Senha
            </label>
            <input
              className="w-full px-3 py-2 text-white bg-[#b8b2ca] bg-opacity-20 rounded-xl focus:outline-none focus:ring-0 backdrop-blur-md font-roboto"
              type="password"
              id="password2"
              name="password2"
            />
          </div>
          <div className="mb-4 pt-4 flex items-center justify-center">
            <button type="submit" className="w-3/4 py-3 text-xl font-bold bg-black text-white rounded-2xl blurred-border">
              Registrar
            </button>
          </div>
          <div className="text-center">
            <a className="text-sm text-white underline hover:text-gray-200">
              Já tem uma conta? Entrar
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
