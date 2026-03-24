
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
    <section id="news" className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-sm font-bold text-green-600 tracking-widest uppercase mb-2">Jornalismo Independente</h2>
            <h3 className="text-4xl font-extrabold text-blue-900">Notícias do Dia</h3>
          </div>
          <button 
            onClick={() => onNavigate('pricing')}
            className="text-blue-600 font-bold flex items-center gap-1 hover:underline"
          >
            Ver todas as notícias <ChevronRight size={20} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {NEWS_DATA.map((news) => (
            <article key={news.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100 group">
              <div className="h-56 overflow-hidden relative">
                <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-patriotic-gradient text-white px-3 py-1 rounded-full text-xs font-bold uppercase">
                  {news.category}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {news.date}</span>
                </div>
                <h4 className="text-xl font-bold text-blue-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {news.title}
                </h4>
                <p className="text-gray-600 mb-6 line-clamp-2">
                  {news.excerpt}
                </p>
                <button 
                  onClick={() => onNavigate('pricing')}
                  className="w-full py-3 bg-gray-50 rounded-lg text-blue-600 font-bold hover:bg-blue-50 transition-colors"
                >
                  Ler Reportagem Completa
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
