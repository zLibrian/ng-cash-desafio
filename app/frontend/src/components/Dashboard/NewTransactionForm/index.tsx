import { yupResolver } from '@hookform/resolvers/yup';
import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import closeIcon from '../../../assets/images/close.png';
import { useDashboard } from '../../../context/DashboardProvider';
import {
  NewTransactionSchema,
  NewTransactionValues,
} from '../../../schemas/transactionSchema';
import { Button } from '../../Button';
import { Input } from '../../Input';
import { TransactionFormProps } from './TransactionForm';

const NewTransactionForm = ({ setDate }: TransactionFormProps) => {
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
    <>
      <Dialog.Overlay forceMount className="bg-black/60 inset-0 fixed" />
      <Dialog.Content
        forceMount
        className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <Dialog.Close
          asChild
          className="absolute top-4 right-4 text-white cursor-pointer"
        >
          <Image src={closeIcon} alt="close" width={16} quality={50} />
        </Dialog.Close>
        <Dialog.Title className="text-white font-black text-3xl mb-8">
          Faça uma transferência
        </Dialog.Title>

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
      </Dialog.Content>
    </>
  );
};

export default NewTransactionForm;
