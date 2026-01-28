
import React, { useState } from 'react';
import { Zap, Mail, Lock, User, ArrowRight, Github, Chrome } from 'lucide-react';

interface AuthViewProps {
  onLogin: () => void;
}

export const AuthView: React.FC<AuthViewProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate a brief network delay
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 800);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-[#f8fafc] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/5 rounded-full blur-[120px]" />
      
      <div className="w-full max-w-[850px] grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[40px] shadow-2xl overflow-hidden relative z-10 border border-slate-100">
        
        {/* Left Side: Branding/Info (Hidden on small mobile) */}
        <div className="hidden lg:flex bg-[#0F172A] p-10 flex-col justify-between text-white relative overflow-hidden border-r border-slate-800">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8">
              <div className="bg-indigo-600 p-2 rounded-lg shadow-lg shadow-indigo-600/20">
                <Zap size={20} className="text-white fill-white" />
              </div>
              <span className="text-lg font-black tracking-tight">FinanceFlow</span>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-3xl font-black leading-tight tracking-tighter">
                Sua liberdade financeira começa com <span className="text-indigo-400">inteligência.</span>
              </h1>
              <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-[280px]">
                A plataforma definitiva para gestão de capital e insights com IA.
              </p>
            </div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5 backdrop-blur-md">
              <div className="bg-indigo-500/20 p-1.5 rounded-lg">
                <Zap size={14} className="text-indigo-400" />
              </div>
              <p className="text-[10px] font-medium text-slate-300">
                Mais de <span className="text-white font-bold">15,000 usuários</span> ativos.
              </p>
            </div>
          </div>

          {/* Background Decorative Pattern */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.015] pointer-events-none">
             <Zap size={400} />
          </div>
        </div>

        {/* Right Side: Forms */}
        <div className="p-8 md:p-10 flex flex-col justify-center bg-white">
          <div className="mb-6 text-center lg:text-left">
            <div className="lg:hidden flex justify-center mb-4">
               <div className="bg-indigo-600 p-2 rounded-lg shadow-lg">
                <Zap size={20} className="text-white fill-white" />
              </div>
            </div>
            <h2 className="text-xl font-black text-slate-800 tracking-tight">
              {mode === 'login' ? 'Bem-vindo de volta' : 'Crie sua conta'}
            </h2>
            <p className="text-slate-500 mt-1 text-xs font-medium">
              {mode === 'login' 
                ? 'Insira suas credenciais para acessar.' 
                : 'Junte-se a nós hoje mesmo.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === 'register' && (
              <div className="space-y-1">
                <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">Nome Completo</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={16} />
                  <input 
                    required
                    type="text" 
                    placeholder="João Silva" 
                    className="w-full pl-11 pr-5 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:bg-white transition-all font-medium text-sm text-slate-700 placeholder:text-slate-300"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest ml-1">E-mail</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={16} />
                <input 
                  required
                  type="email" 
                  placeholder="exemplo@email.com" 
                  className="w-full pl-11 pr-5 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:bg-white transition-all font-medium text-sm text-slate-700 placeholder:text-slate-300"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center px-1">
                <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Senha</label>
                {mode === 'login' && (
                  <button type="button" className="text-[8px] font-black text-indigo-600 uppercase tracking-widest hover:text-indigo-700">Esqueci a senha</button>
                )}
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={16} />
                <input 
                  required
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full pl-11 pr-5 py-2.5 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:bg-white transition-all font-medium text-sm text-slate-700 placeholder:text-slate-300"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-black hover:bg-indigo-700 transition-all flex items-center justify-center gap-2.5 shadow-lg shadow-indigo-600/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed group mt-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span className="text-sm">{mode === 'login' ? 'Entrar' : 'Criar Conta'}</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-100" />
            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Ou continue com</span>
            <div className="h-px flex-1 bg-slate-100" />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button className="flex items-center justify-center gap-2 py-2.5 border border-slate-100 rounded-xl font-bold text-[11px] text-slate-700 hover:bg-slate-50 transition-all active:scale-[0.98]">
              <Chrome size={14} className="text-red-500" />
              Google
            </button>
            <button className="flex items-center justify-center gap-2 py-2.5 border border-slate-100 rounded-xl font-bold text-[11px] text-slate-700 hover:bg-slate-50 transition-all active:scale-[0.98]">
              <Github size={14} className="text-slate-800" />
              Github
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-slate-500 text-[10px] font-medium">
              {mode === 'login' ? 'Ainda não tem conta?' : 'Já possui uma conta?'}
              <button 
                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                className="ml-1 text-indigo-600 font-black hover:text-indigo-700 underline underline-offset-4 decoration-indigo-600/20"
              >
                {mode === 'login' ? 'Cadastre-se' : 'Fazer Login'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
