'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { LoginData } from '@/types/UserTypes';
import { loginUserSchema } from '@/Schemas/login';

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginData>({
    resolver: zodResolver(loginUserSchema),
    mode: 'onChange',
  });

  const handleSubmitLogin = async (data: LoginData) => {
    console.log(data);
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
        onSubmit={handleSubmit(handleSubmitLogin)}
        className="w-full p-4 px-6 text-gray-950 flex flex-col gap-2"
      >
        <div className="flex flex-col gap-1">
          <Label htmlFor="email">E-mail:</Label>
          <Input
            type="email"
            {...register('email')}
            placeholder="Digite o seu e-mail"
            className="w-full
            invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:border-2 focus:invalid:outline-pink-500"
            autoComplete="username"
          />
        </div>
        {errors.email && (
          <p className="text-xs text-pink-500">{errors.email.message}</p>
        )}
        <div className="flex flex-col gap-1">
          <Label htmlFor="password">Senha:</Label>
          <Input
            type="password"
            {...register('password')}
            placeholder="Digite a sua senha"
            className="w-full"
            autoComplete="new-password"
          />
          {errors.password && (
            <p className="text-xs text-pink-500">{errors.password.message}</p>
          )}
        </div>
        <Button
          disabled={!isValid}
          className={`text-gray-50 mt-6 font-bold text-xl h-12 
          cursor-pointer ${
            !isValid
              ? 'opacity-50 cursor-not-allowed'
              : 'bg-gray-950 hover:bg-sky-500'
          }`}
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
