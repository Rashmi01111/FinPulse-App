import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Transaction, Goal } from '../types';
import { loadData, saveData } from '../services/storage';
import { loadUserData, saveUserData } from '../services/userStorage';
import { useAuth } from './AuthContext';

interface FinanceContextType {
  transactions: Transaction[];
  goal: Goal;
  currency: string;
  setCurrency: (c: string) => void;
  profile: { name: string; email: string };
  setProfile: (p: { name: string; email: string }) => void;
  addTransaction: (t: Transaction) => void;
  deleteTransaction: (id: string) => void;
  updateGoal: (g: Goal) => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export const FinanceProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [goal, setGoal] = useState<Goal>({ targetAmount: 10000, currentSavings: 0 });
  const [currency, setCurrency] = useState('₹');
  const [profile, setProfile] = useState({ name: 'User', email: 'user@example.com' });

  useEffect(() => {
    if (user) {
      const data = loadUserData(user.id);
      setTransactions(data.transactions);
      setGoal(data.goal);
      setCurrency(data.currency);
      setProfile({ name: user.name, email: user.email });
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      saveUserData(user.id, { transactions, goal, currency });
    }
  }, [transactions, goal, currency, user]);

  const addTransaction = (t: Transaction) => setTransactions((prev) => [t, ...prev]);
  const deleteTransaction = (id: string) => setTransactions((prev) => prev.filter((t) => t.id !== id));
  const updateGoal = (g: Goal) => setGoal(g);

  return (
    <FinanceContext.Provider value={{ transactions, goal, currency, setCurrency, profile, setProfile, addTransaction, deleteTransaction, updateGoal }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) throw new Error('useFinance must be used within FinanceProvider');
  return context;
};
