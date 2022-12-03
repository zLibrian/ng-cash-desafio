import Router from 'next/router';
import nookies from 'nookies';
import { createContext, useCallback, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import {
  GetTransactions,
  NewTransactionValues,
  Transaction,
} from '../schemas/transactionSchema';
import api from '../services/api';
('nookies');

type dashboardContextValue = {
  username: string;
  balance: number;
  transactions: Transaction[];
  setUsername: (token: string) => void;
  getBalance: () => Promise<void>;
  getTransactions: (data: GetTransactions) => Promise<void>;
  handleMakeTransaction: ({
    targetUsername,
    amount,
  }: NewTransactionValues) => Promise<void>;
  handleLogout: () => void;
};

type DashboardProviderProps = {
  children: React.ReactNode;
};

const dashboardContext = createContext({} as dashboardContextValue);

const useDashboard = () => useContext(dashboardContext);

const DashboardProvider = ({ children }: DashboardProviderProps) => {
  const [username, setUsername] = useState('');
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleLogout = useCallback(() => {
    nookies.destroy(null, 'token');
    nookies.destroy(null, 'username');
    Router.push('/login');
  }, []);

  const handleMakeTransaction = async ({
    targetUsername,
    amount,
  }: NewTransactionValues) => {
    const { token } = nookies.get();
    await api
      .post(
        '/user/transaction',
        { targetUsername, value: amount },
        { headers: { Authorization: token } }
      )
      .then(async () => {
        await getTransactions({ type: 'all', date: '' });
        await getBalance();
      })
      .catch((error) => {
        console.log(error);
        toast.error('Usuário não encontrado');
      });
  };

  const getTransactions = useCallback(
    async ({ type, date }: GetTransactions) => {
      const { token } = nookies.get();
      const { data: responseData } = await api.post(
        '/user/transactions',
        { type, date },
        { headers: { Authorization: `${token}` } }
      );
      setTransactions(responseData);
    },
    []
  );

  const getBalance = useCallback(async () => {
    const { token } = nookies.get();
    const { data } = await api.get('/user/balance', {
      headers: { Authorization: `${token}` },
    });
    setBalance(data.balance);
  }, []);

  const contextValue = {
    username,
    balance,
    transactions,
    setUsername,
    getBalance,
    getTransactions,
    handleMakeTransaction,
    handleLogout,
  };

  return (
    <dashboardContext.Provider value={contextValue}>
      {children}
    </dashboardContext.Provider>
  );
};

export { useDashboard, DashboardProvider };
