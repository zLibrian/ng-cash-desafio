import { z } from 'zod';

export const userSchema = z.object({
  id: z.number(),
  username: z.string().min(3, { message: 'Username deve possuir ao menos 3 caracteres' }),
  password: z.string().min(8, { message: 'Password deve possuir ao menos 8 caracteres' })
    .regex(
      /((?=.*\d)(?=.*[A-Z])(?=.*\W).{8,})/gm,
      { message: 'Password deve possuir ao menos 1 letra maiúscula e 1 número' },
    ),
  accountId: z.number(),
});

export const userCreateSchema = userSchema.omit({ id: true });
export const userCreateSchemaResponse = userSchema.omit({ password: true });
export const UserRegisterSchema = userCreateSchema.omit({ accountId: true });

export type User = z.infer<typeof userSchema>;
export type UserCreate = z.infer<typeof userCreateSchema>;

export type UserCreateResponse = z.infer<typeof userCreateSchemaResponse>;
export type UserRegister = z.infer<typeof UserRegisterSchema>;
