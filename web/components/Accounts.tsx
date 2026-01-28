
import React from 'react';
import { Plus, Wallet, CreditCard as CardIcon, Pencil, Trash2, PiggyBank, TrendingUp, Building2 } from 'lucide-react';
import { MOCK_ACCOUNTS, MOCK_CARDS } from '../constants';
import { BankAccount, CreditCard } from '../types';

interface AccountsViewProps {
  onNewAccount: () => void;
  onEditAccount: (account: BankAccount | CreditCard) => void;
}

export const AccountsView: React.FC<AccountsViewProps> = ({ onNewAccount, onEditAccount }) => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Contas e Cartões</h1>
          <p className="text-slate-500">Gerencie suas contas bancárias e cartões de crédito.</p>
        </div>
        <button 
          onClick={onNewAccount}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-600/20"
        >
          <Plus size={20} />
          Nova Conta/Cartão
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Bank Accounts Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-700 flex items-center gap-2">
              <Wallet size={20} className="text-indigo-500" />
              Minhas Contas
            </h2>
            <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">{MOCK_ACCOUNTS.length} Contas</span>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {MOCK_ACCOUNTS.map((acc) => (
              <div key={acc.id} className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:border-indigo-100 transition-all group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-slate-50 p-4 rounded-2xl text-indigo-600">
                      {acc.type.includes('INVESTIMENTO') ? <TrendingUp size={24} /> : <Building2 size={24} />}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{acc.name}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{acc.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-slate-800">
                      {acc.balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </p>
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <button 
                        onClick={() => onEditAccount(acc)}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                      >
                        <Pencil size={18} />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Credit Cards Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-700 flex items-center gap-2">
              <CardIcon size={20} className="text-purple-500" />
              Meus Cartões
            </h2>
            <span className="text-xs font-medium text-slate-400 uppercase tracking-widest">{MOCK_CARDS.length} Cartão</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {MOCK_CARDS.map((card) => (
              <div key={card.id} className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-[32px] text-white shadow-xl relative overflow-hidden group">
                <div className="relative z-10 flex flex-col h-full justify-between gap-8">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Cartão de Crédito</p>
                      <h3 className="text-xl font-bold">{card.name}</h3>
                    </div>
                    <div className="bg-white/10 p-2 rounded-xl backdrop-blur-md">
                      <CardIcon size={24} />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Fatura Atual</p>
                      <p className="text-xl font-black">
                        {card.currentBill.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Limite Disponível</p>
                      <p className="text-xl font-bold text-indigo-300">
                        {(card.limit - card.currentBill).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-tighter">
                    <p className="text-slate-400">Vencimento: Dia {card.closingDate}</p>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => onEditAccount(card)}
                        className="text-slate-400 hover:text-white transition-colors"
                      >
                        Editar
                      </button>
                      <button className="text-slate-400 hover:text-rose-400 transition-colors">Excluir</button>
                    </div>
                  </div>
                </div>
                
                {/* Decoration */}
                <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-[-10%] left-[-5%] w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
