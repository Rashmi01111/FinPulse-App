export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string;
  note: string;
}

export interface Goal {
  targetAmount: number;
  currentSavings: number;
}
