
import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  AlertCircle,
  Calendar,
  ChevronRight,
  Filter,
  ArrowUpRight,
  ArrowDownLeft,
  Clock
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
  Rectangle
} from 'recharts';

const data = [
  { name: '01/21', income: 100, expense: 50 },
  { name: '01/22', income: 200, expense: 100 },
  { name: '01/23', income: 150, expense: 120 },
  { name: '01/24', income: 300, expense: 150 },
  { name: '01/25', income: 450, expense: 200 },
  { name: '01/26', income: 3000, expense: 800 },
  { name: '01/27', income: 11000, expense: 1255 },
];

const categoryData = [
  { name: 'Alimentação', value: 350, color: '#6366F1' },
  { name: 'Lazer', value: 55, color: '#F59E0B' },
  { name: 'Moradia', value: 850, color: '#10B981' },
];

const monthlyComparisonData = [
  { month: 'Ago', receitas: 4500, despesas: 3800 },
  { month: 'Set', receitas: 5200, despesas: 3900 },
  { month: 'Out', receitas: 4800, despesas: 4200 },
  { month: 'Nov', receitas: 6100, despesas: 4800 },
  { month: 'Dez', receitas: 7500, despesas: 5100 },
  { month: 'Jan', receitas: 11000, despesas: 1255 },
];

export const DashboardView: React.FC = () => {
  const [startDate, setStartDate] = useState('2026-01-21');
  const [endDate, setEndDate] = useState('2026-01-27');

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500 pb-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-800">Visão Geral</h1>
          <p className="text-slate-500 text-sm md:text-base">Bem-vindo de volta, aqui está o resumo do seu dinheiro.</p>
        </div>
        
        {/* Date Filter Bar */}
        <div className="bg-white p-2.5 rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm flex items-center gap-2 md:gap-4">
          <div className="flex items-center gap-2 pl-2 border-r border-slate-100 pr-4 hidden sm:flex">
             <Calendar size={16} className="text-indigo-600" />
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Filtrar período</span>
          </div>
          <div className="flex items-center gap-1.5 md:gap-2">
            <input 
              type="date" 
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-slate-50 border-none px-3 py-1.5 rounded-xl text-[11px] font-bold text-slate-600 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none"
            />
            <ChevronRight className="text-slate-300" size={14} />
            <input 
              type="date" 
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-slate-50 border-none px-3 py-1.5 rounded-xl text-[11px] font-bold text-slate-600 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none"
            />
          </div>
          <button className="bg-indigo-600 p-2 rounded-xl text-white hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20 active:scale-90">
            <Filter size={16} />
          </button>
        </div>
      </header>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard title="Saldo Total" value="R$ 66.150,00" icon={<Wallet className="text-indigo-600" />} bgColor="bg-indigo-50" />
        <StatCard title="Receitas (Mês)" value="R$ 11.000,00" icon={<TrendingUp className="text-emerald-600" />} bgColor="bg-emerald-50" />
        <StatCard title="Despesas (Mês)" value="R$ 1.255,90" icon={<TrendingDown className="text-rose-600" />} bgColor="bg-rose-50" />
        <StatCard title="Pendentes" value="R$ 3.350,00" icon={<AlertCircle className="text-amber-600" />} bgColor="bg-amber-50" />
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-black text-slate-800">Fluxo de Caixa Diário</h2>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Entradas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Saídas</span>
              </div>
            </div>
          </div>
          <div className="h-[250px] md:h-[300px] w-full mt-auto">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} tickFormatter={(val) => `R$${val/1000}k`} width={40} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="income" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
                <Area type="monotone" dataKey="expense" stroke="#EF4444" strokeWidth={3} fillOpacity={1} fill="url(#colorExpense)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col h-full">
          <h2 className="text-lg font-black text-slate-800 mb-6">Gastos por Categoria</h2>
          <div className="flex-1 flex flex-col justify-center min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  iconType="circle"
                  wrapperStyle={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Second Row of Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Monthly Comparison Bar Chart */}
        <div className="lg:col-span-3 bg-white p-6 md:p-8 rounded-[32px] border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-lg font-black text-slate-800">Comparativo Mensal</h2>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">Últimos 6 meses</p>
            </div>
            <div className="bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100">
               <span className="text-xs font-black text-indigo-600">+12% Lucro</span>
            </div>
          </div>
          
          <div className="h-[250px] md:h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyComparisonData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} tickFormatter={(val) => `R$${val/1000}k`} width={40} />
                <Tooltip 
                  cursor={{fill: '#f8fafc', radius: 10}}
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Bar 
                  dataKey="receitas" 
                  fill="#6366F1" 
                  radius={[6, 6, 0, 0]} 
                  barSize={16}
                  activeBar={<Rectangle fill="#4F46E5" />} 
                />
                <Bar 
                  dataKey="despesas" 
                  fill="#E2E8F0" 
                  radius={[6, 6, 0, 0]} 
                  barSize={16}
                  activeBar={<Rectangle fill="#CBD5E1" />} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity Mini-List */}
        <div className="lg:col-span-2 bg-white p-6 md:p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-black text-slate-800">Atividades Recentes</h2>
            <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:underline">Ver todas</button>
          </div>
          
          <div className="space-y-4 flex-1">
            <ActivityItem 
              title="Salário Google" 
              category="Receita" 
              amount="R$ 8.500,00" 
              time="Hoje, 09:42" 
              type="income"
            />
            <ActivityItem 
              title="Supermercado Extra" 
              category="Despesa" 
              amount="R$ 450,20" 
              time="Ontem, 18:15" 
              type="expense"
            />
            <ActivityItem 
              title="Freelance Design" 
              category="Pendente" 
              amount="R$ 2.500,00" 
              time="Há 2 dias" 
              type="pending"
            />
            <ActivityItem 
              title="Aluguel Apartamento" 
              category="A Pagar" 
              amount="R$ 2.500,00" 
              time="Vence em 4 dias" 
              type="payable"
            />
          </div>

          <div className="mt-8 p-4 bg-indigo-50 rounded-2xl flex items-center gap-4">
             <div className="bg-white p-2.5 rounded-xl shadow-sm">
                <Clock size={16} className="text-indigo-600" />
             </div>
             <p className="text-[10px] md:text-xs font-bold text-indigo-900 leading-tight">
               Você tem <strong>3 contas</strong> vencendo nos próximos 7 dias. Organize seu caixa!
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{title: string, value: string, icon: React.ReactNode, bgColor: string}> = ({ title, value, icon, bgColor }) => (
  <div className="bg-white p-5 rounded-[28px] border border-slate-100 shadow-sm flex items-center gap-4 transition-all hover:scale-[1.02] hover:shadow-md cursor-default group">
    <div className={`${bgColor} p-3.5 md:p-4 rounded-2xl transition-transform group-hover:rotate-6`}>
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mb-1 truncate">{title}</p>
      <p className="text-lg md:text-xl font-black text-slate-800 truncate">{value}</p>
    </div>
  </div>
);

const ActivityItem: React.FC<{title: string, category: string, amount: string, time: string, type: 'income' | 'expense' | 'pending' | 'payable'}> = ({ title, category, amount, time, type }) => (
  <div className="flex items-center justify-between p-3.5 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer group">
    <div className="flex items-center gap-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
        type === 'income' ? 'bg-emerald-50 text-emerald-600' : 
        type === 'expense' ? 'bg-rose-50 text-rose-600' : 
        type === 'pending' ? 'bg-indigo-50 text-indigo-600' : 'bg-amber-50 text-amber-600'
      }`}>
        {type === 'income' ? <ArrowDownLeft size={18} /> : 
         type === 'expense' ? <ArrowUpRight size={18} /> : 
         type === 'pending' ? <TrendingUp size={18} /> : <Clock size={18} />}
      </div>
      <div>
        <h4 className="text-xs font-black text-slate-800 group-hover:text-indigo-600 transition-colors">{title}</h4>
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{category} • {time}</p>
      </div>
    </div>
    <span className={`text-xs font-black ${type === 'income' ? 'text-emerald-600' : 'text-slate-700'}`}>
      {type === 'expense' || type === 'payable' ? '-' : ''} {amount}
    </span>
  </div>
);
