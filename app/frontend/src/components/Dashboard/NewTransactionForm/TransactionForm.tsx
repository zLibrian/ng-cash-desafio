import { yupResolver } from '@hookform/resolvers/yup';

import { Dispatch, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDashboard } from '../../../context/DashboardProvider';
import {
  NewTransactionSchema,
  NewTransactionValues,
} from '../../../schemas/transactionSchema';
import { Button } from '../../Button';
import { Input } from '../../Input';

export type TransactionFormProps = {
  setDate: Dispatch<string>;
};

const TransactionForm = ({ setDate }: TransactionFormProps) => {
  const { handleMakeTransaction, balance } = useDashboard();
  const [amount, setAmount] = useState(1);

  const { register, handleSubmit, formState } = useForm<NewTransactionValues>({
    mode: 'onChange',
    resolver: yupResolver(NewTransactionSchema),
  });
  const { errors } = formState;

  const makeTransaction = async (formData: NewTransactionValues) => {
    await handleMakeTransaction(formData);
    setDate('');
  };
  return (
    <form
      onSubmit={handleSubmit(makeTransaction)}
      className="mt-8 flex flex-col gap-6"
    >
      <div className="flex flex-col gap-1">
        <Input
          {...register('targetUsername')}
          label="Nome de usuário:"
          placeholder="Digite o nome de usuário"
          error={errors.targetUsername}
        />

        <Input
          {...register('amount')}
          label="Valor a ser transferido:"
          type="number"
          error={errors.amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          value={amount}
        />
      </div>

      <Button
        text="Transferir"
        type="submit"
        disabled={!formState.isValid || amount > balance}
      />
    </form>
  );
};

export default TransactionForm;
