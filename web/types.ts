
export type TransactionStatus = 'paid' | 'pending';
export type TransactionType = 'income' | 'expense' | 'receivable' | 'payable';

export interface Transaction {
  id: string;
  description: string;
  category: string;
  date: string;
  value: number;
  status: TransactionStatus;
  type: TransactionType;
}

export interface Category {
  id: string;
  name: string;
  icon: string; // Icon name string for dynamic rendering
  color: string;
  type: 'income' | 'expense';
}

export interface BankAccount {
  id: string;
  name: string;
  type: string;
  balance: number;
  icon: string;
}

export interface CreditCard {
  id: string;
  name: string;
  closingDate: number;
  currentBill: number;
  limit: number;
}

export type ViewType = 'dashboard' | 'transactions' | 'accounts' | 'payables' | 'receivables' | 'flows' | 'dre' | 'ai' | 'subscription' | 'profile';
