import { LoginData, RegisterData, User } from '@/types/UserTypes';
import { api, requestConfig } from '../api';
import {
  ApiSuccessRegister,
  ApiError,
  ApiSuccessLogin,
} from '@/types/ApiTypes';

export const authService = {
  register: async (data: RegisterData): Promise<ApiSuccessRegister> => {
    const config = requestConfig('POST', data);

    try {
      const res = await fetch(api + '/users/register', config);
      const json = await res.json().catch(() => {});

      if (!res.ok) {
        const error: ApiError = {
          errors: json.errors ?? ['Erro desconhecido.'],
        };
        throw error;
      }

      return json as ApiSuccessRegister;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  login: async (data: LoginData): Promise<ApiSuccessLogin> => {
    const config = requestConfig('POST', data);

    try {
      const res = await fetch(api + '/users/login', config);
      const json = await res.json().catch(() => {});

      if (!res.ok) {
        const error: ApiError = {
          errors: json.errors ?? ['Erro desconhecido.'],
        };
        throw error;
      }

      return json as ApiSuccessLogin;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  getProfile: async (): Promise<User> => {
    const config = requestConfig('GET');

    try {
      const res = await fetch(api + '/users/profile', config);
      const json = await res.json().catch(() => {});

      if (!res.ok) {
        const error: ApiError = {
          errors: json.errors ?? ['Erro desconhecido.'],
        };
        throw error;
      }

      return json as User;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  logout: async (): Promise<void> => {
    const config = requestConfig('POST');

    try {
      await fetch(api + '/users/logout', config);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
