
import React, { useState } from 'react';
import { X, ArrowDownLeft, ArrowUpRight, ChevronRight, ChevronLeft, ReceiptText, CalendarDays } from 'lucide-react';
import { TransactionType, Transaction } from '../types';
import { CATEGORIES, MOCK_ACCOUNTS } from '../constants';

interface TransactionModalProps {
  onClose: () => void;
  onConfirm: (data: any) => void;
  initialData?: Transaction | null;
}

export const TransactionModal: React.FC<TransactionModalProps> = ({ onClose, onConfirm, initialData }) => {
  const [step, setStep] = useState(initialData ? 2 : 1);
  const [type, setType] = useState<TransactionType | null>(initialData?.type || null);
  const [description, setDescription] = useState(initialData?.description || '');
  const [value, setValue] = useState(initialData?.value?.toString().replace('.', ',') || '0,00');
  const [date, setDate] = useState(initialData?.date || new Date().toISOString().split('T')[0]);
  const [category, setCategory] = useState(initialData?.category || '');

  const handleTypeSelect = (selectedType: TransactionType) => {
    setType(selectedType);
    setStep(2);
  };

  const getTitle = () => {
    if (initialData) return 'Editar Lançamento';
    if (step === 1) return 'Novo Lançamento';
    const names: Record<string, string> = {
      income: 'Receita Recebida',
      expense: 'Despesa Paga',
      receivable: 'Conta a Receber',
      payable: 'Conta a Pagar'
    };
    return names[type as string] || 'Novo Lançamento';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300 overflow-y-auto">
      <div className="bg-white w-full max-w-xl rounded-[32px] md:rounded-[48px] shadow-2xl relative p-6 md:p-12 animate-in zoom-in-95 duration-300 my-auto">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 md:right-8 md:top-8 p-2 md:p-3 bg-slate-50 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all active:scale-90"
        >
          <X size={18} />
        </button>

        <div className="mb-6 md:mb-10 pr-8">
          <h2 className="text-xl md:text-3xl font-black text-slate-800 tracking-tight leading-tight">
            {getTitle()}
          </h2>
          <p className="text-slate-400 text-[9px] md:text-sm font-bold uppercase tracking-widest mt-1">Passo {step} de 2</p>
        </div>

        {step === 1 ? (
          <div className="space-y-6 md:space-y-10">
            <h3 className="text-center font-black text-slate-500 text-[10px] md:text-sm uppercase tracking-[0.2em]">Qual o fluxo desse dinheiro?</h3>
            <div className="grid grid-cols-2 gap-3 md:gap-6">
              <TypeButton 
                label="Receita" 
                color="text-emerald-600" 
                bgColor="bg-emerald-50/50" 
                iconBg="bg-emerald-500" 
                icon={<ArrowDownLeft className="w-6 h-6 md:w-8 md:h-8" />} 
                onClick={() => handleTypeSelect('income')}
              />
              <TypeButton 
                label="Despesa" 
                color="text-rose-600" 
                bgColor="bg-rose-50/50" 
                iconBg="bg-rose-500" 
                icon={<ArrowUpRight className="w-6 h-6 md:w-8 md:h-8" />} 
                onClick={() => handleTypeSelect('expense')}
              />
              <TypeButton 
                label="A Receber" 
                color="text-indigo-600" 
                bgColor="bg-indigo-50/50" 
                iconBg="bg-indigo-500" 
                icon={<ReceiptText className="w-6 h-6 md:w-8 md:h-8" />} 
                onClick={() => handleTypeSelect('receivable')}
              />
              <TypeButton 
                label="A Pagar" 
                color="text-amber-600" 
                bgColor="bg-amber-50/50" 
                iconBg="bg-amber-500" 
                icon={<CalendarDays className="w-6 h-6 md:w-8 md:h-8" />} 
                onClick={() => handleTypeSelect('payable')}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4 md:space-y-8 animate-in slide-in-from-right-4 duration-300">
             <div className="space-y-4 md:space-y-6">
                <div>
                  <label className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 md:mb-3 block ml-1">Descrição</label>
                  <input 
                    type="text" 
                    placeholder="Ex: Consultoria, Aluguel..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-5 py-3.5 md:px-6 md:py-5 rounded-2xl md:rounded-3xl border border-slate-100 bg-slate-50/50 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:bg-white transition-all font-bold text-slate-700 placeholder:font-medium placeholder:text-slate-300 text-sm md:text-base"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                   <div>
                      <label className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 md:mb-3 block ml-1">Valor (R$)</label>
                      <div className="relative">
                        <span className="absolute left-5 md:left-6 top-1/2 -translate-y-1/2 font-black text-slate-400 text-sm md:text-base">R$</span>
                        <input 
                          type="text" 
                          value={value}
                          onChange={(e) => setValue(e.target.value)}
                          className="w-full pl-12 pr-5 md:pl-14 md:pr-6 py-3.5 md:py-5 rounded-2xl md:rounded-3xl border border-slate-100 bg-slate-50/50 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:bg-white transition-all font-black text-lg md:text-xl text-slate-800"
                        />
                      </div>
                   </div>
                   <div>
                      <label className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 md:mb-3 block ml-1">Data</label>
                      <input 
                        type="date" 
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-5 py-3.5 md:px-6 md:py-5 rounded-2xl md:rounded-3xl border border-slate-100 bg-slate-50/50 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:bg-white transition-all text-sm font-bold text-slate-700"
                      />
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                   <div>
                      <label className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 md:mb-3 block ml-1">Categoria</label>
                      <select 
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-5 py-3.5 md:px-6 md:py-5 rounded-2xl md:rounded-3xl border border-slate-100 bg-slate-50/50 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:bg-white transition-all text-sm font-bold text-slate-700 appearance-none cursor-pointer"
                      >
                        <option value="">Selecione...</option>
                        {CATEGORIES.map(cat => (
                          <option key={cat.id} value={cat.name}>{cat.name}</option>
                        ))}
                      </select>
                   </div>
                   <div>
                      <label className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 md:mb-3 block ml-1">Conta de Origem</label>
                      <select className="w-full px-5 py-3.5 md:px-6 md:py-5 rounded-2xl md:rounded-3xl border border-slate-100 bg-slate-50/50 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:bg-white transition-all text-sm font-bold text-slate-700 appearance-none cursor-pointer">
                        <option value="">Selecione...</option>
                        {MOCK_ACCOUNTS.map(acc => (
                          <option key={acc.id} value={acc.id}>{acc.name}</option>
                        ))}
                      </select>
                   </div>
                </div>
             </div>

             <div className="flex flex-col sm:flex-row gap-3 pt-4 md:pt-6">
                {!initialData && (
                  <button 
                    onClick={() => setStep(1)}
                    className="w-full sm:flex-1 py-4 md:py-5 px-6 rounded-2xl md:rounded-3xl bg-slate-50 text-slate-500 font-black hover:bg-slate-100 transition-all flex items-center justify-center gap-2 active:scale-95 text-sm"
                  >
                    <ChevronLeft size={18} />
                    Voltar
                  </button>
                )}
                <button 
                  onClick={() => onConfirm({ description, value, date, category, type })}
                  className="w-full sm:flex-[2] py-4 md:py-5 px-6 rounded-2xl md:rounded-3xl bg-[#0F172A] text-white font-black hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 flex items-center justify-center gap-2 active:scale-95 text-sm"
                >
                  {initialData ? 'Salvar Alterações' : 'Concluir'}
                  <ChevronRight size={18} />
                </button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

const TypeButton: React.FC<{label: string, color: string, bgColor: string, iconBg: string, icon: React.ReactNode, onClick: () => void}> = ({ label, color, bgColor, iconBg, icon, onClick }) => (
  <button 
    onClick={onClick}
    className={`p-5 md:p-10 rounded-3xl md:rounded-[40px] border border-slate-100 ${bgColor} hover:border-indigo-200 hover:bg-white hover:shadow-2xl hover:shadow-indigo-500/10 transition-all flex flex-col items-center gap-3 md:gap-5 group active:scale-95`}
  >
    <div className={`${iconBg} text-white p-3 md:p-5 rounded-2xl md:rounded-3xl shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3`}>
      {icon}
    </div>
    <span className={`text-[10px] md:text-sm font-black tracking-tight ${color} uppercase md:normal-case`}>{label}</span>
  </button>
);
