import { useFinance } from '../context/FinanceContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { motion } from 'motion/react';

export default function Insights() {
  const { transactions } = useFinance();
  const expenses = transactions.filter(t => t.type === 'expense');
  
  const data = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(data).map(([name, value]) => ({ name, value }));
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-gray-900 p-4 sm:p-6 rounded-2xl border border-gray-800 shadow-lg">
      <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">Spending by Category</h2>
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={200} className="sm:h-80">
            <PieChart>
            <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={window.innerWidth < 640 ? 60 : 100} label={{ fill: '#9CA3AF', fontSize: window.innerWidth < 640 ? 10 : 12 }}>
                {chartData.map((_, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#fff', fontSize: window.innerWidth < 640 ? 12 : 14 }} />
            <Legend />
            </PieChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center text-gray-500 py-8 sm:py-10 text-sm">No expense data to visualize.</p>
      )}
    </motion.div>
  );
}
