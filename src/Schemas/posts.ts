import * as z from 'zod';

export const newPostSchema = z.object({
  title: z
    .string()
    .min(1, 'O título é obrigatório')
    .max(2200, 'O título deve ter no máximo 2200 caracteres.'),
  image: z.instanceof(File, {
    message: 'O post deve conter ao menos uma imagem ou vídeo.',
  }),
});
