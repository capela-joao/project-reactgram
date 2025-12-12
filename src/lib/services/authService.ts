import { RegisterData } from '@/types/UserTypes';
import { api, requestConfig } from '../api';
import { ApiSuccess, ApiError } from '@/types/ApiTypes';

export const authService = {
  register: async (data: RegisterData): Promise<ApiSuccess> => {
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

      return json as ApiSuccess;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
