
import React, { useState } from 'react';
import { Camera, User, Mail, MapPin, Lock, ShieldCheck, Lightbulb, CheckCircle2, Save, RotateCw } from 'lucide-react';

export const ProfileView: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: 'João Silva',
    email: 'joao.silva@exemplo.com',
    address: 'Av. Paulista, 1000 - São Paulo, SP',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Perfil atualizado com sucesso!');
    }, 1500);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatar(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500 pb-12">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight leading-tight">Meu Perfil</h1>
        <p className="text-slate-500 text-sm font-medium">Gerencie suas informações e segurança da conta.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        
        {/* Left Column: Form */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-[32px] md:rounded-[40px] border border-slate-100 shadow-sm p-6 md:p-10">
            
            {/* Avatar Section */}
            <div className="flex flex-col items-center md:items-start md:flex-row gap-6 md:gap-8 mb-10 border-b border-slate-50 pb-10">
              <div className="relative group">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-[24px] md:rounded-[32px] bg-slate-100 flex items-center justify-center overflow-hidden border-4 border-white shadow-xl">
                  {avatar ? (
                    <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User size={48} className="text-slate-300" />
                  )}
                </div>
                <label className="absolute -bottom-2 -right-2 p-2.5 bg-indigo-600 text-white rounded-xl shadow-lg cursor-pointer hover:bg-indigo-700 transition-all active:scale-90 group-hover:scale-110">
                  <Camera size={18} />
                  <input type="file" className="hidden" onChange={handleAvatarChange} accept="image/*" />
                </label>
              </div>
              <div className="text-center md:text-left pt-2">
                <h3 className="text-lg font-black text-slate-800">{formData.name}</h3>
                <p className="text-sm font-medium text-slate-400">Plano Pro desde Jan, 2026</p>
                <div className="mt-3 flex flex-wrap justify-center md:justify-start gap-2">
                   <span className="bg-indigo-50 text-indigo-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-indigo-100">Usuário Ativo</span>
                   <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest border border-emerald-100">Verificado</span>
                </div>
              </div>
            </div>

            {/* General Info */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest block px-1">Nome Completo</label>
                  <div className="relative group">
                    <User size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full pl-14 pr-6 py-4 rounded-2xl md:rounded-3xl border border-slate-100 bg-slate-50 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:bg-white transition-all font-bold text-slate-700 text-sm md:text-base"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest block px-1">E-mail</label>
                  <div className="relative group">
                    <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full pl-14 pr-6 py-4 rounded-2xl md:rounded-3xl border border-slate-100 bg-slate-50 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:bg-white transition-all font-bold text-slate-700 text-sm md:text-base"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest block px-1">Endereço Residencial</label>
                <div className="relative group">
                  <MapPin size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
                  <input 
                    type="text" 
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full pl-14 pr-6 py-4 rounded-2xl md:rounded-3xl border border-slate-100 bg-slate-50 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:bg-white transition-all font-bold text-slate-700 text-sm md:text-base"
                  />
                </div>
              </div>
            </div>

            {/* Security Section */}
            <div className="mt-12 pt-10 border-t border-slate-50 space-y-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                  <Lock size={20} />
                </div>
                <h3 className="text-lg font-black text-slate-800">Segurança da Conta</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2">
                  <label className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest block px-1">Senha Atual</label>
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    value={formData.currentPassword}
                    onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
                    className="w-full px-6 py-4 rounded-2xl md:rounded-3xl border border-slate-100 bg-slate-50 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:bg-white transition-all font-bold text-slate-700 text-sm md:text-base"
                  />
                </div>
                <div className="space-y-2">
                   <label className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest block px-1">Nova Senha</label>
                   <input 
                    type="password" 
                    placeholder="Min. 8 caracteres"
                    value={formData.newPassword}
                    onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                    className="w-full px-6 py-4 rounded-2xl md:rounded-3xl border border-slate-100 bg-slate-50 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:bg-white transition-all font-bold text-slate-700 text-sm md:text-base"
                  />
                </div>
              </div>
            </div>

            <div className="mt-12 flex justify-end">
              <button 
                onClick={handleSave}
                disabled={loading}
                className="w-full sm:w-auto bg-indigo-600 text-white px-10 py-5 rounded-2xl md:rounded-[24px] font-black hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-indigo-600/20 active:scale-95 disabled:opacity-50"
              >
                {loading ? <RotateCw className="animate-spin" size={20} /> : <Save size={20} />}
                {loading ? 'Salvando...' : 'Salvar Alterações'}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Tips & Status */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Account Status */}
          <div className="bg-[#0F172A] p-8 md:p-10 rounded-[32px] md:rounded-[40px] text-white shadow-xl relative overflow-hidden group">
            <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                <div className="bg-white/10 p-3 rounded-2xl">
                  <ShieldCheck size={24} className="text-indigo-400" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-300">Nível de Segurança</span>
              </div>
              <div>
                <div className="flex justify-between items-end mb-2">
                  <p className="text-2xl font-black">Forte</p>
                  <p className="text-xs font-bold text-indigo-400">85%</p>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full w-[85%]" />
                </div>
              </div>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                Seu perfil está bem protegido. Para atingir 100%, ative a autenticação em dois fatores nas configurações avançadas.
              </p>
            </div>
          </div>

          {/* Dicas Card */}
          <div className="bg-white rounded-[32px] md:rounded-[40px] p-8 md:p-10 border border-slate-100 shadow-sm space-y-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-50 text-amber-500 rounded-lg">
                <Lightbulb size={20} />
              </div>
              <h3 className="text-lg font-black text-slate-800">Dicas de Perfil</h3>
            </div>

            <div className="space-y-6">
              <TipItem 
                title="Foto de Perfil" 
                text="Use uma foto clara. Isso ajuda a identificar sua conta em múltiplos dispositivos."
              />
              <TipItem 
                title="Senhas Seguras" 
                text="Combine letras maiúsculas, números e símbolos. Evite datas de nascimento."
              />
              <TipItem 
                title="E-mail Atualizado" 
                text="Mantenha seu e-mail de recuperação sempre acessível para evitar bloqueios."
              />
            </div>

            <div className="pt-4">
              <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100/50 flex items-start gap-4">
                <CheckCircle2 className="text-emerald-500 shrink-0" size={20} />
                <p className="text-emerald-800 text-xs font-bold leading-relaxed">
                  Sua conta foi verificada com sucesso via SMS em 12/01/2026.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TipItem: React.FC<{title: string, text: string}> = ({ title, text }) => (
  <div className="space-y-1">
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
    <p className="text-slate-600 text-xs font-semibold leading-relaxed">{text}</p>
  </div>
);
