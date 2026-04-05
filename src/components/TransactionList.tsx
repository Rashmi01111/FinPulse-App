import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext';
import { Trash2, Plus, Search, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function TransactionList() {
  const { transactions, addTransaction, deleteTransaction } = useFinance();
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !note) return;
    addTransaction({
      id: Date.now().toString(),
      amount: parseFloat(amount),
      type,
      category: 'General',
      date: new Date().toISOString(),
      note,
    });
    setAmount('');
    setNote('');
  };

  const filteredTransactions = transactions.filter(t => 
    (filterType === 'all' || t.type === filterType) &&
    (t.note.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-4 sm:p-6 rounded-2xl border border-gray-800 shadow-lg space-y-3 sm:space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount (₹)" className="w-full p-3 rounded-lg sm:rounded-xl bg-gray-800 border border-gray-700 text-white text-sm" />
          <input type="text" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Note" className="w-full p-3 rounded-lg sm:rounded-xl bg-gray-800 border border-gray-700 text-white text-sm" />
        </div>
        <select value={type} onChange={(e) => setType(e.target.value as 'income' | 'expense')} className="w-full p-3 rounded-lg sm:rounded-xl bg-gray-800 border border-gray-700 text-white text-sm">
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg sm:rounded-xl font-bold flex justify-center items-center gap-2 transition-colors text-sm sm:text-base">
          <Plus size={18} className="sm:size-5" /> Add Transaction
        </button>
      </form>

      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 text-gray-500 flex-shrink-0" size={18} className="sm:size-5" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." className="w-full p-3 pl-10 rounded-lg sm:rounded-xl bg-gray-900 border border-gray-800 text-white text-sm" />
        </div>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value as any)} className="p-3 rounded-lg sm:rounded-xl bg-gray-900 border border-gray-800 text-white text-sm">
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
        </select>
      </div>

      <div className="space-y-2 sm:space-y-3">
        <AnimatePresence>
        {filteredTransactions.map((t) => (
          <motion.div key={t.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-gray-900 p-3 sm:p-4 rounded-lg sm:rounded-2xl border border-gray-800 flex justify-between items-center gap-2">
            <div className="min-w-0">
              <p className="font-bold text-sm sm:text-base truncate">{t.note}</p>
              <p className={`text-xs sm:text-sm ${t.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>{t.type.toUpperCase()} • ₹{t.amount}</p>
            </div>
            <button onClick={() => deleteTransaction(t.id)} className="text-gray-500 hover:text-red-500 transition-colors flex-shrink-0" title="Delete"><Trash2 size={18} className="sm:size-5" /></button>
          </motion.div>
        ))}
        </AnimatePresence>
        {filteredTransactions.length === 0 && <p className="text-center text-gray-500 py-8 sm:py-10 text-sm">No transactions found.</p>}
      </div>
    </div>
  );
}
