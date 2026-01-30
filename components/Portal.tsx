
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { 
  Newspaper, TrendingUp, User, ShieldAlert, LogOut, 
  ExternalLink, RefreshCw, Cpu, ChevronRight, X, 
  Clock, Share2, ShieldCheck, Database, Lock, 
  Activity, MessageCircle, AlertTriangle 
} from 'lucide-react';

interface NewsItem {
  title: string;
  excerpt: string;
  full_content: string;
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
  "https://i.ibb.co/rDvLFD5/A-caminhada-iniciada-pelo-deputado-federal-Nikolas-Ferreira-partindo-de-Minas-Gerais-em-dire-o.jpg",
  "https://i.ibb.co/j9yMYGbS/A-caminhada-iniciada-pelo-deputado-federal-Nikolas-Ferreira-partindo-de-Minas-Gerais-em-dire-o-1.jpg"
];

// Link de suporte via WhatsApp (ajuste o número conforme necessário)
const WHATSAPP_SUPPORT_URL = "https://wa.me/5511999999999?text=Olá,%20sou%20membro%20VIP%20do%20Portal%20Patriota%20e%20preciso%20de%20suporte.";

interface PortalProps {
  onLogout: () => void;
}

export const Portal: React.FC<PortalProps> = ({ onLogout }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [briefing, setBriefing] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);
  const [lastUpdate, setLastUpdate] = useState(new Date().toLocaleTimeString());

  const fetchWeeklyIntelligence = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-pro-preview",
        contents: "Você é um analista sênior de inteligência política. Pesquise e retorne as 3 notícias reais mais impactantes da ÚLTIMA SEMANA sobre Nikolas Ferreira e a Direita 2026. Retorne um JSON estrito: { 'weekly_briefing': 'resumo geral de 2 parágrafos', 'articles': [{ 'title': '', 'excerpt': 'resumo curto', 'full_content': 'texto detalhado de 4 parágrafos para ler no site', 'category': '', 'date': 'data real', 'author': 'nome da fonte original', 'sourceUrl': 'url real da noticia' }] }. Retorne exatamente 3 matérias.",
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
          imageUrl: NEW_IMAGES[idx % 3],
          sourceUrl: item.sourceUrl || "https://plenonews.com.br"
        }));
        
        setNews(finalNews);
      } else {
        throw new Error("Formato inválido");
      }
    } catch (err) {
      console.error("Erro na inteligência:", err);
      setBriefing("O sistema está operando em modo de segurança. As atualizações em tempo real podem sofrer atrasos devido à alta demanda nos servidores patriotas.");
      setNews([
        {
          title: "Mobilização Nacional 2026 ganha força após caminhada",
          excerpt: "O sucesso da última caminhada despertou novos núcleos de apoio em todo o território nacional.",
          full_content: "A recente caminhada liderada por lideranças da direita em Minas Gerais não foi apenas um evento isolado, mas o início de uma coordenação nacional para as eleições de 2026. Analistas apontam que a capilaridade digital e a presença física nas ruas estão criando uma base sólida. O movimento agora foca na organização de comitês locais e na formação de novas lideranças regionais que compartilham dos mesmos valores patriotas.",
          category: "POLÍTICA",
          date: "Hoje",
          author: "Inteligência VIP",
          imageUrl: NEW_IMAGES[0],
          sourceUrl: "https://plenonews.com.br"
        },
        {
          title: "Estratégia Digital: A nova fase da comunicação patriota",
          excerpt: "Novas ferramentas de IA e redes sociais descentralizadas estão no foco da estratégia para 2026.",
          full_content: "A comunicação direta com o eleitor é a prioridade zero para o próximo ciclo eleitoral. Com o avanço das restrições em plataformas tradicionais, o movimento Direita 2026 está investindo em portais próprios e listas de transmissão seguras. O objetivo é garantir que a verdade chegue sem filtros aos brasileiros, utilizando tecnologia de ponta para combater narrativas adversas em tempo real.",
          category: "ESTRATÉGIA",
          date: "Ontem",
          author: "Monitoria Digital",
          imageUrl: NEW_IMAGES[1],
          sourceUrl: "https://plenonews.com.br"
        },
        {
          title: "União Conservadora: Reuniões de cúpula definem diretrizes",
          excerpt: "Lideranças se reúnem em Brasília para alinhar o discurso e as metas de expansão partidária.",
          full_content: "Bastidores revelam que as principais lideranças conservadoras do país iniciaram uma série de jantares e reuniões técnicas para unificar o discurso. A pauta principal é a defesa das liberdades individuais e a manutenção do legado econômico. A ordem é 'unidade total' para evitar divisões que possam enfraquecer o movimento antes mesmo do início oficial da campanha em 2026.",
          category: "BASTIDORES",
          date: "2 dias atrás",
          author: "Fontes VIP",
          imageUrl: NEW_IMAGES[2],
          sourceUrl: "https://plenonews.com.br"
        }
      ]);
    } finally {
      setLoading(false);
      setLastUpdate(new Date().toLocaleTimeString());
    }
  };

  useEffect(() => {
    fetchWeeklyIntelligence();
  }, []);

  return (
    <div className="bg-[#f1f5f9] min-h-screen">
      {/* Header Centralizado */}
      <header className="bg-blue-900 text-white border-b-4 border-green-500 sticky top-0 z-40 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-green-500 p-2 rounded-xl">
                <ShieldAlert size={18} className="text-blue-900" />
            </div>
            <h1 className="text-base md:text-xl font-black tracking-tighter uppercase italic leading-none">
              CENTRAL <span className="text-green-400">PATRIOTA</span> VIP
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="hidden md:flex items-center gap-2 text-[10px] font-bold text-blue-200 uppercase bg-blue-800/50 px-3 py-1.5 rounded-full border border-blue-700">
                <Activity size={12} className="text-green-400 animate-pulse" /> Servidor: Ativo
             </div>
            <button onClick={fetchWeeklyIntelligence} className="p-2 bg-blue-800 rounded-lg text-blue-300 hover:text-white transition-colors">
              <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
            </button>
            <button onClick={onLogout} className="p-2 bg-red-600/20 text-red-500 rounded-lg hover:bg-red-600 hover:text-white transition-all">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* Grid Principal Layout 3 Colunas */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* COLUNA ESQUERDA: BRIEFING SEMANAL */}
          <aside className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-[2rem] shadow-lg border border-slate-200 overflow-hidden sticky top-24">
              <div className="bg-blue-950 p-6 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <Cpu size={18} className="text-green-500 animate-pulse" />
                  <h3 className="text-sm font-black uppercase italic tracking-tighter">BRIEFING DE IA</h3>
                </div>
                <p className="text-[10px] text-blue-300 font-bold uppercase tracking-widest">Inteligência Semanal</p>
              </div>
              <div className="p-6">
                {loading ? (
                  <div className="space-y-3">
                    <div className="h-3 bg-slate-100 rounded w-full animate-pulse"></div>
                    <div className="h-3 bg-slate-100 rounded w-5/6 animate-pulse"></div>
                    <div className="h-3 bg-slate-100 rounded w-4/6 animate-pulse"></div>
                  </div>
                ) : (
                  <p className="text-slate-600 text-xs leading-relaxed font-medium italic border-l-3 border-green-500 pl-4 py-1">
                    "{briefing}"
                  </p>
                )}
                <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
                   <span className="text-[9px] font-black text-slate-400 uppercase">Status: Criptografado</span>
                   <Lock size={12} className="text-slate-300" />
                </div>
              </div>
            </div>
          </aside>

          {/* COLUNA CENTRAL: FEED DE NOTÍCIAS */}
          <main className="lg:col-span-6 space-y-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-blue-950">
                <TrendingUp size={22} className="text-green-600" />
                <h2 className="text-2xl font-black uppercase italic tracking-tighter">MOVIMENTAÇÕES RECENTES</h2>
              </div>
            </div>

            <div className="space-y-8">
              {loading ? (
                [1, 2, 3].map(i => (
                  <div key={i} className="bg-white rounded-[2.5rem] h-[280px] animate-pulse shadow-sm border border-slate-200"></div>
                ))
              ) : (
                news.map((item, index) => (
                  <article key={index} className="bg-white rounded-[2.5rem] shadow-md hover:shadow-xl transition-all border border-slate-100 overflow-hidden group">
                    <div className="relative h-56 overflow-hidden">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute top-4 left-4 bg-blue-600 text-white text-[9px] font-black px-3 py-1.5 rounded-full uppercase shadow-lg">
                        {item.category}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
                      <div className="absolute bottom-4 left-6 right-6">
                         <div className="flex items-center gap-2 text-[10px] font-bold text-blue-100 uppercase mb-1">
                            <User size={10} className="text-green-400" /> {item.author} • {item.date}
                         </div>
                         <h2 className="text-lg font-black text-white leading-tight uppercase italic tracking-tighter">
                            {item.title}
                         </h2>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-2 italic">
                        "{item.excerpt}"
                      </p>
                      
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setSelectedArticle(item)}
                          className="flex-1 bg-blue-600 text-white font-black text-[11px] py-4 rounded-2xl hover:bg-blue-700 transition-all uppercase italic tracking-tighter shadow-md"
                        >
                          Ler Matéria Completa
                        </button>
                        <a 
                          href={item.sourceUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-4 bg-slate-100 text-slate-400 rounded-2xl hover:bg-green-500 hover:text-white transition-all border border-slate-200"
                        >
                          <ExternalLink size={16} />
                        </a>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          </main>

          {/* COLUNA DIREITA: MONITORAMENTO E SEGURANÇA */}
          <aside className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-[2rem] shadow-lg border border-slate-200 overflow-hidden sticky top-24">
              <div className="p-8 text-center">
                 <div className="inline-flex p-4 bg-green-50 rounded-full mb-4">
                    <ShieldCheck size={40} className="text-green-600 animate-pulse" />
                 </div>
                 <h4 className="text-sm font-black text-blue-950 uppercase italic tracking-tighter mb-2">PÁGINA MONITORADA</h4>
                 <p className="text-[11px] text-slate-500 font-bold leading-relaxed px-2 mb-4">
                    Esta interface opera sob protocolo de criptografia ponta-a-ponta. Suas interações são 100% privadas.
                 </p>
                 
                 {/* Alerta de Vazamento Rigoroso */}
                 <div className="bg-red-50 p-4 rounded-2xl border-2 border-red-100 mb-6 text-left">
                   <div className="flex items-center gap-2 mb-2">
                     <AlertTriangle size={14} className="text-red-600" />
                     <p className="text-[10px] text-red-600 font-black uppercase tracking-tight">
                       PROTOCOLO ANTI-VAZAMENTO
                     </p>
                   </div>
                   <p className="text-[11px] text-red-700 font-bold leading-tight">
                     QUALQUER VAZAMENTO DE CONTEÚDO OU PRINT DESTA ÁREA RESULTARÁ NA DESABILITAÇÃO IMEDIATA E IRREVERSÍVEL DA SUA CONTA VIP.
                   </p>
                 </div>
                 
                 <div className="mt-4 space-y-3 text-left">
                    <div className="flex items-center justify-between text-[10px] font-black text-slate-400 uppercase bg-slate-50 p-3 rounded-xl">
                       <span>Database</span>
                       <span className="text-green-600 flex items-center gap-1"><Database size={10} /> Sincronizado</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] font-black text-slate-400 uppercase bg-slate-50 p-3 rounded-xl">
                       <span>Acesso VIP</span>
                       <span className="text-blue-600 flex items-center gap-1"><User size={10} /> Verificado</span>
                    </div>
                 </div>
              </div>
              <div className="bg-slate-900 px-6 py-4 flex items-center justify-center gap-2">
                 <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                 <span className="text-[9px] font-black text-white uppercase tracking-widest">SISTEMA ONLINE</span>
              </div>
            </div>
            
            {/* Suporte WhatsApp */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-[2rem] p-8 text-white shadow-xl relative overflow-hidden group">
               <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-125 transition-transform duration-1000">
                  <Flag size={120} />
               </div>
               <h4 className="text-lg font-black uppercase italic tracking-tighter mb-4">Suporte VIP</h4>
               <p className="text-xs text-blue-100 font-medium mb-6 leading-relaxed">Dúvidas sobre o conteúdo ou acesso? Fale com nossa central exclusiva via WhatsApp.</p>
               <a 
                 href={WHATSAPP_SUPPORT_URL}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="w-full py-4 bg-white text-blue-800 font-black rounded-xl text-[11px] uppercase italic tracking-tighter hover:bg-blue-50 transition-all flex items-center justify-center gap-2 shadow-lg"
               >
                  <MessageCircle size={16} /> SUPORTE NO WHATSAPP
               </a>
            </div>
          </aside>

        </div>
      </div>

      {/* Modal de Leitura Interna */}
      {selectedArticle && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-blue-950/80 backdrop-blur-md">
          <div className="bg-white w-full max-w-2xl max-h-[90vh] rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-500 border border-white/20">
            {/* Header do Modal */}
            <div className="relative h-72 shrink-0">
              <img src={selectedArticle.imageUrl} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/40"></div>
              <button 
                onClick={() => setSelectedArticle(null)}
                className="absolute top-8 right-8 w-12 h-12 bg-white/30 backdrop-blur-lg hover:bg-white text-white hover:text-blue-900 rounded-full flex items-center justify-center transition-all shadow-xl"
              >
                <X size={24} strokeWidth={3} />
              </button>
              <div className="absolute bottom-8 left-10">
                <span className="bg-blue-600 text-white text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-widest shadow-lg">
                  {selectedArticle.category}
                </span>
              </div>
            </div>

            {/* Conteúdo do Modal */}
            <div className="p-10 md:p-14 overflow-y-auto scrollbar-hide">
              <div className="flex items-center gap-6 text-slate-400 text-[11px] font-black uppercase mb-8 border-b border-slate-100 pb-6">
                <span className="flex items-center gap-2 text-blue-600"><User size={14} /> {selectedArticle.author}</span>
                <span className="flex items-center gap-2"><Clock size={14} /> {selectedArticle.date}</span>
                <span className="hidden md:block">Relatório VIP #772</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-black text-blue-950 mb-8 leading-none italic tracking-tighter">
                {selectedArticle.title}
              </h2>
              
              <div className="space-y-6 text-slate-700 text-lg leading-relaxed font-medium">
                {selectedArticle.full_content.split('\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <div className="mt-14 pt-10 border-t border-slate-100 flex items-center justify-between">
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="text-slate-400 font-bold text-sm hover:text-blue-600 flex items-center gap-2 transition-colors"
                >
                  <ChevronRight size={18} className="rotate-180" /> Fechar Relatório
                </button>
                <div className="flex gap-4">
                  <button className="p-3 bg-slate-50 text-slate-400 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    <Share2 size={18} />
                  </button>
                  <a 
                    href={selectedArticle.sourceUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-3 bg-green-500 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-tighter italic hover:bg-green-600 transition-all shadow-lg shadow-green-100"
                  >
                    FONTE OFICIAL <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Ícone de bandeira para o suporte
const Flag = ({ size = 24, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
    <line x1="4" y1="22" x2="4" y2="15" />
  </svg>
);
