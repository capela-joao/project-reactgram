'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <div className="flex flex-col w-full bg-gray-50 border max-w-xl rounded-md p-6 justify-center items-center">
      <div className="w-full flex items-center flex-col gap-6 text-center">
        <h1 className="text-3xl font-bold mt-2 text-gray-950">
          Efetue o Login
        </h1>

        <p className="text-gray-500 flex text-base">
          Efetue o login para acessar a nossa rede social!
        </p>
      </div>

      <form
        onSubmit={handleSubmitLogin}
        className="w-full p-4 px-6 text-gray-950 flex flex-col gap-2"
      >
        <div className="flex flex-col gap-1">
          <Label htmlFor="email">E-mail:</Label>
          <Input
            type="email"
            name="email"
            placeholder="Digite o seu e-mail"
            className="w-full
            invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:border-2 focus:invalid:outline-pink-500"
            autoComplete="username"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="password">Senha:</Label>
          <Input
            type="password"
            name="password"
            placeholder="Digite a sua senha"
            className="w-full"
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button
          className="text-gray-50 mt-6 bg-gray-950 font-bold text-xl cursor-pointer h-12 font-roboto font-semibold
          hover:bg-sky-500 hover:text-gray-50"
          type="submit"
        >
          Cadastrar
        </Button>
      </form>
      <div className="flex mt-4 justify-end w-full px-6 gap-2">
        <span>Não possui uma conta ainda?</span>
        <Link
          href={'/register'}
          className="text-blue-500 opacity-90 hover:opacity-100 cursor-pointer"
        >
          Cadastre-se
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
