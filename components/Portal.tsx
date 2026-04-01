
import React, { useState, useEffect } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { 
  TrendingUp, User, ShieldAlert, LogOut, 
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
  "https://i.ibb.co/8LjDx9n6/imagem-2026-03-23-205304278.png",
  "https://i.ibb.co/6cGY0yDz/imagem-2026-03-23-205350616.png",
  "https://i.ibb.co/fV2QHd5n/image.png"
];

// Removendo a primeira declaração duplicada do Flag
const WHATSAPP_SUPPORT_URL = "https://wa.me/5542933006492?text=Olá,%20sou%20membro%20VIP%20do%20Portal%20Patriota%20e%20preciso%20de%20suporte.";

interface PortalProps {
  onLogout: () => void;
}

function Flag({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" y1="22" x2="4" y2="15" />
    </svg>
  );
}
export const Portal: React.FC<PortalProps> = ({ onLogout }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [briefing, setBriefing] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutos
  const [onlineUsers, setOnlineUsers] = useState(1247);

  // Contador Regressivo
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulador de usuários online
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineUsers(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const fetchWeeklyIntelligence = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "undefined") throw new Error("Configuração de API ausente");

      const ai = new GoogleGenAI({ apiKey });
      const today = new Date().toLocaleDateString('pt-BR');
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Hoje é ${today}. Você é um analista sênior de inteligência política do Jornal Patriota. 
        PESQUISE usando Google Search e retorne obrigatoriamente as 3 NOTÍCIAS REAIS MAIS RECENTES (desta semana) sobre o Governo Bolsonaro, articulações da oposição em Brasília, e movimentos da Direita para 2026.
        RETORNE APENAS JSON NO FORMATO:
        {
          "weekly_briefing": "Resumo analítico da semana em 3 parágrafos",
          "articles": [
            {
              "title": "Título Impactante",
              "excerpt": "Resumo de 3 linhas",
              "full_content": "TEXTO COMPLETO COM ANÁLISE PROFUNDA (5+ parágrafos)",
              "category": "POLÍTICA / 2026",
              "date": "Data da publicação original",
              "author": "Nome do Portal/Jornalista original",
              "sourceUrl": "LINK_REAL_DO_PORTAL"
            }
          ]
        }`,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              weekly_briefing: { type: Type.STRING },
              articles: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    excerpt: { type: Type.STRING },
                    full_content: { type: Type.STRING },
                    category: { type: Type.STRING },
                    date: { type: Type.STRING },
                    author: { type: Type.STRING },
                    sourceUrl: { type: Type.STRING }
                  },
                  required: ["title", "excerpt", "full_content", "category", "date", "author", "sourceUrl"]
                }
              }
            },
            required: ["weekly_briefing", "articles"]
          }
        }
      });

      const rawText = response.text || "";
      let data: IntelligenceData;
      try {
        data = JSON.parse(rawText);
      } catch (e) {
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
        if (jsonMatch) data = JSON.parse(jsonMatch[0]);
        else throw new Error("Falha ao processar JSON da IA");
      }
      
      if (data.articles && data.articles.length > 0) {
        const processedNews = data.articles.map((item, idx) => ({
          ...item,
          imageUrl: NEW_IMAGES[idx % NEW_IMAGES.length],
        }));
        setNews(processedNews);
        setBriefing(data.weekly_briefing);
      } else {
        throw new Error("IA retornou dados vazios");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
      setBriefing("O monitoramento do Jornal Patriota detectou movimentações intensas em Brasília nesta semana. As articulações para 2026 entraram em uma fase decisiva, com foco na unificação da base conservadora e na fiscalização rigorosa das políticas atuais.");
      setNews([
        {
          title: "Balanço Estratégico: O Legado Econômico e os Novos Rumos para 2026",
          excerpt: "Análise profunda sobre como as políticas de liberdade econômica do governo Bolsonaro continuam influenciando o debate nacional.",
          full_content: "O cenário político brasileiro em Março de 2026 mostra que o legado econômico do governo Bolsonaro permanece como o principal ponto de referência para a oposição...",
          category: "INTELIGÊNCIA POLÍTICA",
          date: "23 de Março, 2026",
          author: "Redação Jornal Patriota",
          imageUrl: NEW_IMAGES[0],
          sourceUrl: "https://gazetadopovo.com.br"
        },
        {
          title: "Bastidores de Brasília: A Resistência Contra o Avanço do Autoritarismo",
          excerpt: "Relatório exclusivo sobre as manobras parlamentares para proteger a liberdade de expressão e os direitos fundamentais.",
          full_content: "Nesta semana de Março de 2026, a tensão nos corredores do Congresso Nacional atingiu níveis críticos...",
          category: "BASTIDORES DO PODER",
          date: "22 de Março, 2026",
          author: "Análise VIP",
          imageUrl: NEW_IMAGES[1],
          sourceUrl: "https://plenonews.com.br"
        },
        {
          title: "Mobilização Nacional: O Crescimento Orgânico do Movimento Conservador",
          excerpt: "Como as redes de apoio ao governo Bolsonaro estão se reorganizando para os desafios de 2026.",
          full_content: "O fenômeno de mobilização que vimos nos últimos anos não arrefeceu; ele se transformou...",
          category: "MOVIMENTO PATRIOTA",
          date: "21 de Março, 2026",
          author: "Equipe de Inteligência",
          imageUrl: NEW_IMAGES[2],
          sourceUrl: "https://www.jovempan.com.br"
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
    <div className="bg-black min-h-screen text-white font-sans selection:bg-patriotic-yellow selection:text-black">
      {/* Barra de Urgência Superior */}
      <div className="bg-patriotic-yellow text-black py-2 px-4 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 z-50 relative overflow-hidden">
        <div className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest animate-pulse">
          <AlertTriangle size={14} /> AVISO: ESTE CONTEÚDO PODE SER REMOVIDO A QUALQUER MOMENTO POR ORDEM JUDICIAL
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-xs font-black italic">
            <Clock size={16} /> TEMPO RESTANTE DE ACESSO: <span className="bg-black text-patriotic-yellow px-2 py-0.5 rounded-sm tabular-nums">{formatTime(timeLeft)}</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs font-black">
            <User size={16} /> <span className="text-black/70">{onlineUsers} PATRIOTAS CONECTADOS AGORA</span>
          </div>
        </div>
      </div>

      {/* Botão Flutuante Mobile de WhatsApp */}
      <a 
        href={WHATSAPP_SUPPORT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[60] bg-[#25d366] text-white p-5 rounded-full shadow-[0_15px_40px_rgba(37,211,102,0.5)] hover:scale-110 active:scale-95 transition-all md:hidden flex items-center justify-center border-2 border-white/20"
      >
        <MessageCircle size={32} />
      </a>

      {/* Header Fixo */}
      <header className="bg-zinc-900/80 backdrop-blur-xl text-white border-b border-white/5 sticky top-0 z-40 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-patriotic-green p-2 rounded-sm shadow-[0_0_20px_rgba(0,155,58,0.3)]">
                <ShieldAlert size={20} className="text-white" />
            </div>
            <h1 className="text-xl md:text-2xl font-black tracking-tighter uppercase italic leading-none">
              CENTRAL <span className="text-patriotic-yellow">PATRIOTA</span> <span className="text-xs bg-white/10 px-2 py-1 rounded-sm ml-2 border border-white/10">VIP ACCESS</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden md:flex items-center gap-3 text-[10px] font-black text-zinc-400 uppercase bg-black/50 px-4 py-2 rounded-sm border border-white/5">
                <Activity size={14} className="text-patriotic-green animate-pulse" /> STATUS: CRIPTOGRAFIA MILITAR ATIVA
             </div>
            <button onClick={() => fetchWeeklyIntelligence()} className="p-2.5 bg-white/5 rounded-sm text-zinc-400 hover:text-white hover:bg-white/10 transition-all border border-white/5">
              <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
            </button>
            <button onClick={onLogout} className="p-2.5 bg-red-950/30 text-red-500 rounded-sm hover:bg-red-600 hover:text-white transition-all border border-red-900/30">
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Grid Principal Layout 3 Colunas */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* COLUNA ESQUERDA: BRIEFING E PROVA SOCIAL */}
          <aside className="lg:col-span-3 space-y-8 lg:sticky lg:top-32">
            {/* Briefing IA */}
            <div className="bg-zinc-900 rounded-sm border border-white/5 overflow-hidden shadow-2xl">
              <div className="bg-gradient-to-r from-patriotic-green to-black p-6 border-b border-white/5">
                <div className="flex items-center gap-3 mb-1">
                  <Cpu size={20} className="text-white animate-pulse" />
                  <h3 className="text-sm font-black uppercase italic tracking-tighter">INTELIGÊNCIA ARTIFICIAL</h3>
                </div>
                <p className="text-[10px] text-white/60 font-black uppercase tracking-widest">RELATÓRIO ESTRATÉGICO</p>
              </div>
              <div className="p-8">
                {loading ? (
                  <div className="space-y-4">
                    <div className="h-2 bg-white/5 rounded animate-pulse"></div>
                    <div className="h-2 bg-white/5 rounded w-5/6 animate-pulse"></div>
                    <div className="h-2 bg-white/5 rounded w-4/6 animate-pulse"></div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {briefing.split('\n').filter(p => p.trim() !== '').map((p, i) => (
                      <p key={i} className="text-zinc-400 text-[11px] leading-relaxed font-bold italic border-l-2 border-patriotic-green pl-4 py-1">
                        "{p}"
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* COLUNA CENTRAL: MATÉRIAS DETALHADAS */}
          <main className="lg:col-span-6 space-y-12">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3 text-white">
                <TrendingUp size={28} className="text-patriotic-green" />
                <h2 className="text-3xl font-black uppercase italic tracking-tighter">ARQUIVOS SECRETOS</h2>
              </div>
              <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                <Database size={14} /> ATUALIZADO EM TEMPO REAL
              </div>
            </div>

            <div className="space-y-16">
              {loading ? (
                [1, 2, 3].map(i => (
                  <div key={i} className="bg-zinc-900 rounded-sm h-[450px] animate-pulse border border-white/5"></div>
                ))
              ) : news.length > 0 ? (
                news.map((item, index) => (
                  <article key={index} className="bg-zinc-900 rounded-sm shadow-2xl hover:border-patriotic-yellow/30 transition-all duration-500 border border-white/5 overflow-hidden group">
                    <div className="relative h-80 overflow-hidden">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms] grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100" />
                      <div className="absolute top-8 left-8 bg-black/80 backdrop-blur-md text-white text-[10px] font-black px-6 py-2 rounded-sm uppercase border border-white/10 z-10 tracking-widest">
                        {item.category}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                      <div className="absolute bottom-10 left-10 right-10 z-10">
                         <div className="flex items-center gap-4 text-[10px] font-black text-zinc-400 uppercase mb-4 tracking-widest">
                            <span className="flex items-center gap-2"><User size={14} className="text-patriotic-green" /> {item.author}</span>
                            <span className="flex items-center gap-2"><Clock size={14} className="text-patriotic-yellow" /> {item.date}</span>
                         </div>
                         <h2 className="text-3xl md:text-4xl font-black text-white leading-tight uppercase italic tracking-tighter group-hover:text-patriotic-yellow transition-colors duration-300">
                            {item.title}
                         </h2>
                      </div>
                    </div>
                    <div className="p-10">
                      <p className="text-zinc-400 text-base leading-relaxed mb-10 line-clamp-3 italic font-bold">
                        "{item.excerpt}"
                      </p>
                      <div className="flex flex-col sm:flex-row gap-6">
                        <button 
                          onClick={() => setSelectedArticle(item)}
                          className="flex-[2] bg-white/5 text-white border border-white/10 font-black text-sm py-6 rounded-sm hover:bg-white hover:text-black active:scale-95 transition-all uppercase italic tracking-tighter"
                        >
                          DESBLOQUEAR RELATÓRIO COMPLETO
                        </button>
                        <a 
                          href={item.sourceUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1 p-6 bg-black text-zinc-600 rounded-sm hover:bg-patriotic-yellow hover:text-black transition-all border border-white/5 flex items-center justify-center gap-3 font-black text-[10px] uppercase italic tracking-widest"
                        >
                          FONTE <ExternalLink size={20} />
                        </a>
                      </div>
                    </div>
                  </article>
                ))
              ) : (
                <div className="bg-zinc-900 rounded-sm p-24 text-center border border-white/5">
                   <AlertTriangle size={64} className="text-zinc-800 mx-auto mb-6" />
                   <p className="text-zinc-500 font-black uppercase tracking-widest text-sm">SISTEMA TEMPORARIAMENTE INDISPONÍVEL</p>
                   <button onClick={() => fetchWeeklyIntelligence()} className="mt-8 px-10 py-4 bg-patriotic-yellow text-black rounded-sm font-black uppercase italic tracking-tighter hover:bg-white transition-all">
                      RECONECTAR AO SERVIDOR
                   </button>
                </div>
              )}
            </div>
            
            <div className="text-center py-16 opacity-20 border-t border-white/5">
               <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.5em]">PROTOCOLO DE SEGURANÇA NACIONAL ATIVO</p>
            </div>
          </main>

          {/* COLUNA DIREITA: MONITORAMENTO E ESCASSEZ */}
          <aside className="lg:col-span-3 space-y-8 lg:sticky lg:top-32">
            {/* Card Monitoramento Agressivo */}
            <div className="bg-zinc-900 rounded-sm border border-white/5 overflow-hidden shadow-2xl">
              <div className="p-8 text-center">
                <div className="inline-flex p-5 bg-red-950/20 rounded-full mb-6 border border-red-900/30">
                  <ShieldCheck size={48} className="text-red-500 animate-pulse" />
                </div>
                <h4 className="text-sm font-black text-white uppercase italic tracking-tighter mb-4">ACESSO MONITORADO</h4>
                <p className="text-[11px] text-zinc-500 font-bold leading-relaxed mb-6">
                  Seu IP está sendo registrado. Qualquer tentativa de compartilhamento resultará em <span className="text-red-500">BANIMENTO PERMANENTE</span>.
                </p>
                <div className="bg-black p-6 rounded-sm border border-red-900/30 mb-6 text-left">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle size={20} className="text-red-500" />
                    <p className="text-[10px] text-red-500 font-black uppercase tracking-widest">ALERTA DE REMOÇÃO</p>
                  </div>
                  <p className="text-[10px] text-zinc-400 font-black leading-relaxed uppercase italic">
                    ESTE PORTAL PODE SER DERRUBADO A QUALQUER MOMENTO. SALVE AS INFORMAÇÕES IMPORTANTES ENQUANTO HÁ TEMPO.
                  </p>
                </div>
                <div className="flex items-center justify-center gap-3 text-[9px] font-black text-patriotic-green uppercase tracking-widest">
                  <div className="w-2 h-2 bg-patriotic-green rounded-full animate-ping"></div>
                  CONEXÃO SEGURA ESTABELECIDA
                </div>
              </div>
            </div>

            {/* Card Escassez / Suporte */}
            <div className="bg-gradient-to-br from-patriotic-green to-black rounded-sm p-10 text-white shadow-2xl relative overflow-hidden group border border-white/10">
              <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:scale-125 transition-transform duration-1000">
                <Flag size={200} />
              </div>
              <div className="relative z-10">
                <h4 className="text-2xl font-black uppercase italic tracking-tighter mb-4 leading-none">SUPORTE TÁTICO</h4>
                <p className="text-xs text-white/70 font-bold mb-10 leading-relaxed uppercase tracking-wide">
                  Dificuldades técnicas ou dúvidas sobre os relatórios? Nossa equipe está de prontidão.
                </p>
                <a 
                  href={WHATSAPP_SUPPORT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-6 bg-white text-black font-black rounded-sm text-sm uppercase italic tracking-tighter hover:bg-patriotic-yellow transition-all flex items-center justify-center gap-4 shadow-2xl active:scale-95"
                >
                  <MessageCircle size={28} /> ACIONAR WHATSAPP
                </a>
              </div>
            </div>

            {/* Contador de Vagas (Escassez) */}
            <div className="bg-zinc-900 rounded-sm p-8 border border-white/5 text-center">
              <h5 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4">DISPONIBILIDADE HOJE</h5>
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="h-2 w-full bg-black rounded-full overflow-hidden flex-grow">
                  <div className="h-full bg-red-600" style={{ width: '12%' }}></div>
                </div>
                <span className="text-red-500 font-black text-xs">12%</span>
              </div>
              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-tight">
                APENAS <span className="text-white">14 VAGAS</span> RESTANTES PARA O PLANO VITALÍCIO.
              </p>
            </div>
          </aside>

        </div>
      </div>

      {/* Modal de Matéria Completa */}
      {selectedArticle && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-2xl overflow-y-auto">
          <div className="bg-zinc-900 w-full max-w-4xl min-h-fit rounded-sm shadow-[0_0_100px_rgba(0,0,0,1)] overflow-hidden flex flex-col my-auto border border-white/10">
            <div className="relative h-80 sm:h-96 shrink-0">
              <img src={selectedArticle.imageUrl} className="w-full h-full object-cover grayscale opacity-40" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-black/80"></div>
              <button 
                onClick={() => setSelectedArticle(null)} 
                className="absolute top-10 right-10 w-16 h-16 bg-white/5 backdrop-blur-xl hover:bg-white text-white hover:text-black rounded-full flex items-center justify-center transition-all z-20 shadow-2xl border border-white/10"
              >
                <X size={32} strokeWidth={3} />
              </button>
              <div className="absolute bottom-12 left-14 z-10">
                <span className="bg-patriotic-green text-white text-[10px] font-black px-8 py-3 rounded-sm uppercase tracking-widest border border-white/10">{selectedArticle.category}</span>
              </div>
            </div>
            
            <div className="p-10 md:p-20">
              <div className="flex flex-wrap items-center gap-8 text-zinc-500 text-[10px] font-black uppercase mb-12 border-b border-white/5 pb-12 tracking-widest">
                <span className="flex items-center gap-3 text-white"><User size={18} className="text-patriotic-green" /> FONTE: {selectedArticle.author}</span>
                <span className="flex items-center gap-3"><Clock size={18} className="text-patriotic-yellow" /> {selectedArticle.date}</span>
                <span className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-sm">ID: VIP-{Math.floor(Math.random()*9000)+1000}</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black text-white mb-12 leading-none italic tracking-tighter uppercase">{selectedArticle.title}</h2>
              
              <div className="space-y-10 text-zinc-400 text-xl md:text-2xl leading-relaxed font-bold italic">
                {selectedArticle.full_content.split('\n').filter(p => p.trim() !== '').map((para, i) => (
                  <p key={i} className="mb-4">"{para}"</p>
                ))}
              </div>

              <div className="mt-20 pt-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-10">
                <button 
                  onClick={() => setSelectedArticle(null)} 
                  className="text-zinc-600 font-black text-sm hover:text-white flex items-center gap-4 transition-colors uppercase italic tracking-widest"
                >
                  <ChevronRight size={24} className="rotate-180" /> VOLTAR AO PAINEL
                </button>
                <div className="flex gap-6 w-full md:w-auto">
                   <button className="flex-1 md:flex-none p-6 bg-white/5 text-zinc-400 rounded-sm hover:bg-white hover:text-black transition-all border border-white/10">
                    <Share2 size={32} />
                  </button>
                  <a 
                    href={selectedArticle.sourceUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex-[3] md:flex-none flex items-center justify-center gap-4 bg-patriotic-yellow text-black px-14 py-7 rounded-sm font-black text-sm uppercase tracking-tighter italic hover:bg-white transition-all shadow-2xl"
                  >
                    ABRIR FONTE ORIGINAL <ExternalLink size={20} />
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

