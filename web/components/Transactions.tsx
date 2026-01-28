
import React, { useState } from 'react';
import { Search, Pencil, Trash2, Plus, ArrowUpRight, ArrowDownLeft, Filter } from 'lucide-react';
import { MOCK_TRANSACTIONS } from '../constants';
import { Transaction } from '../types';

interface TransactionsProps {
  onNewTransaction: () => void;
  onEditTransaction: (transaction: Transaction) => void;
}

export const TransactionsView: React.FC<TransactionsProps> = ({ onNewTransaction, onEditTransaction }) => {
  const [transactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">Transações</h1>
          <p className="text-slate-500 text-sm">Visualize e gerencie todos os seus lançamentos.</p>
        </div>
        <button 
          onClick={onNewTransaction}
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-4 rounded-[22px] font-black transition-all shadow-xl shadow-indigo-600/20 active:scale-95"
        >
          <Plus size={20} />
          Novo Lançamento
        </button>
      </div>

      {/* Filters Area */}
      <div className="bg-white p-4 md:p-5 rounded-[32px] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
          <input 
            type="text" 
            placeholder="Buscar descrição ou categoria..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-6 py-3.5 bg-slate-50 border border-slate-100 rounded-[20px] focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:bg-white transition-all text-sm font-medium"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-3.5 bg-slate-50 text-slate-500 rounded-[20px] font-bold text-sm hover:bg-slate-100 transition-colors w-full md:w-auto justify-center border border-slate-100">
          <Filter size={18} />
          Filtros
        </button>
      </div>

      {/* Transactions Container */}
      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
        
        {/* Mobile List View (Hidden on Desktop) */}
        <div className="block md:hidden">
          <div className="grid grid-cols-[48px_1fr_auto] px-4 py-4 bg-slate-50/50 border-b border-slate-100">
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ST</span>
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Descrição</span>
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Ações</span>
          </div>
          <div className="divide-y divide-slate-50">
            {transactions.map((t) => (
              <div key={t.id} className="flex items-center px-4 py-4 active:bg-slate-50 transition-colors gap-3">
                {/* Status Icon */}
                <div className="shrink-0">
                   <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      t.type === 'income' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                    }`}>
                      {t.type === 'income' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                    </div>
                </div>

                {/* Description & Status Badge */}
                <div className="flex-1 min-w-0">
                  <p className="font-black text-slate-800 text-sm leading-tight truncate">{t.description}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    {t.status === 'pending' ? (
                      <span className="bg-amber-100 text-amber-700 text-[8px] font-black px-1.5 py-0.5 rounded-md uppercase tracking-tighter">Pendente</span>
                    ) : (
                      <span className="text-[9px] font-bold text-slate-400">{new Date(t.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })}</span>
                    )}
                    <span className={`text-[10px] font-black ${t.type === 'income' ? 'text-emerald-600' : 'text-slate-500'}`}>
                      {t.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                  </div>
                </div>

                {/* Category & Actions */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                   <span className="bg-slate-100 text-slate-500 text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-widest inline-block whitespace-nowrap">
                      {t.category}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button 
                        onClick={() => onEditTransaction(t)}
                        className="p-2 text-slate-400 bg-slate-50 border border-slate-100 rounded-lg active:scale-90 active:bg-indigo-50 active:text-indigo-600"
                      >
                        <Pencil size={14} />
                      </button>
                      <button 
                        className="p-2 text-slate-400 bg-slate-50 border border-slate-100 rounded-lg active:scale-90 active:bg-rose-50 active:text-rose-600"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Table View (Hidden on Mobile) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <th className="px-8 py-6">Status</th>
                <th className="px-8 py-6">Descrição</th>
                <th className="px-8 py-6">Categoria</th>
                <th className="px-8 py-6">Data</th>
                <th className="px-8 py-6 text-emerald-600">Valor</th>
                <th className="px-8 py-6 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className={`w-11 h-11 rounded-[16px] flex items-center justify-center ${
                      t.type === 'income' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                    }`}>
                      {t.type === 'income' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <p className="font-black text-slate-800 text-sm">{t.description}</p>
                    {t.status === 'pending' && (
                      <span className="bg-amber-100 text-amber-700 text-[8px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest mt-1 inline-block">Pendente</span>
                    )}
                  </td>
                  <td className="px-8 py-5">
                    <span className="bg-slate-100 text-slate-500 text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">
                      {t.category}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-sm font-bold text-slate-400">{new Date(t.date).toLocaleDateString('pt-BR')}</td>
                  <td className={`px-8 py-5 text-sm font-black ${t.type === 'income' ? 'text-emerald-600' : 'text-slate-800'}`}>
                    {t.type === 'income' ? '+ ' : '- '}
                    {t.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => onEditTransaction(t)}
                        className="p-2.5 text-slate-400 bg-slate-50 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-100 rounded-xl transition-all active:scale-90"
                        title="Editar"
                      >
                        <Pencil size={16} />
                      </button>
                      <button 
                        className="p-2.5 text-slate-400 bg-slate-50 hover:text-rose-600 hover:bg-rose-50 border border-slate-100 rounded-xl transition-all active:scale-90"
                        title="Excluir"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
