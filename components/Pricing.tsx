
import React from 'react';
import { Check, ShieldCheck, Zap, Infinity, ArrowRight } from 'lucide-react';

const PLAN_MENSAL = "https://pay.cakto.com.br/n2itqkw_747818?affiliate=mFL9XPbn";
const PLAN_VITALICIO = "https://pay.cakto.com.br/apy6dnk?affiliate=mFL9XPbn";

export const Pricing: React.FC = () => {
  return (
    <div className="py-20 px-4 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto text-center mb-16">
        <h2 className="text-sm font-bold text-green-600 tracking-[0.3em] uppercase mb-4">Escolha seu Nível de Acesso</h2>
        <h1 className="text-4xl md:text-6xl font-black text-blue-900 uppercase italic tracking-tighter">
          PLANOS DE <span className="text-transparent bg-clip-text bg-patriotic-gradient">INTELIGÊNCIA</span>
        </h1>
        <p className="mt-6 text-slate-500 font-medium text-lg max-w-2xl mx-auto">
          Selecione abaixo o plano que melhor se adapta à sua jornada patriota. O acesso é liberado instantaneamente após a confirmação.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* PLANO MENSAL */}
        <div className="bg-white rounded-[3rem] p-10 shadow-xl border border-slate-100 flex flex-col relative overflow-hidden group hover:border-blue-200 transition-all">
          <div className="mb-8">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
              <Zap size={30} />
            </div>
            <h3 className="text-2xl font-black text-blue-900 uppercase italic">Acesso Mensal</h3>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Renovação a cada 30 dias</p>
          </div>

          <div className="mb-10">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-blue-900">R$</span>
              <span className="text-6xl font-black text-blue-900 tracking-tighter">19,90</span>
              <span className="text-slate-400 font-bold">/mês</span>
            </div>
          </div>

          <ul className="space-y-4 mb-12 flex-grow">
            {['Acesso total ao Portal VIP', 'Notícias em tempo real', 'Análises de IA Semanais', 'Suporte VIP via WhatsApp'].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-600 font-medium">
                <Check size={18} className="text-green-500" /> {item}
              </li>
            ))}
          </ul>

          <a 
            href={PLAN_MENSAL}
            className="w-full py-6 bg-slate-100 text-slate-600 font-black rounded-2xl text-center hover:bg-blue-600 hover:text-white transition-all uppercase italic tracking-tighter"
          >
            ASSINAR MENSAL
          </a>
        </div>

        {/* PLANO VITALÍCIO */}
        <div className="bg-blue-900 rounded-[3rem] p-10 shadow-2xl shadow-blue-200 flex flex-col relative overflow-hidden transform md:scale-105 border-4 border-yellow-400">
          <div className="absolute top-0 right-0 bg-yellow-400 text-blue-900 font-black text-[10px] px-6 py-2 uppercase tracking-widest rounded-bl-2xl">
            MAIS VENDIDO
          </div>
          
          <div className="mb-8">
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-yellow-400 mb-6 backdrop-blur-xl">
              <Infinity size={30} />
            </div>
            <h3 className="text-2xl font-black text-white uppercase italic">Acesso Vitalício</h3>
            <p className="text-blue-300 font-bold text-xs uppercase tracking-widest mt-1 text-glow">Pagamento Único</p>
          </div>

          <div className="mb-10">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-blue-200">R$</span>
              <span className="text-6xl font-black text-white tracking-tighter">49,90</span>
              <span className="text-yellow-400/80 font-bold text-sm uppercase ml-2">Sem Mensalidades</span>
            </div>
          </div>

          <ul className="space-y-4 mb-12 flex-grow">
            {[
              'Acesso VITALÍCIO sem expiração', 
              'Relatórios Ultra-Secretos 2026', 
              'Prioridade na Central de IA', 
              'Suporte Premium Dedicado',
              'Material de Campanha Exclusivo'
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-blue-100 font-medium">
                <ShieldCheck size={18} className="text-yellow-400" /> {item}
              </li>
            ))}
          </ul>

          <a 
            href={PLAN_VITALICIO}
            className="w-full py-6 bg-yellow-400 text-blue-900 font-black rounded-2xl text-center hover:bg-white hover:scale-105 transition-all uppercase italic tracking-tighter shadow-xl"
          >
            GARANTIR ACESSO ETERNO
          </a>
        </div>
      </div>

      <div className="mt-16 text-center">
        <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] flex items-center justify-center gap-2">
          <ShieldCheck size={14} /> Ambiente de pagamento 100% seguro e criptografado
        </p>
      </div>
    </div>
  );
};
