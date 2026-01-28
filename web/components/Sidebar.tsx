
import React from 'react';
import { LogOut, ExternalLink, Zap, Crown, X } from 'lucide-react';
import { NAV_ITEMS } from '../constants';
import { ViewType } from '../types';

interface SidebarProps {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  isSubscribed: boolean;
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, isSubscribed, isOpen, onClose, onLogout }) => {
  const handleNavClick = (id: string, isPro: boolean) => {
    if (isPro && !isSubscribed) {
      setActiveView('subscription');
    } else {
      setActiveView(id as ViewType);
    }
  };

  return (
    <aside className={`
      w-64 bg-[#0F172A] text-slate-300 h-screen flex flex-col fixed left-0 top-0 z-40 
      transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0 shadow-2xl shadow-indigo-500/10' : '-translate-x-full lg:translate-x-0'}
    `}>
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <Zap size={24} className="text-white fill-white" />
          </div>
          <span className="text-xl font-bold text-white">FinanceFlow</span>
        </div>
        <button 
          onClick={onClose}
          className="lg:hidden p-2 text-slate-500 hover:text-white transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 px-4 mt-6 overflow-y-auto custom-scrollbar">
        <ul className="space-y-2 pb-6">
          {NAV_ITEMS.map((item) => {
            const isRestricted = item.isPro && !isSubscribed;
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.id, item.isPro)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${
                    activeView === item.id 
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                      : 'hover:bg-slate-800/50 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  {item.isPro && !isSubscribed && (
                    <Crown size={14} className="text-amber-500 group-hover:scale-110 transition-transform" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-800/50">
        <div className="bg-slate-800/30 rounded-2xl p-4 border border-slate-700/30">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Assinatura</p>
          <button 
            onClick={() => setActiveView('subscription')}
            className="flex items-center justify-between w-full text-left group"
          >
            <div>
              <p className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">
                {isSubscribed ? 'Plano Pro' : 'Plano Grátis'}
              </p>
            </div>
            {isSubscribed ? (
              <ExternalLink size={14} className="text-indigo-400" />
            ) : (
              <div className="bg-amber-500/20 text-amber-500 px-2 py-0.5 rounded text-[8px] font-black uppercase">Upgrade</div>
            )}
          </button>
        </div>
        
        <button 
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-4 w-full text-slate-500 hover:text-rose-400 transition-colors mt-2"
        >
          <LogOut size={20} />
          <span className="text-sm font-medium">Sair da Conta</span>
        </button>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #334155;
          border-radius: 10px;
        }
      `}</style>
    </aside>
  );
};
