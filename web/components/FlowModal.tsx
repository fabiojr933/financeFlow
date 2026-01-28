
import React, { useState } from 'react';
import { X, ChevronRight, Tag, ArrowUpRight, ArrowDownLeft, Palette } from 'lucide-react';
import { Category } from '../types';
import { ICON_MAP } from '../constants';

interface FlowModalProps {
  onClose: () => void;
  onConfirm: (data: any) => void;
  initialData?: Category | null;
}

const PRESET_COLORS = [
  '#f97316', '#f43f5e', '#3b82f6', '#6366f1', 
  '#10b981', '#a855f7', '#06b6d4', '#eab308',
  '#64748b', '#ec4899', '#14b8a6', '#0ea5e9'
];

export const FlowModal: React.FC<FlowModalProps> = ({ onClose, onConfirm, initialData }) => {
  const [name, setName] = useState(initialData?.name || '');
  const [type, setType] = useState<'income' | 'expense'>(initialData?.type || 'expense');
  const [selectedIcon, setSelectedIcon] = useState(initialData?.icon || 'Tag');
  
  const initialColor = initialData?.color.startsWith('bg-') ? '#6366f1' : (initialData?.color || '#6366f1');
  const [selectedColor, setSelectedColor] = useState(initialColor);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md overflow-y-auto">
      <div className="bg-white w-full max-w-xl max-h-[95vh] md:max-h-[90vh] rounded-[32px] md:rounded-[40px] shadow-2xl relative flex flex-col overflow-hidden my-auto animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 md:p-8 pb-4 flex items-center justify-between border-b border-slate-50">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-slate-800">
              {initialData ? 'Editar Fluxo' : 'Novo Fluxo'}
            </h2>
            <p className="text-slate-400 text-[10px] md:text-sm font-bold">Personalize sua categoria.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 md:p-3 bg-slate-50 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 pt-6 space-y-6 md:space-y-8 custom-scrollbar">
          {/* Type Selector */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <button 
              onClick={() => setType('expense')}
              className={`p-3 md:p-5 rounded-2xl md:rounded-3xl border-2 transition-all flex flex-col items-center gap-1.5 md:gap-2 font-black ${
                type === 'expense' 
                  ? 'border-rose-500 bg-rose-50 text-rose-600 shadow-sm' 
                  : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200'
              }`}
            >
              <ArrowUpRight size={20} />
              <span className="text-[10px] md:text-sm uppercase tracking-tight">Despesa</span>
            </button>
            <button 
              onClick={() => setType('income')}
              className={`p-3 md:p-5 rounded-2xl md:rounded-3xl border-2 transition-all flex flex-col items-center gap-1.5 md:gap-2 font-black ${
                type === 'income' 
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-600 shadow-sm' 
                  : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200'
              }`}
            >
              <ArrowDownLeft size={20} />
              <span className="text-[10px] md:text-sm uppercase tracking-tight">Receita</span>
            </button>
          </div>

          {/* Category Name */}
          <div className="space-y-2">
            <label className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest block px-1">Nome da Categoria</label>
            <input 
              type="text" 
              placeholder="Ex: Transporte, Lazer..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-5 py-3.5 md:py-4 rounded-xl md:rounded-2xl border border-slate-100 bg-slate-50/50 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:bg-white transition-all font-bold text-slate-700 text-sm"
            />
          </div>

          {/* Color Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <label className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">Escolha uma Cor</label>
              <div className="flex items-center gap-1 text-indigo-600 font-black text-[9px] bg-indigo-50 px-2 py-0.5 rounded-full uppercase">
                <Palette size={10} />
                Extra
              </div>
            </div>
            
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5 md:gap-3">
              {PRESET_COLORS.map(color => (
                <button 
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  style={{ backgroundColor: color }}
                  className={`w-full aspect-square rounded-xl md:rounded-2xl transition-all shadow-sm ${
                    selectedColor === color ? 'ring-offset-2 ring-4 ring-slate-200 scale-90' : 'hover:scale-105 active:scale-90'
                  }`}
                />
              ))}
              <div className="relative w-full aspect-square rounded-xl md:rounded-2xl overflow-hidden border-2 border-slate-100 group">
                <input 
                  type="color"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="absolute inset-0 w-full h-full cursor-pointer opacity-0 z-10"
                />
                <div 
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  style={{ backgroundColor: selectedColor }}
                >
                  {!PRESET_COLORS.includes(selectedColor) && <div className="w-2 h-2 rounded-full bg-white shadow-sm" />}
                </div>
              </div>
            </div>
          </div>

          {/* Icon Selection */}
          <div className="space-y-3">
            <label className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest block px-1">Escolha um Ícone</label>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2.5 md:gap-3">
              {Object.keys(ICON_MAP).map(iconName => {
                const Icon = ICON_MAP[iconName];
                const isActive = selectedIcon === iconName;
                return (
                  <button 
                    key={iconName}
                    onClick={() => setSelectedIcon(iconName)}
                    className={`aspect-square rounded-xl md:rounded-2xl border flex items-center justify-center transition-all ${
                      isActive 
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-600 shadow-sm' 
                        : 'border-slate-100 bg-slate-50/50 text-slate-400 hover:bg-white hover:border-slate-200 active:scale-90'
                    }`}
                  >
                    <Icon size={20} className="md:w-[22px] md:h-[22px]" strokeWidth={isActive ? 2.5 : 2} />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 md:p-8 pt-4 border-t border-slate-50 bg-white">
          <button 
            onClick={() => onConfirm({ 
              name, 
              type, 
              icon: selectedIcon, 
              color: selectedColor
            })}
            className="w-full py-4 md:py-5 rounded-2xl md:rounded-[24px] bg-indigo-600 text-white font-black hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 active:scale-[0.98] text-sm"
          >
            {initialData ? 'Salvar Alterações' : 'Cadastrar'}
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
};
