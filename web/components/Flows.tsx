
import React, { useState } from 'react';
import { Plus, Pencil, Trash2, ArrowUpRight, ArrowDownLeft, Tag } from 'lucide-react';
import { CATEGORIES, ICON_MAP } from '../constants';
import { Category } from '../types';

interface FlowsViewProps {
  onNewFlow: () => void;
  onEditFlow: (category: Category) => void;
}

export const FlowsView: React.FC<FlowsViewProps> = ({ onNewFlow, onEditFlow }) => {
  const [activeTab, setActiveTab] = useState<'expense' | 'income'>('expense');

  const filteredCategories = CATEGORIES.filter(cat => cat.type === activeTab);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Fluxos Financeiros</h1>
          <p className="text-slate-500">Gerencie as categorias de suas receitas e despesas.</p>
        </div>
        <button 
          onClick={onNewFlow}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-indigo-600/20"
        >
          <Plus size={20} />
          Novo Fluxo
        </button>
      </div>

      <div className="flex items-center gap-2 p-1 bg-slate-100 w-fit rounded-2xl">
        <button 
          onClick={() => setActiveTab('expense')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
            activeTab === 'expense' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <ArrowUpRight size={16} />
          Despesas
        </button>
        <button 
          onClick={() => setActiveTab('income')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
            activeTab === 'income' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          <ArrowDownLeft size={16} />
          Receitas
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredCategories.map((cat) => {
          const IconComponent = ICON_MAP[cat.icon] || Tag;
          // Handle both tailwind classes (bg-color-500) and hex codes
          const isTailwindClass = cat.color.startsWith('bg-');
          const bgColor = isTailwindClass ? undefined : cat.color;
          
          return (
            <div 
              key={cat.id} 
              className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all group flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div 
                  className={`text-white p-3.5 rounded-2xl shadow-sm group-hover:scale-105 transition-transform ${isTailwindClass ? cat.color : ''}`}
                  style={!isTailwindClass ? { backgroundColor: cat.color } : {}}
                >
                  <IconComponent size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{cat.name}</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {cat.type === 'income' ? 'Entrada' : 'Saída'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => onEditFlow(cat)}
                  className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                  title="Editar"
                >
                  <Pencil size={18} />
                </button>
                <button 
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                  title="Excluir"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
