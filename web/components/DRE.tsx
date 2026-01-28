
import React, { useState, useMemo } from 'react';
import { 
  Printer, 
  Download, 
  Calendar, 
  ChevronRight, 
  TrendingUp, 
  ArrowUpCircle, 
  ArrowDownCircle,
  HelpCircle,
  Lightbulb
} from 'lucide-react';
import { MOCK_TRANSACTIONS } from '../constants';

export const DREView: React.FC = () => {
  const [startDate, setStartDate] = useState('2026-01-01');
  const [endDate, setEndDate] = useState('2026-01-31');

  // Filter only paid transactions within range (Cash Flow basis)
  const realizedTransactions = useMemo(() => {
    return MOCK_TRANSACTIONS.filter(t => {
      const d = new Date(t.date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return t.status === 'paid' && d >= start && d <= end;
    });
  }, [startDate, endDate]);

  const incomeByCategory = useMemo(() => {
    const map: Record<string, number> = {};
    realizedTransactions.filter(t => t.type === 'income').forEach(t => {
      map[t.category] = (map[t.category] || 0) + t.value;
    });
    return map;
  }, [realizedTransactions]);

  const expenseByCategory = useMemo(() => {
    const map: Record<string, number> = {};
    realizedTransactions.filter(t => t.type === 'expense').forEach(t => {
      map[t.category] = (map[t.category] || 0) + t.value;
    });
    return map;
  }, [realizedTransactions]);

  const totalIncome = Object.values(incomeByCategory).reduce((a, b) => a + b, 0);
  const totalExpense = Object.values(expenseByCategory).reduce((a, b) => a + b, 0);
  const netProfit = totalIncome - totalExpense;
  const margin = totalIncome > 0 ? (netProfit / totalIncome) * 100 : 0;

  return (
    <div className="space-y-6 md:space-y-8 pb-10">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-slate-800 flex items-center gap-2">
            <Printer className="text-indigo-600" size={24} />
            Relatório DRE
          </h1>
          <p className="text-slate-500 text-xs md:text-sm">Demonstrativo de Resultados do Exercício (Fluxo Realizado)</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all shadow-sm">
            {/* Fix: Replaced invalid md:size prop with Tailwind responsive sizing classes */}
            <Printer size={18} className="md:w-5 md:h-5" />
          </button>
          <button className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all shadow-sm">
            {/* Fix: Replaced invalid md:size prop with Tailwind responsive sizing classes */}
            <Download size={18} className="md:w-5 md:h-5" />
          </button>
        </div>
      </div>

      {/* Date Filter Bar */}
      <div className="bg-white p-4 md:p-5 rounded-[24px] md:rounded-[32px] border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-4 md:gap-6">
        <div className="flex items-center gap-3 md:gap-4 flex-1 w-full">
          <div className="bg-indigo-50 p-2.5 md:p-3 rounded-xl md:rounded-2xl text-indigo-600">
            {/* Fix: Replaced invalid md:size prop with Tailwind responsive sizing classes */}
            <Calendar size={18} className="md:w-5 md:h-5" />
          </div>
          <div>
            <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">Período de Análise</p>
            <p className="text-xs md:text-sm font-bold text-slate-700">Intervalo de datas</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto">
          <input 
            type="date" 
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="flex-1 md:w-44 bg-slate-50 border border-slate-100 px-4 py-2.5 rounded-xl md:rounded-2xl text-xs md:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
          <ChevronRight className="hidden md:block text-slate-300" size={18} />
          <input 
            type="date" 
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="flex-1 md:w-44 bg-slate-50 border border-slate-100 px-4 py-2.5 rounded-xl md:rounded-2xl text-xs md:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        {/* Main DRE Content */}
        <div className="lg:col-span-8 bg-white rounded-[24px] md:rounded-[40px] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          {/* DRE Header Banner */}
          <div className="bg-[#0F172A] p-5 md:p-8 text-white flex justify-between items-center md:items-end gap-2">
            <div>
              <h2 className="text-sm md:text-xl font-bold">Relatório Mensal</h2>
              <p className="text-slate-400 text-[8px] md:text-[10px] font-bold uppercase tracking-widest mt-1">Regime de Caixa</p>
            </div>
            <div className="text-right">
              <p className="text-slate-400 text-[8px] md:text-[10px] font-bold uppercase tracking-widest mb-1">Lucro Líquido</p>
              <p className={`text-xl md:text-3xl font-black ${netProfit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {netProfit.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </p>
            </div>
          </div>

          {/* DRE Table with horizontal scroll if needed */}
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[300px]">
              <tbody>
                {/* Income Section */}
                <tr className="bg-emerald-50/50">
                  <td className="px-4 py-3 md:px-6 md:py-4 flex items-center gap-2">
                    {/* Fix: Replaced invalid md:size prop with Tailwind responsive sizing classes */}
                    <ArrowDownCircle size={14} className="text-emerald-600 shrink-0 md:w-4 md:h-4" />
                    <span className="text-[10px] md:text-xs font-black text-emerald-700 uppercase tracking-widest">Receitas Brutas</span>
                  </td>
                  <td className="px-4 py-3 md:px-6 md:py-4 text-right font-black text-emerald-700 text-xs md:text-base">
                    {totalIncome.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </td>
                </tr>
                {Object.entries(incomeByCategory).map(([cat, val]) => (
                  <tr key={cat} className="border-b border-slate-50">
                    <td className="px-8 py-3 md:px-10 md:py-4 text-xs md:text-sm font-semibold text-slate-600">{cat}</td>
                    <td className="px-4 py-3 md:px-6 md:py-4 text-right text-xs md:text-sm font-bold text-slate-800">
                      {val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </td>
                  </tr>
                ))}

                {/* Expense Section */}
                <tr className="bg-rose-50/50">
                  <td className="px-4 py-3 md:px-6 md:py-4 flex items-center gap-2">
                    {/* Fix: Replaced invalid md:size prop with Tailwind responsive sizing classes */}
                    <ArrowUpCircle size={14} className="text-rose-600 shrink-0 md:w-4 md:h-4" />
                    <span className="text-[10px] md:text-xs font-black text-rose-700 uppercase tracking-widest">Despesas Operacionais</span>
                  </td>
                  <td className="px-4 py-3 md:px-6 md:py-4 text-right font-black text-rose-700 text-xs md:text-base">
                    ({totalExpense.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })})
                  </td>
                </tr>
                {Object.entries(expenseByCategory).map(([cat, val]) => (
                  <tr key={cat} className="border-b border-slate-50">
                    <td className="px-8 py-3 md:px-10 md:py-4 text-xs md:text-sm font-semibold text-slate-600">{cat}</td>
                    <td className="px-4 py-3 md:px-6 md:py-4 text-right text-xs md:text-sm font-bold text-slate-800">
                      {val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* DRE Footer Summary */}
          <div className="mt-auto p-5 md:p-8 border-t border-slate-100 flex justify-between items-center bg-slate-50/30">
            <div>
              <p className="text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Resultado Final</p>
              <h3 className="text-sm md:text-xl font-black text-slate-800 uppercase">LUCRO LÍQUIDO</h3>
            </div>
            <p className={`text-xl md:text-3xl font-black ${netProfit >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
              {netProfit.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
          </div>
        </div>

        {/* Sidebar Cards */}
        <div className="lg:col-span-4 space-y-6">
          {/* Efficiency Card */}
          <div className="bg-white p-6 md:p-8 rounded-[24px] md:rounded-[40px] border border-slate-100 shadow-sm space-y-5 md:space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-50 p-2 rounded-lg text-emerald-600">
                <TrendingUp size={18} />
              </div>
              <h3 className="font-bold text-slate-800 text-sm md:text-base">Eficiência Financeira</h3>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">Margem de Sobra</p>
                <p className="text-xs md:text-sm font-black text-emerald-600">{margin.toFixed(1)}%</p>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 rounded-full transition-all duration-1000" 
                  style={{ width: `${Math.min(100, margin)}%` }} 
                />
              </div>
            </div>

            <div className="bg-indigo-50/50 p-4 md:p-6 rounded-2xl md:rounded-3xl border border-indigo-100/50">
              <p className="text-indigo-800 text-[10px] md:text-xs font-bold leading-relaxed">
                {margin > 20 
                  ? "Sua operação está saudável! Você manteve mais dinheiro do que gastou neste período." 
                  : "Sua margem está apertada. Considere revisar despesas não essenciais para aumentar sua sobra mensal."}
              </p>
            </div>
          </div>

          {/* Pro Tip Card */}
          <div className="bg-indigo-600 p-6 md:p-8 rounded-[24px] md:rounded-[40px] text-white shadow-xl shadow-indigo-600/20 relative overflow-hidden group">
            <div className="relative z-10 space-y-4 md:space-y-6">
              <div className="bg-white/20 p-2.5 rounded-xl md:rounded-2xl w-fit">
                {/* Fix: Replaced invalid md:size prop with Tailwind responsive sizing classes */}
                <Lightbulb size={20} className="md:w-6 md:h-6" />
              </div>
              
              <div>
                <h3 className="text-base md:text-xl font-bold mb-2 md:mb-3">Dica Pro</h3>
                <p className="text-indigo-100 text-[11px] md:text-sm font-medium leading-relaxed opacity-90">
                  O DRE permite identificar qual "ralo" está levando seu dinheiro. Analise as categorias com maiores valores e tente reduzir 5% de cada uma no próximo mês.
                </p>
              </div>

              <button className="flex items-center gap-2 text-[9px] md:text-xs font-bold uppercase tracking-widest text-white group-hover:gap-4 transition-all">
                Ver Insights IA <ChevronRight size={14} />
              </button>
            </div>

            {/* Decoration */}
            <div className="absolute top-[-20%] right-[-10%] w-32 md:w-40 h-32 md:h-40 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-[-10%] left-[-5%] w-20 md:w-24 h-20 md:h-24 bg-indigo-400/20 rounded-full blur-2xl" />
          </div>

          {/* Help Card */}
          <div className="bg-slate-50 p-4 md:p-6 rounded-[24px] border border-slate-100 flex items-center gap-4 group cursor-help">
            <div className="bg-white p-3 rounded-xl text-slate-400 group-hover:text-indigo-600 transition-colors shadow-sm">
              {/* Fix: Replaced invalid md:size prop with Tailwind responsive sizing classes */}
              <HelpCircle size={18} className="md:w-5 md:h-5" />
            </div>
            <div>
              <p className="text-xs md:text-sm font-bold text-slate-700">Entenda o DRE</p>
              <p className="text-[9px] md:text-[10px] font-medium text-slate-400">Guia rápido de leitura</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
