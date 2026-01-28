
import React, { useState } from 'react';
import { X, Wallet, CreditCard as CardIcon, ChevronRight, ChevronLeft, Building2, TrendingUp } from 'lucide-react';
import { BankAccount, CreditCard } from '../types';

interface AccountModalProps {
  onClose: () => void;
  onConfirm: (data: any) => void;
  initialData?: BankAccount | CreditCard | null;
}

export const AccountModal: React.FC<AccountModalProps> = ({ onClose, onConfirm, initialData }) => {
  const initialMode = initialData ? ('balance' in initialData ? 'account' : 'card') : null;
  const [step, setStep] = useState(initialData ? 2 : 1);
  const [mode, setMode] = useState<'account' | 'card' | null>(initialMode);
  
  const [name, setName] = useState(initialData?.name || '');
  const [accType, setAccType] = useState(initialData && 'type' in initialData ? initialData.type : 'CONTA CORRENTE');
  const [balance, setBalance] = useState(initialData && 'balance' in initialData ? initialData.balance.toString().replace('.', ',') : '0,00');
  const [limit, setLimit] = useState(initialData && 'limit' in initialData ? initialData.limit.toString().replace('.', ',') : '0,00');
  const [closingDate, setClosingDate] = useState(initialData && 'closingDate' in initialData ? initialData.closingDate.toString() : '10');

  const handleModeSelect = (selectedMode: 'account' | 'card') => {
    setMode(selectedMode);
    setStep(2);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-3xl md:rounded-[40px] shadow-2xl relative p-6 md:p-10 my-auto animate-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 md:right-8 md:top-8 p-2 bg-slate-50 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X size={18} />
        </button>

        <div className="mb-6 md:mb-10">
          <h2 className="text-xl md:text-2xl font-black text-slate-800">
            {initialData ? 'Editar Cadastro' : 'Novo Cadastro'}
          </h2>
          <p className="text-slate-400 text-[10px] md:text-sm font-bold">Passo {step} de 2</p>
        </div>

        {step === 1 ? (
          <div className="space-y-6 md:space-y-8">
            <h3 className="text-center font-bold text-slate-600 text-sm">O que você deseja cadastrar?</h3>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <button 
                onClick={() => handleModeSelect('account')}
                className="p-5 md:p-8 rounded-3xl border border-slate-100 hover:border-indigo-400 bg-slate-50/50 transition-all flex flex-col items-center gap-3 md:gap-4 group"
              >
                <div className="bg-indigo-600 text-white p-4 md:p-5 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                  <Wallet size={24} className="md:w-8 md:h-8" />
                </div>
                <span className="font-bold text-slate-800 text-xs md:text-base">Conta</span>
              </button>
              
              <button 
                onClick={() => handleModeSelect('card')}
                className="p-5 md:p-8 rounded-3xl border border-slate-100 hover:border-purple-400 bg-slate-50/50 transition-all flex flex-col items-center gap-3 md:gap-4 group"
              >
                <div className="bg-purple-600 text-white p-4 md:p-5 rounded-2xl shadow-lg group-hover:scale-110 transition-transform">
                  <CardIcon size={24} className="md:w-8 md:h-8" />
                </div>
                <span className="font-bold text-slate-800 text-xs md:text-base">Cartão</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-5 md:space-y-6">
             <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded text-[9px] font-black uppercase ${
                  mode === 'account' ? 'bg-indigo-100 text-indigo-600' : 'bg-purple-100 text-purple-600'
                }`}>
                  {mode === 'account' ? 'Conta Bancária' : 'Cartão de Crédito'}
                </span>
             </div>

             <div className="space-y-4">
                <div>
                  <label className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase mb-1.5 block px-1">Nome / Instituição</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={mode === 'account' ? "Ex: Nubank, Itaú..." : "Ex: Inter Black..."}
                    className="w-full px-4 py-3.5 md:py-4 rounded-xl md:rounded-2xl border border-slate-100 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all text-sm font-medium"
                  />
                </div>

                {mode === 'account' ? (
                  <>
                    <div>
                      <label className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase mb-1.5 block px-1">Tipo de Conta</label>
                      <select 
                        value={accType}
                        onChange={(e) => setAccType(e.target.value)}
                        className="w-full px-4 py-3.5 md:py-4 rounded-xl md:rounded-2xl border border-slate-100 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all text-sm font-medium bg-white"
                      >
                        <option>CONTA CORRENTE</option>
                        <option>POUPANÇA</option>
                        <option>INVESTIMENTO</option>
                        <option>OUTROS</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase mb-1.5 block px-1">Saldo (R$)</label>
                      <input 
                        type="text" 
                        value={balance}
                        onChange={(e) => setBalance(e.target.value)}
                        className="w-full px-4 py-3.5 md:py-4 rounded-xl md:rounded-2xl border border-slate-100 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all font-black text-slate-800"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase mb-1.5 block px-1">Limite (R$)</label>
                        <input 
                          type="text" 
                          value={limit}
                          onChange={(e) => setLimit(e.target.value)}
                          className="w-full px-4 py-3.5 md:py-4 rounded-xl md:rounded-2xl border border-slate-100 focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all font-black text-slate-800"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase mb-1.5 block px-1">Vencimento</label>
                        <input 
                          type="number" 
                          min="1" 
                          max="31"
                          value={closingDate}
                          onChange={(e) => setClosingDate(e.target.value)}
                          className="w-full px-4 py-3.5 md:py-4 rounded-xl md:rounded-2xl border border-slate-100 focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all font-black text-slate-800"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase mb-1.5 block px-1">Bandeira</label>
                      <select className="w-full px-4 py-3.5 md:py-4 rounded-xl md:rounded-2xl border border-slate-100 focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all text-sm font-medium bg-white">
                        <option>Mastercard</option>
                        <option>Visa</option>
                        <option>Elo</option>
                        <option>American Express</option>
                      </select>
                    </div>
                  </>
                )}
             </div>

             <div className="flex gap-3 pt-4 md:pt-6">
                {!initialData && (
                  <button 
                    onClick={() => setStep(1)}
                    className="flex-1 py-3.5 md:py-4 px-4 rounded-xl md:rounded-2xl bg-slate-50 text-slate-600 font-black hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 text-xs"
                  >
                    <ChevronLeft size={16} />
                    Voltar
                  </button>
                )}
                <button 
                  onClick={() => onConfirm({ name, accType, balance, limit, closingDate })}
                  className={`flex-[1.5] py-3.5 md:py-4 px-4 rounded-xl md:rounded-2xl text-white font-black transition-all shadow-xl flex items-center justify-center gap-2 text-xs ${
                    mode === 'account' ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/30' : 'bg-purple-600 hover:bg-purple-700 shadow-purple-600/30'
                  }`}
                >
                  Confirmar
                  <ChevronRight size={16} />
                </button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};
