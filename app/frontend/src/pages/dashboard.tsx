import * as Dialog from '@radix-ui/react-dialog';
import { NextPageContext } from 'next';
import nookies from 'nookies';
import { useEffect, useState } from 'react';

import { useDashboard } from '../context/DashboardProvider';
import { GetTransactionsType } from '../schemas/transactionSchema';

import { Button } from '../components/Button';
import DashboardHeader from '../components/Dashboard/DashboardHeader';
import NewTransactionForm from '../components/Dashboard/NewTransactionForm';
import TransactionTable from '../components/Dashboard/TransactionTable';

type DashboardProps = {
  username: string;
  token: string;
};

const Dashboard = (props: DashboardProps) => {
  const { balance, getBalance, getTransactions, transactions } = useDashboard();

  const [type, setType] = useState<GetTransactionsType>('all');
  const [openModal, setOpenModal] = useState(false);

  const [date, setDate] = useState('');

  useEffect(() => {
    const fetchBalance = async () => {
      await getBalance();
    };
    fetchBalance();
  }, [getBalance]);

  useEffect(() => {
    const fetchTransactions = async () => {
      await getTransactions({ type, date });
    };
    fetchTransactions();
  }, [type, date, getTransactions]);

  return (
    <Dialog.Root open={openModal} onOpenChange={setOpenModal}>
      <Dialog.Dialog>
        <div className="w-full bg-black h-screen ">
          <DashboardHeader username={props.username} balance={balance} />

          <main className=" w-screen h-screen bg-[#f0f2f5] ">
            <div className="w-full max-w-[1124px] mx-auto pt-12 ">
              {date}
              <div className="flex justify-center gap-8 items-centertext-black bg-purple-700 rounded-lg">
                <input
                  className=" text-white p-4 w-1/6 text-lg bg-inherit  hover:brightness-150  font-bold transition duration-300"
                  type={'date'}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />

                <Button
                  text="Todas"
                  onClick={() => setType('all')}
                  className="w-1/6 self-stretch hover:brightness-150"
                />
                <Button
                  text="Entradas"
                  onClick={() => setType('cashIn')}
                  className="w-1/6 self-stretch hover:brightness-150"
                />

                <Button
                  text="Saidas"
                  onClick={() => setType('cashOut')}
                  className="w-1/6 self-stretch hover:brightness-150"
                />

                <Button
                  text="Sem filtros"
                  onClick={() => {
                    setType('all'), setDate('');
                  }}
                  className="w-1/6 self-stretch hover:brightness-150"
                />
              </div>
              <TransactionTable
                transactions={transactions}
                username={props.username}
              />

              <Dialog.Portal>
                <NewTransactionForm setDate={setDate} />
              </Dialog.Portal>
            </div>
          </main>
        </div>
      </Dialog.Dialog>
    </Dialog.Root>
  );
};

export const getServerSideProps = async (context: NextPageContext) => {
  const { token, username } = nookies.get(context);
  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: { token, username },
  };
};

export default Dashboard;
