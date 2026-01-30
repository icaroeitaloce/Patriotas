
import React, { useState, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Newspaper, TrendingUp, Search, User, Bell, Share2, MessageSquare, Play, ShieldAlert } from 'lucide-react';

interface NewsItem {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  imageUrl: string;
}

const NEW_IMAGES = [
  "https://i.ibb.co/j9yMYGbS/A-caminhada-iniciada-pelo-deputado-federal-Nikolas-Ferreira-partindo-de-Minas-Gerais-em-dire-o-1.jpg",
  "https://i.ibb.co/rDvLFD5/A-caminhada-iniciada-pelo-deputado-federal-Nikolas-Ferreira-partindo-de-Minas-Gerais-em-dire-o.jpg"
];

export const Portal: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchNews = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Gere 6 notícias fictícias mas realistas sobre a política brasileira atual focadas na direita, incluindo Nikolas Ferreira, Bolsonaro, Tarcísio de Freitas e o cenário de 2026. Retorne um JSON seguindo o esquema NewsItem.",
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                excerpt: { type: Type.STRING },
                category: { type: Type.STRING },
                date: { type: Type.STRING },
                author: { type: Type.STRING },
                imageUrl: { type: Type.STRING, description: "URL de imagem placeholder temática" }
              },
              required: ["title", "excerpt", "category", "date", "author", "imageUrl"]
            }
          }
        }
      });

      let parsedNews = JSON.parse(response.text);
      // Aplicar as imagens reais fornecidas pelo usuário
      parsedNews = parsedNews.map((item: NewsItem, idx: number) => ({
        ...item,
        imageUrl: NEW_IMAGES[idx % 2]
      }));
      setNews(parsedNews);
    } catch (error) {
      console.error("Error fetching news:", error);
      setNews([
        {
          title: "Nikolas Ferreira Mobiliza Milhares em Caminhada Histórica",
          excerpt: "O deputado federal reforça sua base e sinaliza forte atuação para o pleito de 2026.",
          category: "Mobilização",
          date: "Hoje, 10:45",
          author: "Redação VIP",
          imageUrl: NEW_IMAGES[0]
        },
        {
          title: "Bolsonaro Analisa Cenário Político em Nova Reunião",
          excerpt: "Líder conservador discute estratégias para fortalecer partidos aliados nas capitais.",
          category: "Estratégia",
          date: "Hoje, 09:12",
          author: "Carlos Santos",
          imageUrl: NEW_IMAGES[1]
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen">
      <header className="bg-blue-900 text-white border-b-4 border-green-500 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Newspaper size={28} className="text-green-400" />
            <h1 className="text-xl font-black tracking-tighter uppercase italic">
              PORTAL <span className="text-green-400">MEMBRO VIP</span>
            </h1>
          </div>
          
          <div className="hidden md:flex flex-grow max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" size={18} />
              <input 
                type="text" 
                placeholder="Pesquisar nos arquivos secretos..."
                className="w-full bg-blue-800 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-green-400 outline-none placeholder-blue-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-blue-800 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="h-8 w-px bg-blue-700"></div>
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center font-bold text-blue-900 group-hover:bg-yellow-400 transition-colors">P</div>
              <span className="text-sm font-bold hidden sm:inline">Patriota</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          <aside className="hidden lg:block lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-blue-900 flex items-center gap-2 mb-4">
                <TrendingUp size={18} className="text-red-500" /> Em Alta agora
              </h3>
              <ul className="space-y-4">
                {[
                  "#Caminhada2026",
                  "Liberdade de Expressão",
                  "Nikolas Ferreira",
                  "Voto Auditável",
                  "Economia Brasil"
                ].map((tag, i) => (
                  <li key={i} className="flex items-center justify-between group cursor-pointer">
                    <span className="text-sm text-gray-600 group-hover:text-blue-600 transition-colors font-medium">{tag}</span>
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-400">+{Math.floor(Math.random() * 50)}k</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-red-50 border border-red-100 rounded-xl p-6 text-red-900 shadow-sm">
              <div className="flex items-center gap-2 font-bold mb-2">
                <ShieldAlert size={20} className="text-red-600" /> ALERTA DE SEGURANÇA
              </div>
              <p className="text-xs text-red-700 leading-relaxed">
                Este portal é monitorado. Compartilhar prints ou informações restritas resultará em banimento imediato da conta VIP.
              </p>
            </div>
          </aside>

          <main className="lg:col-span-2 space-y-6">
            {loading ? (
              <div className="space-y-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="bg-white rounded-xl p-4 shadow-sm animate-pulse">
                    <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="w-3/4 h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="w-full h-4 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            ) : (
              news.map((item, index) => (
                <article key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
                  <div className="relative h-64 sm:h-80 overflow-hidden">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg">
                      {item.category}
                    </div>
                    {index === 0 && (
                      <div className="absolute bottom-4 right-4 bg-red-600 text-white p-3 rounded-full shadow-xl animate-pulse cursor-pointer">
                        <Play fill="white" size={20} />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-4">
                      <span className="flex items-center gap-1"><User size={14} /> {item.author}</span>
                      <span className="h-1 w-1 bg-gray-300 rounded-full"></span>
                      <span>{item.date}</span>
                    </div>
                    <h2 className="text-2xl font-black text-blue-900 mb-3 leading-tight group-hover:text-blue-700 transition-colors cursor-pointer">
                      {item.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {item.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                      <button className="text-blue-600 font-bold text-sm flex items-center gap-2 hover:translate-x-1 transition-transform">
                        LER COMPLETO <TrendingUp size={16} />
                      </button>
                      <div className="flex items-center gap-3">
                        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors"><Share2 size={18} /></button>
                        <button className="p-2 text-gray-400 hover:text-red-500 transition-colors"><MessageSquare size={18} /></button>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            )}
          </main>

          <aside className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-bold text-blue-900 border-b pb-4 mb-4 flex items-center justify-between">
                ULTIMATO 24H <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">LIVE</span>
              </h3>
              <div className="space-y-6">
                {[
                  { time: "5 min", text: "Estratégia para 2026 é definida em reunião secreta." },
                  { time: "22 min", text: "Novas caravanas se organizam para o próximo evento." },
                  { time: "1h", text: "Dados internos mostram crescimento da base patriota." }
                ].map((update, i) => (
                  <div key={i} className="relative pl-6 border-l-2 border-green-500">
                    <div className="absolute -left-[5px] top-0 w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="block text-[10px] font-bold text-gray-400 uppercase">{update.time}</span>
                    <p className="text-sm font-semibold text-gray-700 mt-1">{update.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <h4 className="font-bold text-yellow-800 mb-2">Atenção Patriota!</h4>
              <p className="text-xs text-yellow-700 leading-relaxed">
                Nossos servidores estão sob constante ataque. Utilize sempre nossa VPN exclusiva para acessar o portal com segurança máxima.
              </p>
              <button className="mt-4 w-full py-2 bg-yellow-600 text-white font-bold rounded-lg text-sm hover:bg-yellow-700 transition-colors">CONFIGURAR SEGURANÇA</button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
