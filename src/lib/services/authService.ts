import {
  LoginData,
  RegisterData,
  updateUserData,
  User,
} from '@/types/UserTypes';
import { api, requestConfig } from '../api';
import {
  ApiSuccessRegister,
  ApiError,
  ApiSuccessLogin,
} from '@/types/ApiTypes';

const buildUpdateUser = (data: updateUserData): FormData => {
  const formData = new FormData();
  if (data.firstName) formData.append('firstName', data.firstName);
  if (data.lastName) formData.append('lastName', data.lastName);
  if (data.password) formData.append('password', data.password);
  if (data.bio) formData.append('bio', data.bio);
  if (data.profileImage) formData.append('profileImage', data.profileImage);

  return formData;
};

export const authService = {
  register: async (data: RegisterData): Promise<ApiSuccessRegister> => {
    const config = requestConfig({
      method: 'POST',
      data: data,
      cache: 'no-store',
    });

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
    const config = requestConfig({
      method: 'POST',
      data: data,
      cache: 'no-store',
    });

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

  updateUser: async (data: updateUserData): Promise<User> => {
    const formData = buildUpdateUser(data);

    const config = requestConfig({
      method: 'PUT',
      data: formData,
      isFormData: true,
      cache: 'no-store',
    });

    try {
      const res = await fetch(api + '/users/', config);
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

  getProfile: async (): Promise<User> => {
    const config = requestConfig({
      method: 'GET',
      cache: 'no-store',
    });

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
    const config = requestConfig({
      method: 'POST',
    });

    try {
      await fetch(api + '/users/logout', config);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
