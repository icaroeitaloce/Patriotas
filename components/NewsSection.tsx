
import React from 'react';
import { Calendar, ChevronRight } from 'lucide-react';

const CHECKOUT_URL = "https://go.ironpayapp.com.br/vwtyajrg8t";

const NEWS_DATA = [
  {
    id: 1,
    title: "A Caminhada: Um marco para a mobilização de 2026",
    excerpt: "Milhares de brasileiros se reuniram para mostrar a força da nossa união em Minas Gerais.",
    date: "15 de Outubro, 2024",
    category: "Caminhada",
    image: "https://i.ibb.co/j9yMYGbS/A-caminhada-iniciada-pelo-deputado-federal-Nikolas-Ferreira-partindo-de-Minas-Gerais-em-dire-o-1.jpg"
  },
  {
    id: 2,
    title: "Planejamento Estratégico: O que esperar das próximas eleições",
    excerpt: "Analistas debatem o cenário político e as principais pautas que defenderemos nos próximos meses.",
    date: "12 de Outubro, 2024",
    category: "Eleições",
    image: "https://i.ibb.co/rDvLFD5/A-caminhada-iniciada-pelo-deputado-federal-Nikolas-Ferreira-partindo-de-Minas-Gerais-em-dire-o.jpg"
  },
  {
    id: 3,
    title: "Novos Comitês: Como se tornar um voluntário em sua cidade",
    excerpt: "Estamos expandindo nossa rede de apoio por todo o Brasil. Saiba como organizar um núcleo local.",
    date: "10 de Outubro, 2024",
    category: "Organização",
    image: "https://i.ibb.co/j9yMYGbS/A-caminhada-iniciada-pelo-deputado-federal-Nikolas-Ferreira-partindo-de-Minas-Gerais-em-dire-o-1.jpg"
  }
];

export const NewsSection: React.FC = () => {
  const handleReadMore = () => {
    window.location.href = CHECKOUT_URL;
  };

  return (
    <section id="news" className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-sm font-bold text-green-600 tracking-widest uppercase mb-2">Fique por dentro</h2>
            <h3 className="text-4xl font-extrabold text-blue-900">Últimas Atualizações</h3>
          </div>
          <button 
            onClick={handleReadMore}
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
                  onClick={handleReadMore}
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
