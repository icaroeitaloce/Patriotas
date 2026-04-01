
import React from 'react';
import { Calendar, ChevronRight } from 'lucide-react';

interface NewsProps {
  onNavigate: (tab: string) => void;
}

const NEWS_DATA = [
  {
    id: 1,
    title: "Balanço do Governo: O impacto das reformas na economia",
    excerpt: "Dados recentes mostram o crescimento do PIB e a redução do desemprego através de políticas de liberdade econômica.",
    date: "23 de Março, 2026",
    category: "Economia",
    image: "https://i.ibb.co/8LjDx9n6/imagem-2026-03-23-205304278.png"
  },
  {
    id: 2,
    title: "Liberdade de Expressão: A luta contra a censura em Brasília",
    excerpt: "Parlamentares se mobilizam para garantir o direito à livre manifestação e o combate ao autoritarismo.",
    date: "22 de Março, 2026",
    category: "Política",
    image: "https://i.ibb.co/6cGY0yDz/imagem-2026-03-23-205350616.png"
  },
  {
    id: 3,
    title: "Infraestrutura: As grandes obras que transformam o país",
    excerpt: "Novas ferrovias e rodovias estão integrando o Brasil e reduzindo custos logísticos para o agronegócio.",
    date: "21 de Março, 2026",
    category: "Infraestrutura",
    image: "https://i.ibb.co/fV2QHd5n/image.png"
  }
];

export const NewsSection: React.FC<NewsProps> = ({ onNavigate }) => {
  return (
    <section id="news" className="bg-black py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-xs font-black text-patriotic-green tracking-[0.4em] uppercase mb-4">INTELIGÊNCIA DE CAMPO</h2>
            <h3 className="text-5xl font-black text-white uppercase italic tracking-tighter">ARQUIVOS <span className="text-patriotic-yellow">DESCLASSIFICADOS</span></h3>
          </div>
          <button 
            onClick={() => onNavigate('pricing')}
            className="text-patriotic-yellow font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:text-white transition-colors group"
          >
            VER TODOS OS ARQUIVOS <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {NEWS_DATA.map((news) => (
            <article key={news.id} className="bg-zinc-900/50 rounded-sm overflow-hidden border border-white/5 hover:border-patriotic-yellow/30 transition-all duration-500 group relative">
              <div className="h-64 overflow-hidden relative">
                <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="absolute top-6 left-6 bg-black/80 backdrop-blur-md text-white px-4 py-1.5 rounded-sm text-[10px] font-black uppercase tracking-widest border border-white/10">
                  {news.category}
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-6">
                  <span className="flex items-center gap-1.5"><Calendar size={14} className="text-patriotic-green" /> {news.date}</span>
                </div>
                <h4 className="text-2xl font-black text-white mb-4 group-hover:text-patriotic-yellow transition-colors leading-tight uppercase italic tracking-tighter">
                  {news.title}
                </h4>
                <p className="text-zinc-400 mb-8 line-clamp-2 text-sm leading-relaxed">
                  {news.excerpt}
                </p>
                <button 
                  onClick={() => onNavigate('pricing')}
                  className="w-full py-4 bg-white/5 border border-white/10 rounded-sm text-white font-black uppercase tracking-widest text-xs hover:bg-patriotic-yellow hover:text-black transition-all duration-300 italic"
                >
                  DESBLOQUEAR CONTEÚDO
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
