import { Transaction } from '../../schemas/transactionSchema';

type TransactionTableProps = {
  transactions: Transaction[];
  username: string;
};

const TransactionTableBase = ({
  transactions,
  username,
}: TransactionTableProps) => {
  return (
    <table className="w-full border-separate border-spacing-y-4 table-fixed mt-4">
      <thead>
        <tr className="text-black/70 font-light text-left">
          {['De', 'Para', 'Valor', 'Data'].map((item) => (
            <th key={item} className="py-4 px-8 text-centerleading-relaxed">
              {item}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction.id} className="bg-[#ffffff] text-black">
            <td className="py-4 px-6">{transaction.contaDebitada}</td>
            <td className="py-4 px-6">{transaction.contaCreditada}</td>
            <td
              className={
                username === transaction.contaDebitada
                  ? 'text-red-600 py-4 px-6'
                  : 'text-green-600 py-4 px-6'
              }
            >
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(transaction.valor)}
            </td>

            <td className="py-4 px-6">{transaction.data}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const TransactionTable = TransactionTableBase;
export default TransactionTable;
