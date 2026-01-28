
import React, { useState, useMemo } from 'react';
import { Search, Plus, Pencil, Trash2, TrendingDown, Clock, CheckCircle, Undo2, Calendar, AlertTriangle } from 'lucide-react';
import { MOCK_TRANSACTIONS } from '../constants';
import { Transaction } from '../types';

interface PayablesProps {
  onNewPayable: () => void;
  onEditPayable: (transaction: Transaction) => void;
}

export const PayablesView: React.FC<PayablesProps> = ({ onNewPayable, onEditPayable }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'pending' | 'paid'>('pending');

  const handleLiquidation = (id: string) => {
    setTransactions(prev => prev.map(t => 
      t.id === id ? { ...t, status: 'paid' } : t
    ));
  };

  const handleUndoLiquidation = (id: string) => {
    setTransactions(prev => prev.map(t => 
      t.id === id ? { ...t, status: 'pending' } : t
    ));
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const isPayable = t.type === 'payable';
      const matchesStatus = t.status === activeTab;
      const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           t.category.toLowerCase().includes(searchTerm.toLowerCase());
      return isPayable && matchesStatus && matchesSearch;
    });
  }, [transactions, searchTerm, activeTab]);

  const totalPending = transactions
    .filter(t => t.type === 'payable' && t.status === 'pending')
    .reduce((acc, curr) => acc + curr.value, 0);

  const totalOverdue = transactions
    .filter(t => t.type === 'payable' && t.status === 'pending' && new Date(t.date) < new Date())
    .reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">Contas a Pagar</h1>
            <div className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Controle</div>
          </div>
          <p className="text-slate-500 text-sm font-medium">Gestão de obrigações e compromissos financeiros.</p>
        </div>
        
        <button 
          onClick={onNewPayable}
          className="flex items-center justify-center gap-3 bg-rose-600 hover:bg-rose-700 text-white px-8 py-4 rounded-[24px] font-black transition-all shadow-xl shadow-rose-900/10 active:scale-95"
        >
          <Plus size={20} />
          Novo Pagamento
        </button>
      </div>

      {/* Stats Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard label="Total Pendente" value={totalPending} icon={<Clock size={24} />} color="rose" trend="Evite atrasos" />
        <StatCard label="Vencido" value={totalOverdue} icon={<AlertTriangle size={24} />} color="amber" trend="Crítico" isAlert={totalOverdue > 0} />
        <div className="hidden lg:flex bg-[#0F172A] p-8 rounded-[40px] text-white flex-col justify-center relative overflow-hidden">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Dica de Gestão</p>
           <p className="text-sm font-bold leading-relaxed">Pague antecipado para ganhar descontos.</p>
           <CheckCircle size={80} className="absolute -right-4 -bottom-4 opacity-10" />
        </div>
      </div>

      {/* Filter & List Section */}
      <div className="space-y-6">
        <div className="bg-white p-4 md:p-5 rounded-[32px] border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
            <input 
              type="text" 
              placeholder="Pesquisar por fornecedor ou categoria..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-rose-100 focus:bg-white transition-all font-medium text-sm"
            />
          </div>
          <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-[22px] w-full md:w-auto">
            <button 
              onClick={() => setActiveTab('pending')}
              className={`flex-1 md:flex-none px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.1em] transition-all ${
                activeTab === 'pending' ? 'bg-white text-rose-600 shadow-lg' : 'text-slate-500'
              }`}
            >
              Pendentes
            </button>
            <button 
              onClick={() => setActiveTab('paid')}
              className={`flex-1 md:flex-none px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.1em] transition-all ${
                activeTab === 'paid' ? 'bg-white text-emerald-600 shadow-lg' : 'text-slate-500'
              }`}
            >
              Pagos
            </button>
          </div>
        </div>

        <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
          
          {/* Mobile View: Cards */}
          <div className="md:hidden divide-y divide-slate-50">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((t) => {
                const isOverdue = new Date(t.date) < new Date() && t.status === 'pending';
                return (
                  <div key={t.id} className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-2xl ${isOverdue ? 'bg-rose-50 text-rose-500' : 'bg-slate-100 text-slate-500'}`}>
                          <Calendar size={18} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Vencimento</p>
                          <p className={`text-sm font-black ${isOverdue ? 'text-rose-600' : 'text-slate-700'}`}>
                            {new Date(t.date).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                      <span className="bg-slate-100 text-slate-500 text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest">
                        {t.category}
                      </span>
                    </div>

                    <div>
                      <p className="font-bold text-slate-800 text-base">{t.description}</p>
                      {isOverdue && <span className="text-[9px] font-black text-rose-500 uppercase tracking-widest">Atrasado</span>}
                      <p className="text-xl font-black text-slate-800 mt-1">
                        {t.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      {t.status === 'pending' ? (
                        <button 
                          onClick={() => handleLiquidation(t.id)}
                          className="flex-1 bg-rose-600 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-rose-500/20"
                        >
                          Pagar Agora
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleUndoLiquidation(t.id)}
                          className="flex-1 bg-amber-50 text-amber-600 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest"
                        >
                          Estornar
                        </button>
                      )}
                      <button onClick={() => onEditPayable(t)} className="p-3 bg-slate-50 text-slate-400 rounded-xl"><Pencil size={18} /></button>
                      <button className="p-3 bg-slate-50 text-slate-400 rounded-xl"><Trash2 size={18} /></button>
                    </div>
                  </div>
                );
              })
            ) : (
              <EmptyState icon={<TrendingDown size={48} />} text="Tudo pago por enquanto" />
            )}
          </div>

          {/* Desktop View: Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                  <th className="px-10 py-6">Vencimento</th>
                  <th className="px-10 py-6">Favorecido</th>
                  <th className="px-10 py-6">Fluxo</th>
                  <th className="px-10 py-6">Valor</th>
                  <th className="px-10 py-6 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTransactions.map((t) => {
                  const isOverdue = new Date(t.date) < new Date() && t.status === 'pending';
                  return (
                    <tr key={t.id} className="hover:bg-slate-50/30 transition-all group">
                      <td className="px-10 py-7">
                        <div className="flex items-center gap-3">
                          <div className={`p-2.5 rounded-2xl transition-colors ${isOverdue ? 'bg-rose-50 text-rose-500' : 'bg-slate-100 text-slate-500'}`}>
                            <Calendar size={18} />
                          </div>
                          <span className={`text-sm font-black ${isOverdue ? 'text-rose-600' : 'text-slate-700'}`}>
                            {new Date(t.date).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      </td>
                      <td className="px-10 py-7">
                        <p className="font-bold text-slate-800 text-sm">{t.description}</p>
                      </td>
                      <td className="px-10 py-7">
                        <span className="bg-slate-100 text-slate-500 text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest">
                          {t.category}
                        </span>
                      </td>
                      <td className={`px-10 py-7 font-black ${isOverdue ? 'text-rose-700' : 'text-slate-800'}`}>
                        {t.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </td>
                      <td className="px-10 py-7 text-right">
                        <div className="flex items-center justify-end gap-3">
                          {t.status === 'pending' ? (
                            <button onClick={() => handleLiquidation(t.id)} className="bg-rose-600 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-rose-500/20">Pagar</button>
                          ) : (
                            <button onClick={() => handleUndoLiquidation(t.id)} className="p-3 bg-amber-50 text-amber-600 rounded-xl"><Undo2 size={18} /></button>
                          )}
                          <button onClick={() => onEditPayable(t)} className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-indigo-600 transition-colors"><Pencil size={18} /></button>
                          <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-rose-600 transition-colors"><Trash2 size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{label: string, value: number, icon: React.ReactNode, color: string, trend: string, isAlert?: boolean}> = ({ label, value, icon, color, trend, isAlert }) => (
  <div className={`bg-white p-6 md:p-8 rounded-[40px] border shadow-sm flex flex-col gap-6 group transition-all ${isAlert ? 'border-amber-200 bg-amber-50/30' : 'border-slate-100 hover:border-rose-100'}`}>
    <div className="flex items-center justify-between">
      <div className={`bg-${color}-50 text-${color}-600 p-4 rounded-3xl group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <span className={`text-[10px] font-black uppercase tracking-widest text-${color}-500`}>{trend}</span>
    </div>
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      <p className={`text-2xl md:text-3xl font-black ${isAlert ? 'text-amber-700' : 'text-slate-800'}`}>
        {value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </p>
    </div>
  </div>
);

const EmptyState: React.FC<{icon: React.ReactNode, text: string}> = ({ icon, text }) => (
  <div className="px-10 py-20 text-center flex flex-col items-center gap-4 opacity-20">
    {icon}
    <p className="font-black uppercase text-xs tracking-[0.3em]">{text}</p>
  </div>
);
