'use client';

import { api } from '@/lib/api';
import Logo from '../../assets/LOGO.svg';
import Image from 'next/image';
import { UserContext } from '@/context/UserContext';
import { use, useContext } from 'react';
import { redirect, useRouter } from 'next/navigation';
import Button from '@/components/Button';

export default function Register() {
  const user = useContext(UserContext);
  const router = useRouter();

  if (user.user) {
    router.push('/');
  }

  async function handleRegister(formData: FormData) {
    if (
      !formData.get('email') ||
      !formData.get('password') ||
      !formData.get('name') ||
      !formData.get('password2')
    ) {
      alert('Por favor, preencha todos os campos!!!!');
      return;
    }

    if (formData.get('password') !== formData.get('password2')) {
      alert('As senhas não conferem');
      return;
    }

    try {
      const response = await api.post('/user', {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
      });

      user.setUpdatedUser(response.data);

      router.push('/');
    } catch (error: any) {
      alert(error.response.data.message);
    }
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="bg-[#32284d] bg-opacity-50 py-8 px-16 rounded-lg shadow-md xl:w-1/3 lg:w-2/4 w-3/4">
        <div className="flex flex-col items-center justify-center">
          <Image src={Logo} alt="Logo" className="mb-16 w-3/4" />
        </div>
        <form action={handleRegister}>
          <div className="mb-4 pb-3">
            <label className="block text-white text-lg font-medium mb-1">
              Nome de Usuário
            </label>
            <input
              className="w-full px-3 py-2 text-white bg-[#b8b2ca] bg-opacity-20 rounded-xl focus:outline-none focus:ring-0 backdrop-blur-md font-roboto"
              type="text"
              id="text"
              name="name"
            />
          </div>
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
          <div className="mb-6">
            <label className="block text-white text-lg font-medium mb-1">
              Confime sua Senha
            </label>
            <input
              className="w-full px-3 py-2 text-[#ffffff] bg-[#b8b2ca] bg-opacity-25 rounded-xl focus:outline-none focus:ring-0"
              type="password"
              id="password2"
              name="password2"
            />
          </div>
          <div className="mb-4 pt-4 flex items-center justify-center">
            <Button type="submit">Cadastrar</Button>
          </div>
          <div className="text-center">
            <a
              className="text-sm text-white underline hover:text-gray-200"
              href="/login"
            >
              Já tem uma conta? Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
