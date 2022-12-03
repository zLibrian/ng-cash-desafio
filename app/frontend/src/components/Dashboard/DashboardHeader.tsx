import * as Dialog from '@radix-ui/react-dialog';
import { useDashboard } from '../../context/DashboardProvider';

type DashboardHeaderProps = {
  username: string;
  balance: number;
};

const DashboardHeader = (props: DashboardHeaderProps) => {
  const { handleLogout } = useDashboard();
  return (
    <header className="p-20">
      <div className="flex justify-between items-center max-w-[1124px] mx-auto py-4 px-5 text-white">
        <div className="flex items-center gap-24 ">
          <span>Olá, {props.username}</span>
          <span> Saldo atual: R$ {props.balance}</span>
        </div>
        <div className="flex items-center gap-4">
          <Dialog.Trigger className="bg-[#f0f2f5] text-black rounded-full p-4 text-lg hover:bg-purple-700 hover:text-white transition duration-300">
            Nova transação
          </Dialog.Trigger>

          <button
            onClick={handleLogout}
            className="text-white text-lg hover:text-purple-700"
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
