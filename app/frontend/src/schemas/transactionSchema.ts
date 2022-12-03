import * as yup from 'yup';

export const NewTransactionSchema = yup.object().shape({
  targetUsername: yup.string().min(3).required('Campo obrigatório'),
  amount: yup
    .number()
    .min(1, 'Valor deve ser maior que 0')
    .required('Campo obrigatório'),
});

export type NewTransactionValues = {
  targetUsername: string;
  amount: number;
};

export type Transaction = {
  id: string;
  contaCreditada: string;
  contaDebitada: string;
  valor: number;
  data: string;
};

export type GetTransactionsType = 'all' | 'cashIn' | 'cashOut';

export type GetTransactions = {
  type: GetTransactionsType;
  date?: string;
}