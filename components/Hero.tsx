
import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onNavigate: (tab: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center pt-12 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="lg:w-1/2 text-center lg:text-left z-10 lg:pr-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-bold text-sm mb-6 border border-blue-200">
            <ShieldCheck size={16} className="text-yellow-500" /> NOTÍCIAS DE BRASÍLIA EM TEMPO REAL
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-extrabold text-blue-900 leading-tight mb-6">
            A Verdade Sobre o <br />
            <span className="text-transparent bg-clip-text bg-patriotic-gradient">Governo Bolsonaro</span>
          </h1>
          
          <p className="text-base md:text-lg text-slate-800 font-medium mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            O Jornal Patriota é a sua fonte definitiva de informações sobre os bastidores do governo e a luta pela liberdade no Brasil. 
            <span className="text-blue-600 font-bold"> Notícias exclusivas e análises sem filtros</span>, 
            direto da nossa Central de Inteligência para você.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button 
              onClick={() => onNavigate('pricing')}
              className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group uppercase tracking-tight"
            >
              QUERO MEU ACESSO VIP <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => document.getElementById('news')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all uppercase text-sm tracking-wide"
            >
              VER ÚLTIMAS NOTÍCIAS
            </button>
          </div>
        </div>
        
        <div className="lg:w-1/2 mt-12 lg:mt-0 relative">
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-yellow-200 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-green-200 rounded-full blur-3xl opacity-30"></div>
          
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform lg:rotate-2 hover:rotate-0 transition-transform duration-500">
            <img 
              src="https://i.ibb.co/8LjDx9n6/imagem-2026-03-23-205304278.png" 
              alt="Governo Bolsonaro Notícias" 
              className="w-full h-[550px] object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-blue-950/90 via-blue-900/60 to-transparent text-white z-20 text-center lg:text-left">
              <p className="text-sm font-bold text-green-400 uppercase tracking-[0.2em] mb-2">Edição Especial</p>
              <h3 className="text-3xl font-black italic uppercase">A VOZ DA VERDADE</h3>
              <p className="text-blue-100 mt-2 opacity-90">Informação de qualidade para o povo brasileiro.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
