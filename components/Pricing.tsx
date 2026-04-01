
import React from 'react';
import { Check, ShieldCheck, Zap, Infinity, ArrowRight } from 'lucide-react';

const PLAN_MENSAL = "https://pay.cakto.com.br/n2itqkw_747818?affiliate=mFL9XPbn";
const PLAN_VITALICIO = "https://pay.cakto.com.br/apy6dnk?affiliate=mFL9XPbn";

export const Pricing: React.FC = () => {
  return (
    <div className="py-32 px-4 bg-black min-h-screen relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,155,58,0.1)_0%,transparent_70%)] pointer-events-none"></div>
      
      <div className="max-w-5xl mx-auto text-center mb-24 relative z-10">
        <h2 className="text-xs font-black text-patriotic-green tracking-[0.5em] uppercase mb-6">NÍVEL DE ACESSO</h2>
        <h1 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter">
          PLANOS DE <span className="text-transparent bg-clip-text bg-gradient-to-r from-patriotic-yellow to-white">INTELIGÊNCIA</span>
        </h1>
        <p className="mt-8 text-zinc-500 font-medium text-lg max-w-2xl mx-auto leading-relaxed">
          Selecione seu nível de autorização. O acesso à Central de Inteligência é liberado instantaneamente após a confirmação.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto relative z-10">
        {/* PLANO MENSAL */}
        <div className="bg-zinc-900 rounded-sm p-12 border border-white/5 flex flex-col relative overflow-hidden group hover:border-white/20 transition-all duration-500">
          <div className="mb-10">
            <div className="w-16 h-16 bg-white/5 rounded-sm flex items-center justify-center text-zinc-400 mb-8 border border-white/5">
              <Zap size={32} />
            </div>
            <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">Acesso Mensal</h3>
            <p className="text-zinc-600 font-black text-[10px] uppercase tracking-[0.3em] mt-2">RENOVAÇÃO AUTOMÁTICA</p>
          </div>

          <div className="mb-12">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-zinc-500 italic">R$</span>
              <span className="text-7xl font-black text-white tracking-tighter">19,90</span>
              <span className="text-zinc-600 font-black uppercase text-xs tracking-widest">/MÊS</span>
            </div>
          </div>

          <ul className="space-y-6 mb-16 flex-grow">
            {['Acesso total ao Jornal VIP', 'Notícias em tempo real', 'Análises de IA Semanais', 'Suporte via WhatsApp'].map((item, i) => (
              <li key={i} className="flex items-center gap-4 text-zinc-400 font-bold text-sm uppercase tracking-tight">
                <Check size={20} className="text-patriotic-green" /> {item}
              </li>
            ))}
          </ul>

          <a 
            href={PLAN_MENSAL}
            className="w-full py-7 bg-white/5 text-white font-black rounded-sm text-center hover:bg-white hover:text-black transition-all duration-300 uppercase italic tracking-tighter text-lg border border-white/10"
          >
            ASSINAR MENSAL
          </a>
        </div>

        {/* PLANO VITALÍCIO */}
        <div className="bg-zinc-900 rounded-sm p-12 shadow-[0_0_80px_rgba(254,221,0,0.15)] flex flex-col relative overflow-hidden transform md:scale-110 border-2 border-patriotic-yellow">
          <div className="absolute top-0 right-0 bg-patriotic-yellow text-black font-black text-[10px] px-8 py-3 uppercase tracking-[0.3em] italic">
            RECOMENDADO
          </div>
          
          <div className="mb-10">
            <div className="w-16 h-16 bg-patriotic-yellow/10 rounded-sm flex items-center justify-center text-patriotic-yellow mb-8 border border-patriotic-yellow/20">
              <Infinity size={32} />
            </div>
            <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter">Acesso Vitalício</h3>
            <p className="text-patriotic-yellow font-black text-[10px] uppercase tracking-[0.3em] mt-2 text-glow">PAGAMENTO ÚNICO</p>
          </div>

          <div className="mb-12">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-patriotic-yellow italic">R$</span>
              <span className="text-7xl font-black text-white tracking-tighter">49,90</span>
              <span className="text-patriotic-yellow/60 font-black uppercase text-xs tracking-widest ml-2">SEM MENSALIDADES</span>
            </div>
          </div>

          <ul className="space-y-6 mb-16 flex-grow">
            {[
              'Acesso VITALÍCIO sem expiração', 
              'Relatórios Ultra-Secretos 2026', 
              'Prioridade na Central de IA', 
              'Suporte Premium Dedicado',
              'Material de Campanha Exclusivo'
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-4 text-white font-black text-sm uppercase tracking-tight">
                <ShieldCheck size={20} className="text-patriotic-yellow" /> {item}
              </li>
            ))}
          </ul>

          <a 
            href={PLAN_VITALICIO}
            className="w-full py-8 bg-patriotic-yellow text-black font-black rounded-sm text-center hover:bg-white transition-all duration-300 uppercase italic tracking-tighter text-xl shadow-[0_10px_40px_rgba(254,221,0,0.3)]"
          >
            GARANTIR ACESSO ETERNO
          </a>
          <div className="mt-6 text-center">
            <p className="text-[10px] font-black text-red-500 uppercase tracking-widest animate-pulse">
              ⚠️ RESTAM APENAS 14 VAGAS VITALÍCIAS HOJE
            </p>
          </div>
        </div>
      </div>

      <div className="mt-32 text-center">
        <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-3">
          <ShieldCheck size={16} className="text-patriotic-green" /> AMBIENTE 100% CRIPTOGRAFADO E SEGURO
        </p>
      </div>
    </div>
  );
};
