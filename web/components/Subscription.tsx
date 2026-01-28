
import React, { useState } from 'react';
import { 
  Crown, 
  Calendar, 
  CreditCard, 
  Zap, 
  Sparkles, 
  PieChart, 
  ShieldCheck, 
  Share2, 
  FileText, 
  ChevronRight,
  X,
  Download,
  CheckCircle2,
  ArrowRight,
  Copy,
  QrCode,
  Loader2,
  ChevronLeft
} from 'lucide-react';

interface SubscriptionViewProps {
  isSubscribed: boolean;
  setIsSubscribed: (val: boolean) => void;
}

export const SubscriptionView: React.FC<SubscriptionViewProps> = ({ isSubscribed, setIsSubscribed }) => {
  const [showHistory, setShowHistory] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const handleConfirmPayment = () => {
    // Simular uma pequena validação
    setIsSubscribed(true);
    setShowCheckout(false);
  };

  if (showCheckout) {
    return (
      <CheckoutScreen 
        onBack={() => setShowCheckout(false)} 
        onConfirm={handleConfirmPayment} 
      />
    );
  }

  if (!isSubscribed) {
    return (
      <PricingPlans onSubscribe={() => setShowCheckout(true)} />
    );
  }

  return (
    <div className="space-y-6 md:space-y-8 pb-12 animate-in fade-in duration-500">
      {/* Header */}
      <header>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl md:text-3xl font-black text-slate-800">Sua Assinatura</h1>
          <Crown className="text-amber-500 fill-amber-500" size={24} />
        </div>
        <p className="text-slate-500 text-sm md:text-base mt-1">Gerencie seu plano e descubra novas vantagens do FinanceFlow Pro.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        {/* Left Column - Plan Details and Features */}
        <div className="lg:col-span-8 space-y-6 md:space-y-8">
          
          {/* Main Active Plan Card */}
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[32px] md:rounded-[48px] p-6 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-indigo-600/20">
            <div className="relative z-10">
              <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 inline-block">
                Plano Ativo
              </span>
              <h2 className="text-3xl md:text-5xl font-black mb-8 md:mb-12 tracking-tight">FinanceFlow Pro</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-4">
                <div>
                  <p className="text-indigo-200 text-[10px] font-bold uppercase tracking-widest mb-2">Preço</p>
                  <p className="text-xl md:text-2xl font-black">R$ 29,90<span className="text-xs font-medium opacity-60">/mês</span></p>
                </div>
                <div>
                  <p className="text-indigo-200 text-[10px] font-bold uppercase tracking-widest mb-2">Próxima Cobrança</p>
                  <div className="flex items-center gap-2">
                    <p className="text-xl md:text-2xl font-black">15 Out, 2026</p>
                    <Calendar size={18} className="text-indigo-300" />
                  </div>
                </div>
                <div className="hidden sm:block">
                  <p className="text-indigo-200 text-[10px] font-bold uppercase tracking-widest mb-2">Método de Pagamento</p>
                  <div className="flex items-center gap-2">
                    <p className="text-xl md:text-2xl font-black">•••• 4412</p>
                    <CreditCard size={18} className="text-indigo-300" />
                  </div>
                </div>
              </div>
            </div>

            {/* Abstract Decorations */}
            <div className="absolute top-1/2 -translate-y-1/2 right-[-5%] opacity-10 md:opacity-20 pointer-events-none">
                <Zap size={240} className="text-white fill-white" />
            </div>
          </div>

          {/* Features Section */}
          <div className="bg-white rounded-[32px] md:rounded-[48px] p-6 md:p-12 border border-slate-100 shadow-sm space-y-8 md:space-y-10">
            <div className="flex items-center gap-3">
              <Sparkles className="text-indigo-600" size={24} />
              <h3 className="text-lg md:text-xl font-black text-slate-800">O que seu plano inclui</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              <FeatureItem icon={<Zap size={20} />} title="IA Insights Ilimitados" description="Análises profundas sem limites diários." bgColor="bg-indigo-50" iconColor="text-indigo-600" />
              <FeatureItem icon={<CreditCard size={20} />} title="Cartões Ilimitados" description="Gestão completa de múltiplos cartões." bgColor="bg-purple-50" iconColor="text-purple-600" />
              <FeatureItem icon={<PieChart size={20} />} title="Gráficos Pro" description="Dashboards avançados e comparativos." bgColor="bg-blue-50" iconColor="text-blue-600" />
              <FeatureItem icon={<ShieldCheck size={20} />} title="Suporte VIP" description="Atendimento em menos de 2 horas." bgColor="bg-emerald-50" iconColor="text-emerald-600" />
            </div>
          </div>
        </div>

        {/* Right Column - Status and Secondary Cards */}
        <div className="lg:col-span-4 space-y-6 md:space-y-8">
          <div className="bg-white rounded-[32px] md:rounded-[48px] p-8 md:p-10 border border-slate-100 shadow-sm flex flex-col items-center text-center space-y-6">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 shadow-inner">
               <Crown size={32} className="fill-amber-500/20" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-black text-slate-800">Membro Gold</h3>
              <p className="text-slate-500 text-sm leading-relaxed px-2">Acesso antecipado a novas funções inteligentes.</p>
            </div>

            <div className="w-full pt-4 space-y-3">
              <button onClick={() => setShowHistory(true)} className="w-full bg-[#0F172A] text-white py-4 md:py-5 rounded-2xl md:rounded-[24px] font-black hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-xl active:scale-95">
                <FileText size={18} />
                Faturas
              </button>
              <button onClick={() => setIsSubscribed(false)} className="w-full py-3 text-rose-500 font-bold hover:text-rose-600 transition-all text-sm underline underline-offset-8 decoration-rose-500/30">
                Cancelar Plano
              </button>
            </div>
          </div>

          <div className="bg-[#0F172A] rounded-[32px] md:rounded-[48px] p-8 md:p-10 text-white relative overflow-hidden group cursor-pointer shadow-lg">
            <div className="relative z-10 space-y-4">
              <span className="bg-white/10 text-indigo-300 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Indicação</span>
              <h3 className="text-xl font-black leading-tight">Ganhe 1 mês grátis indicando amigos!</h3>
              <button className="flex items-center gap-2 text-indigo-400 font-bold hover:text-white transition-all text-xs">
                <Share2 size={16} /> Link de convite <ChevronRight size={16} />
              </button>
            </div>
            <div className="absolute bottom-[-15%] right-[-5%] opacity-10 pointer-events-none">
               <Zap size={100} fill="white" />
            </div>
          </div>
        </div>
      </div>

      {showHistory && <InvoiceHistoryModal onClose={() => setShowHistory(false)} />}
    </div>
  );
};

const CheckoutScreen: React.FC<{ onBack: () => void, onConfirm: () => void }> = ({ onBack, onConfirm }) => {
  const [copying, setCopying] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const handleCopy = () => {
    setCopying(true);
    setTimeout(() => setCopying(false), 2000);
  };

  const handleVerify = () => {
    setVerifying(true);
    setTimeout(() => {
      onConfirm();
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-right duration-500 pb-20">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 font-bold hover:text-indigo-600 transition-colors"
      >
        <ChevronLeft size={20} />
        Voltar para planos
      </button>

      <div className="bg-white rounded-[48px] border border-slate-100 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="p-8 md:p-12 space-y-8">
          <div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">Pagamento PIX</h2>
            <p className="text-slate-500 font-medium mt-2">Escaneie o código abaixo para ativar o FinanceFlow Pro instantaneamente.</p>
          </div>

          <div className="bg-slate-50 p-8 rounded-[40px] flex flex-col items-center justify-center space-y-6 border border-slate-100">
             {/* Simulação de QR Code */}
             <div className="relative p-4 bg-white rounded-3xl shadow-lg border border-slate-100">
                <QrCode size={200} className="text-slate-800" strokeWidth={1.5} />
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl">
                      <Zap size={24} fill="white" />
                   </div>
                </div>
             </div>
             
             <div className="text-center space-y-1">
                <p className="text-sm font-black text-slate-800">Total a pagar: R$ 29,90</p>
                <div className="flex items-center gap-2 justify-center text-xs font-bold text-emerald-600">
                   <Loader2 size={12} className="animate-spin" />
                   Aguardando pagamento...
                </div>
             </div>
          </div>

          <div className="space-y-4">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Ou use o Pix Copia e Cola</p>
            <div className="flex items-center gap-2 p-4 bg-slate-50 rounded-2xl border border-slate-100">
               <input 
                 readOnly 
                 value="00020126580014BR.GOV.BCB.PIX0136d88f..." 
                 className="bg-transparent border-none text-xs font-mono text-slate-500 flex-1 focus:outline-none"
               />
               <button 
                onClick={handleCopy}
                className={`p-2 rounded-xl transition-all ${copying ? 'bg-emerald-500 text-white' : 'bg-white text-slate-400 hover:text-indigo-600'}`}
               >
                 {copying ? <CheckCircle2 size={18} /> : <Copy size={18} />}
               </button>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-8 md:p-12 flex flex-col justify-center border-l border-slate-100 space-y-10">
           <div className="space-y-6">
              <h3 className="text-xl font-black text-slate-800">Próximos passos</h3>
              <div className="space-y-6">
                <StepItem number="1" text="Abra o app do seu banco preferido." />
                <StepItem number="2" text="Selecione a opção de pagar via PIX / QR Code." />
                <StepItem number="3" text="Após o pagamento, clique no botão abaixo para liberar seu acesso." />
              </div>
           </div>

           <div className="space-y-4">
              <button 
                onClick={handleVerify}
                disabled={verifying}
                className="w-full py-5 rounded-[24px] bg-indigo-600 text-white font-black hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-indigo-600/20 active:scale-95 disabled:opacity-50"
              >
                {verifying ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Validando transação...
                  </>
                ) : (
                  <>
                    Já realizei o pagamento
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
              <p className="text-[10px] text-center text-slate-400 font-bold leading-relaxed px-4">
                O acesso é liberado automaticamente após a confirmação do banco, geralmente em menos de 10 segundos.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

const StepItem: React.FC<{ number: string, text: string }> = ({ number, text }) => (
  <div className="flex gap-4">
    <div className="shrink-0 w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs font-black text-indigo-600 shadow-sm">
      {number}
    </div>
    <p className="text-sm font-medium text-slate-600 leading-relaxed">{text}</p>
  </div>
);

const PricingPlans: React.FC<{ onSubscribe: () => void }> = ({ onSubscribe }) => (
  <div className="space-y-8 md:space-y-12 pb-12 animate-in slide-in-from-bottom duration-700">
    <header className="text-center max-w-2xl mx-auto space-y-4 px-4">
      <h1 className="text-3xl md:text-4xl font-black text-slate-800">Escolha o seu plano</h1>
      <p className="text-slate-500 text-sm md:text-lg">Desbloqueie o poder total da inteligência artificial financeira.</p>
    </header>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto px-4">
      <div className="bg-white rounded-[32px] md:rounded-[48px] p-8 md:p-10 border border-slate-100 shadow-sm flex flex-col h-full">
        <div className="space-y-4 mb-8">
          <h3 className="text-xl font-black text-slate-800">Basic</h3>
          <p className="text-4xl font-black text-slate-800">Grátis</p>
          <p className="text-slate-500 text-sm leading-relaxed">Organização básica para o dia a dia.</p>
        </div>
        <div className="space-y-4 flex-1">
          <PlanFeature text="Até 50 lançamentos mensais" active />
          <PlanFeature text="Relatório DRE simplificado" active />
          <PlanFeature text="Gráficos básicos" active />
          <PlanFeature text="1 conta bancária" active />
          <PlanFeature text="IA Insights limitados" active={false} />
        </div>
        <button className="mt-8 w-full py-4 rounded-2xl md:rounded-[24px] border-2 border-slate-100 text-slate-400 font-black cursor-not-allowed">
          Seu Plano
        </button>
      </div>

      <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[32px] md:rounded-[48px] p-8 md:p-10 text-white shadow-2xl relative overflow-hidden flex flex-col h-full transform transition-all duration-500 hover:shadow-indigo-500/20">
        <div className="absolute top-6 right-6 bg-amber-400 text-indigo-900 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">Popular</div>
        <div className="space-y-4 mb-8 relative z-10">
          <h3 className="text-xl font-black">FinanceFlow Pro</h3>
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-bold opacity-60">R$</span>
            <span className="text-5xl font-black tracking-tight">29,90</span>
            <span className="text-sm font-bold opacity-60">/mês</span>
          </div>
          <p className="text-indigo-100 text-sm leading-relaxed opacity-90">Controle absoluto com inteligência artificial ilimitada.</p>
        </div>
        <div className="space-y-4 flex-1 relative z-10">
          <PlanFeature text="Lançamentos ilimitados" active inverse />
          <PlanFeature text="DRE e Fluxo Avançado" active inverse />
          <PlanFeature text="Contas ilimitadas" active inverse />
          <PlanFeature text="IA Insights e Previsões" active inverse />
          <PlanFeature text="Suporte VIP" active inverse />
        </div>
        <button onClick={onSubscribe} className="mt-8 w-full py-4 md:py-5 rounded-2xl md:rounded-[24px] bg-white text-indigo-700 font-black hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 shadow-xl active:scale-95 relative z-10">
          Assinar Agora <ArrowRight size={20} />
        </button>
      </div>
    </div>
  </div>
);

const PlanFeature: React.FC<{ text: string; active: boolean; inverse?: boolean }> = ({ text, active, inverse }) => (
  <div className={`flex items-center gap-3 ${!active ? 'opacity-30' : ''}`}>
    <div className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${active ? (inverse ? 'bg-indigo-400 text-white' : 'bg-emerald-100 text-emerald-600') : 'bg-slate-100 text-slate-300'}`}>
      <CheckCircle2 size={12} strokeWidth={3} />
    </div>
    <span className={`text-sm font-semibold ${inverse ? 'text-white' : (active ? 'text-slate-700' : 'text-slate-400 line-through')}`}>{text}</span>
  </div>
);

const InvoiceHistoryModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const invoices = [
    { id: 'INV-2026-003', date: '15 Mai, 2026', amount: 'R$ 29,90', status: 'pago' },
    { id: 'INV-2026-002', date: '15 Abr, 2026', amount: 'R$ 29,90', status: 'pago' },
    { id: 'INV-2026-001', date: '15 Mar, 2026', amount: 'R$ 29,90', status: 'pago' },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-[32px] md:rounded-[40px] shadow-2xl relative flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-6 md:p-8 border-b border-slate-50 flex items-center justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-black text-slate-800">Histórico</h2>
            <p className="text-slate-400 text-xs md:text-sm">Comprovantes de pagamento.</p>
          </div>
          <button onClick={onClose} className="p-2 md:p-3 bg-slate-50 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-4 md:p-8 space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
          {invoices.map((inv) => (
            <div key={inv.id} className="group bg-slate-50/50 p-4 md:p-6 rounded-2xl md:rounded-[32px] border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="hidden sm:block bg-white p-3 rounded-2xl text-indigo-600 shadow-sm">
                  <FileText size={20} />
                </div>
                <div>
                  <p className="font-black text-slate-800 text-sm tracking-tight">{inv.id}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{inv.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 md:gap-6">
                <p className="font-black text-slate-800 text-sm md:text-base">{inv.amount}</p>
                <button className="p-2.5 bg-white rounded-xl md:rounded-2xl text-slate-400 hover:text-indigo-600 shadow-sm border border-transparent hover:border-indigo-100 transition-all">
                  <Download size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="p-6 md:p-8 border-t border-slate-50 flex justify-center">
          <button onClick={onClose} className="w-full sm:w-auto px-10 py-4 bg-indigo-600 text-white font-black rounded-xl md:rounded-2xl hover:bg-indigo-700 shadow-lg active:scale-95">Fechar</button>
        </div>
      </div>
    </div>
  );
};

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description, bgColor, iconColor }) => (
  <div className="flex items-start gap-4 md:gap-5">
    <div className={`shrink-0 ${bgColor} ${iconColor} p-3 md:p-4 rounded-xl md:rounded-2xl shadow-sm`}>
      {icon}
    </div>
    <div className="min-w-0">
      <h4 className="font-black text-slate-800 text-sm md:text-base">{title}</h4>
      <p className="text-slate-500 text-[11px] md:text-xs leading-relaxed font-medium line-clamp-2 md:line-clamp-none">
        {description}
      </p>
    </div>
  </div>
);
