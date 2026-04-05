import { useFinance } from '../context/FinanceContext';
import { motion } from 'motion/react';
import { Wallet, ArrowUpCircle, ArrowDownCircle, Target, ReceiptText } from 'lucide-react';

export default function Dashboard() {
  const { transactions, goal, currency } = useFinance();

  const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const balance = income - expenses;

  const cards = [
    { title: 'Balance', value: `${currency}${balance.toFixed(2)}`, icon: Wallet, color: 'text-blue-400' },
    { title: 'Income', value: `${currency}${income.toFixed(2)}`, icon: ArrowUpCircle, color: 'text-green-400' },
    { title: 'Expenses', value: `${currency}${expenses.toFixed(2)}`, icon: ArrowDownCircle, color: 'text-red-400' },
  ];

  const recentTransactions = transactions.slice(0, 3);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {cards.map((card, i) => (
          <motion.div key={i} whileHover={{ scale: 1.03 }} className="bg-gray-900 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-gray-800 shadow-xl">
            <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-full bg-gray-800 ${card.color}`}>
                    <card.icon size={18} className="sm:size-5" />
                </div>
                <p className="text-gray-400 text-xs sm:text-sm font-medium">{card.title}</p>
            </div>
            <p className="text-2xl sm:text-3xl font-extrabold tracking-tight">{card.value}</p>
          </motion.div>
        ))}
      </div>
      
      <motion.div whileHover={{ scale: 1.01 }} className="bg-gray-900 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-gray-800 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-4">
            <div className='flex items-center gap-2'>
                <Target className='text-blue-400 flex-shrink-0' size={18} className="sm:size-5" />
                <p className="text-gray-400 font-medium text-sm sm:text-base">Monthly Savings Goal</p>
            </div>
            <p className="font-bold text-blue-400 text-lg">{Math.round((goal.currentSavings / goal.targetAmount) * 100)}%</p>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-3 sm:h-4 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${Math.min((goal.currentSavings / goal.targetAmount) * 100, 100)}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="bg-gradient-to-r from-blue-600 to-blue-400 h-3 sm:h-4 rounded-full" 
          />
        </div>
        <p className="text-xs sm:text-sm mt-3 text-gray-400 font-medium">{currency}{goal.currentSavings} / {currency}{goal.targetAmount}</p>
      </motion.div>

      <div className="bg-gray-900 p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-gray-800 shadow-xl">
        <div className='flex items-center gap-2 mb-4'>
            <ReceiptText className='text-gray-400 flex-shrink-0' size={18} className="sm:size-5" />
            <h3 className="text-base sm:text-lg font-bold">Recent Transactions</h3>
        </div>
        <div className="space-y-2 sm:space-y-3">
            {recentTransactions.length > 0 ? recentTransactions.map(t => (
                <div key={t.id} className='flex justify-between items-center bg-gray-800 p-3 sm:p-4 rounded-lg sm:rounded-xl gap-2'>
                    <p className='font-medium text-sm sm:text-base truncate'>{t.note}</p>
                    <p className={`font-bold text-sm sm:text-base flex-shrink-0 ${t.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>{t.type === 'income' ? '+' : '-'}{currency}{t.amount}</p>
                </div>
            )) : <p className='text-gray-500 text-center text-sm'>No recent transactions</p>}
        </div>
      </div>
    </motion.div>
  );
}
