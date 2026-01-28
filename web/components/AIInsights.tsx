
import React, { useState } from 'react';
import { BrainCircuit, Sparkles, CheckCircle2, RotateCw, Lightbulb, TrendingUp, ShieldCheck } from 'lucide-react';
import { getFinancialInsights } from '../geminiService';
import { MOCK_TRANSACTIONS } from '../constants';

export const AIInsightsView: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState<any>(null);

  const generate = async () => {
    setLoading(true);
    const result = await getFinancialInsights(MOCK_TRANSACTIONS);
    setInsights(result);
    setLoading(false);
  };

  const score = insights?.financialScore || 0;
  const circumference = 2 * Math.PI * 80; // r=80
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="space-y-8 pb-12">
      <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-[40px] p-8 md:p-12 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-white/5 shadow-2xl">
        <div className="relative z-10 max-w-xl text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
             <div className="p-4 bg-indigo-500/20 rounded-3xl backdrop-blur-xl border border-indigo-400/20 ring-4 ring-indigo-500/10">
                <BrainCircuit size={32} className="text-indigo-400" />
             </div>
             <div>
               <h1 className="text-3xl font-black tracking-tight">Consultor Inteligente</h1>
               <p className="text-indigo-400 text-xs font-bold uppercase tracking-widest mt-1">Powered by Gemini AI</p>
             </div>
          </div>
          <p className="text-slate-300 text-lg leading-relaxed font-medium">
            Sua jornada financeira simplificada. Analisamos seus padrões de gastos e ganhos para entregar um plano de ação personalizado em segundos.
          </p>
        </div>

        <button 
          onClick={generate}
          disabled={loading}
          className="group relative z-10 bg-indigo-600 text-white px-10 py-5 rounded-[24px] font-black hover:bg-indigo-500 hover:scale-105 transition-all flex items-center gap-3 disabled:opacity-50 shadow-xl shadow-indigo-600/30"
        >
          {loading ? <RotateCw size={22} className="animate-spin" /> : <Sparkles size={22} className="group-hover:animate-pulse" />}
          {loading ? 'Analisando...' : 'Otimizar minhas Finanças'}
        </button>

        {/* Decorative elements */}
        <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-50px] left-[20%] w-[200px] h-[200px] bg-indigo-400/5 rounded-full blur-[60px]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Score Card */}
        <div className="lg:col-span-5 bg-white p-10 md:p-12 rounded-[48px] border border-slate-100 shadow-sm flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-10">
            <ShieldCheck className="text-slate-300" size={16} />
            <h3 className="text-slate-400 font-black text-[10px] uppercase tracking-widest">Financial Health Score</h3>
          </div>
          
          <div className="relative w-64 h-64 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90 drop-shadow-sm" viewBox="0 0 200 200">
              <circle 
                cx="100" cy="100" r="80" 
                stroke="#F1F5F9" strokeWidth="16" 
                fill="transparent" 
              />
              <circle 
                cx="100" cy="100" r="80" 
                stroke="currentColor" 
                strokeWidth="16" 
                fill="transparent" 
                strokeDasharray={circumference} 
                strokeDashoffset={offset} 
                strokeLinecap="round"
                className={`${score > 70 ? 'text-emerald-500' : score > 40 ? 'text-amber-500' : 'text-rose-500'} transition-all duration-1000 ease-out shadow-lg`}
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-7xl font-black text-slate-800 tracking-tighter leading-none">{score}</span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Pontos</span>
            </div>
          </div>

          <div className="mt-12 bg-slate-50/50 p-8 rounded-[32px] border border-slate-100/50 w-full">
            <p className="text-slate-600 italic leading-relaxed font-medium">
              {insights ? `"${insights.healthStatus}"` : "Pressione o botão acima para receber o diagnóstico da sua saúde financeira atual."}
            </p>
          </div>
        </div>

        {/* Recommendations Card */}
        <div className="lg:col-span-7 bg-white p-10 md:p-12 rounded-[48px] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-50 p-3 rounded-2xl text-emerald-500">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="text-slate-800 font-black text-xl">Recomendações Práticas</h3>
            </div>
            {insights && (
              <span className="bg-emerald-100 text-emerald-700 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest">
                Gerado Agora
              </span>
            )}
          </div>

          <div className="space-y-6">
            {insights?.recommendations ? (
              insights.recommendations.map((rec: string, i: number) => (
                <div 
                  key={i} 
                  className="group bg-white p-6 rounded-[32px] border border-slate-100 flex items-start gap-5 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 cursor-default"
                >
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black group-hover:bg-indigo-600 group-hover:text-white transition-colors shrink-0">
                    {i === 0 ? <TrendingUp size={20} /> : i === 1 ? <Lightbulb size={20} /> : <CheckCircle2 size={20} />}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dica #0{i+1}</p>
                    <p className="text-slate-700 leading-relaxed font-semibold">{rec}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center space-y-6 opacity-40">
                <div className="bg-slate-50 p-8 rounded-full">
                   <RotateCw size={48} className="text-slate-300" />
                </div>
                <div>
                   <p className="font-bold text-slate-600">Aguardando Análise</p>
                   <p className="text-sm">Inicie a otimização no botão acima para ver suas dicas.</p>
                </div>
              </div>
            )}
          </div>

          {insights && (
            <div className="mt-10 p-6 bg-indigo-50 rounded-3xl flex items-center gap-4 border border-indigo-100/50">
               <div className="bg-indigo-600 text-white p-2 rounded-lg">
                  <Sparkles size={16} />
               </div>
               <p className="text-indigo-900 text-xs font-bold leading-tight">
                 Estas recomendações são baseadas no seu fluxo de caixa dos últimos 30 dias.
               </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
