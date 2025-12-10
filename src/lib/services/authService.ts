import { RegisterData } from '@/types/UserTypes';
import { api, requestConfig } from '../api';

export const register = async (data: RegisterData) => {
  const config = requestConfig('POST', data);

  try {
    const res = await fetch(api + '/users/register', config)
      .then((res) => res.json())
      .catch((err) => err);

    if (res) {
      localStorage.setItem('user', JSON.stringify(res));
    }
  } catch (err) {
    console.log(err);
  }
};
