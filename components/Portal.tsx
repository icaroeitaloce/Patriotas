
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Newspaper, TrendingUp, Search, User, Bell, Share2, MessageSquare, Play, ShieldAlert, LogOut, ExternalLink, RefreshCw, AlertTriangle, Cpu, ChevronRight } from 'lucide-react';

interface NewsItem {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  imageUrl: string;
  sourceUrl: string;
}

interface IntelligenceData {
  weekly_briefing: string;
  articles: NewsItem[];
}

const NEW_IMAGES = [
  "https://i.ibb.co/j9yMYGbS/A-caminhada-iniciada-pelo-deputado-federal-Nikolas-Ferreira-partindo-de-Minas-Gerais-em-dire-o-1.jpg",
  "https://i.ibb.co/rDvLFD5/A-caminhada-iniciada-pelo-deputado-federal-Nikolas-Ferreira-partindo-de-Minas-Gerais-em-dire-o.jpg"
];

interface PortalProps {
  onLogout: () => void;
}

export const Portal: React.FC<PortalProps> = ({ onLogout }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [briefing, setBriefing] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date().toLocaleTimeString());

  const fetchWeeklyIntelligence = async () => {
    setLoading(true);
    setError(false);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-pro-preview",
        contents: "Você é um analista de inteligência política. Pesquise no Google e redes sociais os fatos reais mais importantes da ÚLTIMA SEMANA sobre: Nikolas Ferreira, a caminhada dele pelo Brasil e as movimentações da Direita para 2026. Retorne um JSON com dois campos: 1. 'weekly_briefing' (um parágrafo curto e impactante resumindo o estado atual das coisas) e 2. 'articles' (lista de 6 objetos com title, excerpt, category, date, author, sourceUrl). Garanta que os links de sourceUrl sejam reais.",
        config: {
          tools: [{ googleSearch: {} }],
        }
      });

      const rawText = response.text || "";
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        const data: IntelligenceData = JSON.parse(jsonMatch[0]);
        setBriefing(data.weekly_briefing);
        
        const finalNews = data.articles.map((item, idx) => ({
          ...item,
          imageUrl: NEW_IMAGES[idx % 2],
          sourceUrl: item.sourceUrl || "https://google.com"
        }));
        
        setNews(finalNews);
      } else {
        throw new Error("Falha ao processar inteligência");
      }
      
      setLastUpdate(new Date().toLocaleTimeString());
    } catch (err) {
      console.error("Erro na inteligência VIP:", err);
      setError(true);
      setBriefing("O sistema de inteligência está operando em modo de segurança. As atualizações em tempo real podem sofrer atrasos devido à alta demanda nos servidores patriotas.");
      setNews([
        {
          title: "Monitoramento VIP Ativo",
          excerpt: "Nossa IA continua varrendo as redes. Use o botão de atualizar para tentar uma nova conexão com os satélites de dados.",
          category: "Segurança",
          date: "Agora",
          author: "IA Patriota",
          imageUrl: NEW_IMAGES[0],
          sourceUrl: "https://google.com"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeeklyIntelligence();
  }, []);

  return (
    <div className="bg-[#f1f5f9] min-h-screen pb-20">
      {/* Header Estilizado */}
      <header className="bg-blue-900 text-white border-b-4 border-green-500 sticky top-0 z-40 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-green-500 p-2 rounded-xl">
                <ShieldAlert size={24} className="text-blue-900" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter uppercase italic leading-none">
                CENTRAL <span className="text-green-400">DE INTELIGÊNCIA</span>
              </h1>
              <span className="text-[9px] font-bold text-blue-300 uppercase tracking-[0.2em]">Acesso VIP Monitorado</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={fetchWeeklyIntelligence} 
              className="flex items-center gap-2 bg-blue-800 hover:bg-blue-700 px-4 py-2 rounded-xl transition-all border border-blue-700 text-xs font-bold uppercase italic"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              {loading ? "Sincronizando..." : "Atualizar Dados"}
            </button>
            <button 
              onClick={onLogout}
              className="p-2.5 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white rounded-xl border border-red-500/20 transition-all"
              title="Encerrar Sessão"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 mt-8">
        {/* Weekly Intelligence Briefing Box */}
        <section className="mb-10">
          <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-blue-100 relative">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Cpu size={120} />
            </div>
            <div className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <Cpu size={20} className="text-white animate-pulse" />
                </div>
                <h2 className="text-2xl font-black text-blue-900 uppercase italic tracking-tighter">
                  Briefing de Inteligência Semanal
                </h2>
              </div>
              
              {loading ? (
                <div className="space-y-3">
                  <div className="h-4 bg-slate-100 rounded-full w-full animate-pulse"></div>
                  <div className="h-4 bg-slate-100 rounded-full w-5/6 animate-pulse"></div>
                  <div className="h-4 bg-slate-100 rounded-full w-4/6 animate-pulse"></div>
                </div>
              ) : (
                <div className="relative">
                   <p className="text-slate-700 text-lg leading-relaxed font-medium italic border-l-4 border-green-500 pl-6 py-2">
                    "{briefing}"
                  </p>
                  <div className="mt-6 flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <span>Status: Criptografia Ativa</span>
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    <span>Fonte: Google Search AI</span>
                  </div>
                </div>
              )}
            </div>
            <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 flex justify-between items-center">
               <span className="text-[10px] font-bold text-slate-400 uppercase">Relatório gerado em: {lastUpdate}</span>
               <span className="text-[10px] font-black text-blue-600 uppercase">Apenas para membros VIP</span>
            </div>
          </div>
        </section>

        {/* Notícias do Grid */}
        <div className="flex items-center gap-3 mb-8">
          <TrendingUp size={24} className="text-green-600" />
          <h3 className="text-xl font-black text-blue-950 uppercase italic tracking-tighter">Movimentações Recentes</h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            [1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white rounded-[2rem] h-[450px] animate-pulse shadow-sm"></div>
            ))
          ) : (
            news.map((item, index) => (
              <article key={index} className="bg-white rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all border border-white overflow-hidden group flex flex-col h-full">
                <div className="relative h-56 overflow-hidden">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-5 left-5 bg-blue-600 text-white text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                    {item.category}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase mb-3">
                     <User size={10} /> {item.author} • {item.date}
                  </div>
                  <h2 className="text-lg font-black text-blue-950 mb-4 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                    {item.title}
                  </h2>
                  <p className="text-slate-600 text-xs leading-relaxed mb-6 line-clamp-3">
                    {item.excerpt}
                  </p>
                  
                  <div className="mt-auto pt-6 border-t border-slate-50">
                    <a 
                      href={item.sourceUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full bg-slate-100 text-slate-700 font-black text-[10px] py-3 rounded-xl hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2 uppercase italic"
                    >
                      Verificar Fonte Original <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
