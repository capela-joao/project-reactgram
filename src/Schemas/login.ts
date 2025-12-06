import * as z from 'zod';

export const loginUserSchema = z.object({
  email: z.string().email('O e-mail não é válido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});
