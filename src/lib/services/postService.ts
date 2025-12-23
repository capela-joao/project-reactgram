import { NewPostData, Post } from '@/types/PostsTypes';
import { api, requestConfig } from '../api';

const buildNewPostFormData = (data: NewPostData): FormData => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('image', data.image);

  return formData;
};

export const postService = {
  createPost: async (data: NewPostData): Promise<Post> => {
    const formData = buildNewPostFormData(data);

    const config = requestConfig({
      method: 'POST',
      data: formData,
      cache: 'no-store',
    });

    try {
      const res = await fetch(api + '/photos/', config);
      const json = await res.json().catch(() => {});

      if (!res.ok) {
        const error = {
          errors: json.errors ?? ['Erro desconhecido.'],
        };
        throw error;
      }

      return json as Post;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  getPosts: async (): Promise<Post[]> => {
    const config = requestConfig({ method: 'GET', cache: 'no-store' });

    const res = await fetch(api + '/photos/', config);
    const json = await res.json();

    if (!res.ok) {
      throw new Error(json?.errors?.[0] ?? 'Erro ao carregar posts');
    }

    return json as Post[];
  },
};
