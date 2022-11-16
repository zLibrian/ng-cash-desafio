import { z } from 'zod';

const requiredError = 'required_error';
const REGEX_PASSWORD = /((?=.*\d)(?=.*[A-Z])(?=.*\W).{8,})/gm;

export const userSchema = z.object({
  id: z.number().int(),
  username: z.string({ [requiredError]: 'Username deve ser preenchido' })
    .min(3, { message: 'Username deve possuir ao menos 3 caracteres' }),
  password: z.string().min(8, { message: 'Password deve possuir ao menos 8 caracteres' })
    .regex(
      REGEX_PASSWORD,
      { message: 'Password deve possuir ao menos 1 letra maiúscula e 1 número' },
    ),
  accountId: z.number({ [requiredError]: 'AccountId deve ser preenchido' })
    .int({ message: 'AccountId deve ser um número inteiro' }),
});

export const userCreateSchema = userSchema.omit({ id: true });
export const userCreateSchemaResponse = userSchema.omit({ password: true });
export const UserRegisterSchema = userCreateSchema.omit({ accountId: true });
export const getUserBalanceSchema = userCreateSchema.omit({ password: true });

export type User = z.infer<typeof userSchema>;
export type UserCreate = z.infer<typeof userCreateSchema>;
export type UserCreateResponse = z.infer<typeof userCreateSchemaResponse>;
export type UserRegister = z.infer<typeof UserRegisterSchema>;
export type GetUserBalance = z.infer<typeof getUserBalanceSchema>;
