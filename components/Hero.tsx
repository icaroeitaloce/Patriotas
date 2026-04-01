
import React from 'react';
import { ArrowRight, ShieldAlert, EyeOff, Lock, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onNavigate: (tab: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative bg-black overflow-hidden py-24 lg:py-32">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-patriotic-green/10 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/2 -right-24 w-96 h-96 bg-patriotic-blue/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 left-1/4 w-full h-px bg-gradient-to-r from-transparent via-patriotic-yellow/20 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/30 text-red-500 border border-red-900/50 text-xs font-black tracking-widest uppercase mb-8 animate-pulse"
          >
            <AlertTriangle size={14} /> CONTEÚDO SOB RISCO DE CENSURA
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] mb-8 tracking-tighter uppercase italic"
          >
            O MATERIAL QUE ESTÃO <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-patriotic-yellow via-white to-patriotic-green">TENTANDO REMOVER</span> <br />
            DA INTERNET
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-lg md:text-xl text-zinc-400 font-medium mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Acesse agora a Central de Inteligência do <span className="text-white font-bold">Jornal Patriota</span>. 
            Documentos, vídeos e fatos que a grande mídia se recusa a mostrar. 
            <span className="block mt-2 text-patriotic-yellow font-bold uppercase tracking-widest text-sm">Exclusividade absoluta. Segredo de estado.</span>
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 w-full max-w-md"
          >
            <button 
              onClick={() => onNavigate('pricing')}
              className="group relative flex-1 px-8 py-6 bg-patriotic-yellow text-black font-black rounded-sm shadow-[0_0_30px_rgba(254,221,0,0.3)] hover:shadow-[0_0_50px_rgba(254,221,0,0.5)] transition-all duration-300 uppercase tracking-tighter italic text-xl flex items-center justify-center gap-3 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
              ACESSAR AGORA <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-16 flex flex-wrap justify-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500"
          >
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
              <Lock size={14} /> Criptografia 256-bit
            </div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
              <EyeOff size={14} /> Navegação Anônima
            </div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
              <ShieldAlert size={14} /> Servidores Blindados
            </div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-patriotic-yellow animate-pulse">
              <div className="w-2 h-2 bg-patriotic-yellow rounded-full"></div>
              1.247 PATRIOTAS CONECTADOS AGORA
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative scanline effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
    </section>
  );
};
