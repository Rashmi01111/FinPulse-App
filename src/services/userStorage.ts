import { Transaction, Goal } from '../types';

const STORAGE_KEY = 'finance_data';
const USER_STORAGE_KEY = 'finance_user_data';

// User-specific data storage
export const saveUserData = (userId: string, data: { transactions: Transaction[]; goal: Goal; currency: string }) => {
  const allUserData = JSON.parse(localStorage.getItem(USER_STORAGE_KEY) || '{}');
  allUserData[userId] = data;
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(allUserData));
};

export const loadUserData = (userId: string): { transactions: Transaction[]; goal: Goal; currency: string } => {
  const allUserData = JSON.parse(localStorage.getItem(USER_STORAGE_KEY) || '{}');
  return allUserData[userId] || { 
    transactions: [], 
    goal: { targetAmount: 10000, currentSavings: 0 }, 
    currency: '₹' 
  };
};

// Legacy storage functions (for backward compatibility)
export const saveData = (data: { transactions: Transaction[]; goal: Goal; currency: string; profile: { name: string; email: string } }) => {
  // This is now handled by saveUserData with user ID
  console.warn('saveData is deprecated, use saveUserData instead');
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const loadData = (): { transactions: Transaction[]; goal: Goal; currency: string; profile: { name: string; email: string } } => {
  // This is now handled by loadUserData with user ID
  console.warn('loadData is deprecated, use loadUserData instead');
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : { 
    transactions: [], 
    goal: { targetAmount: 10000, currentSavings: 0 }, 
    currency: '₹', 
    profile: { name: 'User', email: 'user@example.com' } 
  };
};

// Clear user data when logging out
export const clearUserData = (userId: string) => {
  const allUserData = JSON.parse(localStorage.getItem(USER_STORAGE_KEY) || '{}');
  delete allUserData[userId];
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(allUserData));
};
