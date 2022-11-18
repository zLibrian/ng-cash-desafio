import { z } from 'zod';

const requiredError = 'required_error';
const invalidTypeError = 'invalid_type_error';

export const transactionBodySchema = z.object({
  username: z.string({
    [requiredError]: '"username" deve ser preenchido',
  }).min(3, { message: '"targetUsername" deve possuir ao menos 3 caracteres' }),
  targetUsername: z.string({
    [requiredError]: '"targetUsername" deve ser preenchido',
  }).min(3, { message: '"targetUsername" deve possuir ao menos 3 caracteres' }),
  accountId: z.number({
    [requiredError]: '"accountId" deve ser preenchido',
    [invalidTypeError]: '"accountId" deve ser um número',
  }).gte(1, { message: '"accountId" deve ser maior ou igual à 1' }),
  value: z.number({
    [requiredError]: '"value" deve ser preenchido',
    [invalidTypeError]: '"value" deve ser um número',
  }).gte(1, { message: '"value" deve ser maior ou igual à 1' }),
});

export const transactionResponseSchema = z.object({
  id: z.number(),
  value: z.number({
    [requiredError]: '"value" deve ser preenchido',
    [invalidTypeError]: '"value" deve ser um número',
  }).gte(1, { message: '"value" deve ser maior ou igual à 1' }),
  debitedAccountId: z.number({
    [requiredError]: '"debitedAccountId" deve ser preenchido',
    [invalidTypeError]: '"debitedAccountId" deve ser um número',
  }).gte(1, { message: '"debitedAccountId" deve ser maior ou igual à 1' }),
  creditedAccountId: z.number({
    [requiredError]: '"creditedAccountId" deve ser preenchido',
    [invalidTypeError]: '"creditedAccountId" deve ser um número',
  }).gte(1, { message: '"creditedAccountId" deve ser maior ou igual à 1' }),
  createdAt: z.date(),
});

export const getTransactionSchema = z.object({
  date: z.string().optional(),
  type: z.union([z.literal('cashIn'), z.literal('cashOut'), z.literal('all')]),
});

export type ITransactionBody = z.infer<typeof transactionBodySchema>;
export type ITransactionReponse = z.infer<typeof transactionResponseSchema>;

export type ITransactionType = z.infer<typeof getTransactionSchema>['type'];

export type IGetTransactionBody = z.infer<typeof getTransactionSchema>;

export type IGetTransaction = Pick<ITransactionBody, 'accountId' | 'username'> &
IGetTransactionBody;

export type IMakeTransactionBody = Pick<ITransactionBody, 'targetUsername' | 'value'>;

export type AccTransaction = Promise<Omit<ITransactionReponse, 'id'>>;
