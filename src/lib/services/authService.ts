import { RegisterData } from '@/types/UserTypes';
import { api, requestConfig } from '../api';

export const authService = {
  register: async (data: RegisterData) => {
    const config = requestConfig('POST', data);

    try {
      const res = await fetch(api + '/users/register', config);

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));

        throw {
          status: res.status,
          message:
            errorData?.errors?.[0] || errorData?.message || 'Erro desconhecido',
        };
      }

      return await res.json();
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
