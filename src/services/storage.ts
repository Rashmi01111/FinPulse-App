import { Transaction, Goal } from '../types';

const STORAGE_KEY = 'finance_data';

export const saveData = (data: { transactions: Transaction[]; goal: Goal; currency: string; profile: { name: string; email: string } }) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const loadData = (): { transactions: Transaction[]; goal: Goal; currency: string; profile: { name: string; email: string } } => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : { transactions: [], goal: { targetAmount: 10000, currentSavings: 0 }, currency: '₹', profile: { name: 'User', email: 'user@example.com' } };
};
