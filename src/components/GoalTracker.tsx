import { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { motion } from 'motion/react';

export default function GoalTracker() {
  const { goal, updateGoal } = useFinance();
  const [target, setTarget] = useState(goal.targetAmount.toString());
  const [savings, setSavings] = useState(goal.currentSavings.toString());

  const handleUpdate = () => {
    updateGoal({ targetAmount: parseFloat(target), currentSavings: parseFloat(savings) });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-900 p-4 sm:p-6 rounded-2xl border border-gray-800 shadow-lg space-y-4 sm:space-y-6 max-w-lg">
      <h2 className="text-lg sm:text-xl font-bold">Set Monthly Goal</h2>
      <div className='space-y-2'>
        <label className='text-xs sm:text-sm text-gray-400'>Target Amount (₹)</label>
        <input type="number" value={target} onChange={(e) => setTarget(e.target.value)} className="w-full p-3 rounded-lg sm:rounded-xl bg-gray-800 border border-gray-700 text-white text-sm" />
      </div>
      <div className='space-y-2'>
        <label className='text-xs sm:text-sm text-gray-400'>Current Savings (₹)</label>
        <input type="number" value={savings} onChange={(e) => setSavings(e.target.value)} className="w-full p-3 rounded-lg sm:rounded-xl bg-gray-800 border border-gray-700 text-white text-sm" />
      </div>
      <button onClick={handleUpdate} className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg sm:rounded-xl font-bold transition-colors text-sm sm:text-base">Update Goal</button>
    </motion.div>
  );
}
