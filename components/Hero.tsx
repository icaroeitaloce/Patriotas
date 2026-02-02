
import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onNavigate: (tab: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center pt-12 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="lg:w-1/2 text-center lg:text-left z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-700 font-bold text-sm mb-6 border border-green-200">
            <CheckCircle2 size={16} /> A CAMINHADA FOI UM SUCESSO
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-blue-900 leading-tight mb-6">
            O Futuro do Brasil <br />
            <span className="text-transparent bg-clip-text bg-patriotic-gradient">Começa Agora</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl">
            Graças a Deus a nossa caminhada ocorreu bem! Fique por dentro de tudo sobre as eleições 
            e as novidades de 2026 em primeira mão. Se você é patriota de verdade, junte-se a nós.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button 
              onClick={() => onNavigate('pricing')}
              className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 group"
            >
              QUERO PARTICIPAR <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => document.getElementById('news')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 border-2 border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all"
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
              src="https://i.ibb.co/rDvLFD5/A-caminhada-iniciada-pelo-deputado-federal-Nikolas-Ferreira-partindo-de-Minas-Gerais-em-dire-o.jpg" 
              alt="Caminhada Nikolas Ferreira 2026" 
              className="w-full h-[550px] object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-blue-950/90 via-blue-900/60 to-transparent text-white z-20 text-center lg:text-left">
              <p className="text-sm font-bold text-green-400 uppercase tracking-[0.2em] mb-2">Novo Horizonte</p>
              <h3 className="text-3xl font-black italic">A CAMINHADA PELA LIBERDADE</h3>
              <p className="text-blue-100 mt-2 opacity-90">Rumo a 2026 com fé e coragem.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
