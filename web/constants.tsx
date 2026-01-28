
import React from 'react';
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  Wallet, 
  CalendarClock, 
  PieChart, 
  FileBarChart, 
  BrainCircuit,
  Utensils,
  House,
  Gamepad2,
  Briefcase,
  GraduationCap,
  ShoppingCart,
  HeartPulse,
  MoreHorizontal,
  Car,
  Lightbulb,
  Smartphone,
  Gift,
  Plane,
  Coins,
  TrendingUp,
  TrendingDown,
  UserCircle
} from 'lucide-react';
import { Transaction, BankAccount, CreditCard, Category } from './types';

export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} />, isPro: false },
  { id: 'transactions', label: 'Transações', icon: <ArrowLeftRight size={20} />, isPro: false },
  { id: 'accounts', label: 'Contas e Cartões', icon: <Wallet size={20} />, isPro: true },
  { id: 'payables', label: 'Contas a Pagar', icon: <TrendingDown size={20} />, isPro: true },
  { id: 'receivables', label: 'Contas a Receber', icon: <TrendingUp size={20} />, isPro: true },
  { id: 'flows', label: 'Fluxos Financeiros', icon: <PieChart size={20} />, isPro: true },
  { id: 'dre', label: 'Relatórios DRE', icon: <FileBarChart size={20} />, isPro: true },
  { id: 'ai', label: 'IA Insights', icon: <BrainCircuit size={20} />, isPro: true },
  { id: 'profile', label: 'Meu Perfil', icon: <UserCircle size={20} />, isPro: false },
] as const;

// Helper to map icon names to components
export const ICON_MAP: Record<string, any> = {
  Utensils, House, Gamepad2, Briefcase, GraduationCap, 
  HeartPulse, ShoppingCart, MoreHorizontal, Car, 
  Lightbulb, Smartphone, Gift, Plane, Coins
};

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Alimentação', icon: 'Utensils', color: 'bg-orange-500', type: 'expense' },
  { id: 'cat-2', name: 'Transporte', icon: 'Car', color: 'bg-blue-500', type: 'expense' },
  { id: 'cat-3', name: 'Moradia', icon: 'House', color: 'bg-rose-500', type: 'expense' },
  { id: 'cat-4', name: 'Lazer', icon: 'Gamepad2', color: 'bg-indigo-500', type: 'expense' },
  { id: 'cat-5', name: 'Saúde', icon: 'HeartPulse', color: 'bg-emerald-500', type: 'expense' },
  { id: 'cat-6', name: 'Educação', icon: 'GraduationCap', color: 'bg-purple-500', type: 'expense' },
  { id: 'cat-7', name: 'Mercado', icon: 'ShoppingCart', color: 'bg-cyan-500', type: 'expense' },
  { id: 'cat-8', name: 'Salário', icon: 'Briefcase', color: 'bg-emerald-500', type: 'income' },
  { id: 'cat-9', name: 'Investimentos', icon: 'Coins', color: 'bg-yellow-500', type: 'income' },
  { id: 'cat-10', name: 'Freelance', icon: 'Smartphone', color: 'bg-sky-500', type: 'income' },
  { id: 'cat-11', name: 'Outros (Desp)', icon: 'MoreHorizontal', color: 'bg-slate-500', type: 'expense' },
];

export const CATEGORIES = INITIAL_CATEGORIES;

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: '1', description: 'Salário Google', category: 'Salário', date: '2026-01-26', value: 8500.00, status: 'paid', type: 'income' },
  { id: '2', description: 'Restaurante Coco Bambu', category: 'Alimentação', date: '2026-01-26', value: 350.00, status: 'paid', type: 'expense' },
  { id: '3', description: 'Condomínio Edifício', category: 'Moradia', date: '2026-01-26', value: 850.00, status: 'pending', type: 'expense' },
  { id: '4', description: 'Freelance Design UI', category: 'Freelance', date: '2026-01-26', value: 2500.00, status: 'pending', type: 'income' },
  { id: '5', description: 'Assinatura Netflix', category: 'Lazer', date: '2026-01-26', value: 55.90, status: 'paid', type: 'expense' },
  // Receivables (A Receber)
  { id: 'rec-1', description: 'Venda de Notebook', category: 'Vendas', date: '2026-02-05', value: 3200.00, status: 'pending', type: 'receivable' },
  { id: 'rec-2', description: 'Reembolso Viagem', category: 'Trabalho', date: '2026-02-10', value: 450.00, status: 'pending', type: 'receivable' },
  { id: 'rec-3', description: 'Dividendos Mensais', category: 'Investimentos', date: '2026-02-15', value: 125.50, status: 'pending', type: 'receivable' },
  // Payables (A Pagar)
  { id: 'pay-1', description: 'Aluguel Apartamento', category: 'Moradia', date: '2026-02-01', value: 2500.00, status: 'pending', type: 'payable' },
  { id: 'pay-2', description: 'Energia Elétrica', category: 'Moradia', date: '2026-02-05', value: 180.00, status: 'pending', type: 'payable' },
  { id: 'pay-3', description: 'Plano de Saúde', category: 'Saúde', date: '2026-02-12', value: 650.00, status: 'pending', type: 'payable' },
];

export const MOCK_ACCOUNTS: BankAccount[] = [
  { id: 'acc-1', name: 'Nubank Principal', type: 'CONTA CORRENTE', balance: 3200.00, icon: 'wallet' },
  { id: 'acc-2', name: 'Reserva Itaú', type: 'INVESTIMENTO', balance: 15400.00, icon: 'piggy' },
  { id: 'acc-3', name: 'XP Investimentos', type: 'INVESTIMENTO', balance: 50000.00, icon: 'trending' },
];

export const MOCK_CARDS: CreditCard[] = [
  { id: 'card-1', name: 'Inter Black', closingDate: 10, currentBill: 2450.00, limit: 10000.00 },
];
