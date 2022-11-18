import { Transaction } from 'sequelize';
import { z } from 'zod';

const requiredError = 'required_error';

const accountSchema = z.object({
  creditedAccountId: z.number().int().min(1),
  debitedAccountId: z.number().int().min(1),
  value: z.number().positive().min(1),
});

const createAccountTransactionSchema = z.object({
  accountId:
    z.number({ [requiredError]: '"accountId" deve ser preenchido' })
      .int().min(1),
  targetId:
    z.number({
      [requiredError]: '"targetId" deve ser preenchido',
    }).int().min(1),
  value:
    z.number({
      [requiredError]: '"value" deve ser preenchido',
    }).positive().min(1),
});

export type IAccountTransaction = z.infer<typeof createAccountTransactionSchema>;

export type IAccountCreateTransaction = {
  t: Transaction
} & z.infer<typeof accountSchema>;
