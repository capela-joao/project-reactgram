'use client';

import Link from 'next/link';
import Message from './message';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { registerUserSchema } from '@/Schemas/register';
import { RegisterData } from '@/types/UserTypes';

import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { register as registerThunk, reset } from '@/store/features/authSlice';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerUserSchema),
    mode: 'onChange',
  });

  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const router = useRouter();

  const onSubmit = async (data: RegisterData) => {
    try {
      await dispatch(registerThunk(data)).unwrap();

      router.push('/login');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  return (
    <div className="flex flex-col w-full bg-gray-50 border max-w-xl rounded-md p-6 justify-center items-center">
      <div className="w-full flex items-center flex-col gap-6 text-center">
        <h1 className="text-3xl font-bold mt-2 text-gray-950">
          Primeiro Cadastro
        </h1>

        <p className="text-gray-500 flex text-base">
          Efetue o cadastro para poder postar tudo o que quiser!
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full p-4 px-6 text-gray-950 flex flex-col gap-2"
      >
        <div className="flex w-full gap-1">
          <div className="flex flex-col gap-1 w-full">
            <Label htmlFor="firstName">Nome:</Label>
            <Input
              type="text"
              {...register('firstName')}
              placeholder="Digite o seu nome"
              className="w-full"
            />
            {errors.firstName && (
              <p className="text-xs text-pink-500">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1 w-full">
            <Label htmlFor="lastName">Sobrenome:</Label>
            <Input
              type="text"
              {...register('lastName')}
              placeholder="Digite o seu sobrenome"
              className="w-full"
            />
            {errors.lastName && (
              <p className="text-xs text-pink-500">{errors.lastName.message}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="username">Usuário:</Label>
          <Input
            type="text"
            {...register('username')}
            placeholder="Digite o seu usuário"
            className="w-full"
          />
          {errors.username && (
            <p className="text-xs text-pink-500">{errors.username.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="email">E-mail:</Label>
          <Input
            type="email"
            {...register('email')}
            placeholder="Digite o seu e-mail"
            className="w-full i
            nvalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:border-2 focus:invalid:outline-pink-500"
            autoComplete="username"
          />
          {errors.email && (
            <p className="text-xs text-pink-500">{errors.email.message}</p>
          )}
        </div>
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
        <div className="flex flex-col gap-1">
          <Label htmlFor="confirmPassword">Confirmar Senha:</Label>
          <Input
            type="password"
            {...register('confirmPassword')}
            placeholder="Confirme a sua senha"
            className="w-full"
            autoComplete="new-password"
          />
          {errors.confirmPassword && (
            <p className="text-xs text-pink-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        {!loading && (
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
        )}
        {loading && (
          <Button
            disabled={isValid}
            className={`text-gray-50 mt-6 font-bold text-xl h-12 
          cursor-pointer ${
            isValid
              ? 'opacity-50 cursor-not-allowed'
              : 'bg-gray-950 hover:bg-sky-500'
          }`}
            type="submit"
          >
            Aguarde...
          </Button>
        )}
        {error && <Message msg={error} type="error" />}
      </form>
      {}
      <div className="flex mt-4 justify-end w-full px-6 gap-2">
        <span>Já possui uma conta?</span>
        <Link
          href={'/login'}
          className="text-sky-500 opacity-90 hover:opacity-100 cursor-pointer"
        >
          Faça o login
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
