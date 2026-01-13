import * as z from 'zod';

export const updateUserSchema = z
  .object({
    firstName: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
    lastName: z.string().min(3, 'O sobrenome deve ter pelo menos 6 caracteres'),
    password: z
      .string()
      .min(6, 'A senha deve ter pelo menos 6 caracteres')
      .optional(),
    bio: z
      .string()
      .max(150, 'A bio deve ter no máximo 150 caracteres')
      .optional(),
    profileImage: z
      .instanceof(File, {
        message: 'Selecione uma imagem válida.',
      })
      .optional(),
    confirmPassword: z
      .string()
      .min(6, 'A senha deve ter pelo menos 6 caracteres')
      .optional(),
  })
  .refine(
    (data) => {
      if (data.password && data.password.length > 0) {
        return data.password === data.confirmPassword;
      }
      return true;
    },
    {
      message: 'As senhas não coincidem',
      path: ['confirmPassword'],
    }
  );
