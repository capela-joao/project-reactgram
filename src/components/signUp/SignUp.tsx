'use client';

import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      name,
      email,
      password,
      confirmPassword,
    };
    console.log(data);
  };
  return (
    <div className="flex flex-col w-full bg-gray-50 border max-w-2xl rounded-md p-6 justify-center items-center">
      <div className="w-full flex items-center flex-col gap-6 text-center">
        <h1 className="text-3xl font-bold mt-2 text-gray-950">
          Primeiro Cadastro
        </h1>

        <p className="text-gray-950 flex text-lg">
          Efetue o cadastro para poder postar tudo o que quiser!
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full p-4 px-6 text-gray-950 flex flex-col gap-2"
      >
        <div>
          <Label htmlFor="name">Nome:</Label>
          <Input
            type="text"
            name="name"
            placeholder="Digite o seu nome"
            className="w-full"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="email">E-mail:</Label>
          <Input
            type="email"
            name="email"
            placeholder="Digite o seu e-mail"
            className="w-full"
            autoComplete="username"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
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
        <div>
          <Label htmlFor="confirmPassword">Confirmar Senha:</Label>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirme a sua senha"
            className="w-full"
            autoComplete="new-password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <Button
          className="text-gray-50 mt-6 bg-gray-950 font-bold text-xl cursor-pointer h-12 hover:bg-cyan-600 hover:text-gray-50"
          type="submit"
        >
          Cadastrar
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
