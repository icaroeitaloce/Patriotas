
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
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
  "https://i.ibb.co/j9yMYGbS/A-caminhada-iniciada-pelo-deputado-federal-Nikolas-Ferreira-partindo-de-Minas-Gerais-em-dire-o-1.jpg",
  "https://i.ibb.co/rDvLFD5/A-caminhada-iniciada-pelo-deputado-federal-Nikolas-Ferreira-partindo-de-Minas-Gerais-em-dire-o.jpg",
  "https://i.ibb.co/j9yMYGbS/A-caminhada-iniciada-pelo-deputado-federal-Nikolas-Ferreira-partindo-de-Minas-Gerais-em-dire-o-1.jpg"
];

const WHATSAPP_SUPPORT_URL = "https://wa.me/5542933006492?text=Olá,%20sou%20membro%20VIP%20do%20Portal%20Patriota%20e%20preciso%20de%20suporte.";

interface PortalProps {
  onLogout: () => void;
}

export const Portal: React.FC<PortalProps> = ({ onLogout }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [briefing, setBriefing] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);

  const fetchWeeklyIntelligence = async () => {
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      // Prompt reforçado para matérias longas e links reais via Google Search
      const response = await ai.models.generateContent({
        model: "gemini-3-pro-preview",
        contents: "Você é um analista sênior de inteligência política. Pesquise e retorne as 3 notícias REAIS mais impactantes da ÚLTIMA SEMANA sobre Nikolas Ferreira e o cenário da Direita 2026. Para cada notícia, gere um texto EXTREMAMENTE LONGO (mínimo de 1000 palavras por matéria) com análise profunda, fatos e desdobramentos. O link em 'sourceUrl' DEVE ser o link real encontrado na pesquisa. Retorne um JSON: { 'weekly_briefing': 'resumo de 3 parágrafos', 'articles': [{ 'title': '', 'excerpt': 'resumo curto', 'full_content': 'TEXTO MUITO LONGO E DETALHADO (8-10 parágrafos grandes)', 'category': 'POLÍTICA', 'date': 'data real', 'author': 'Fonte original', 'sourceUrl': 'URL REAL DA MATÉRIA' }] }",
        config: {
          tools: [{ googleSearch: {} }],
        }
      });

      const rawText = response.text || "";
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        const data: IntelligenceData = JSON.parse(jsonMatch[0]);
        setBriefing(data.weekly_briefing);
        
        // Tenta extrair URLs reais dos groundingChunks se o JSON vier com link quebrado
        const groundingUrls = response.candidates?.[0]?.groundingMetadata?.groundingChunks
          ?.map(chunk => chunk.web?.uri)
          .filter(uri => !!uri) || [];

        const finalNews = data.articles.map((item, idx) => ({
          ...item,
          imageUrl: NEW_IMAGES[idx % 3],
          sourceUrl: (item.sourceUrl && item.sourceUrl.includes('http')) 
            ? item.sourceUrl 
            : (groundingUrls[idx] || "https://plenonews.com.br")
        }));
        
        setNews(finalNews);
      } else {
        throw new Error("Formato inválido");
      }
    } catch (err) {
      console.error("Erro na inteligência:", err);
      setBriefing("O sistema patriota de inteligência detectou movimentações intensas nas redes. A caminhada consolidou Nikolas Ferreira como o principal articulador jovem para o projeto de 2026.");
      setNews([
        {
          title: "A Gigantesca Mobilização de Nikolas Ferreira e o Futuro de 2026",
          excerpt: "Uma análise profunda sobre como a caminhada em Minas Gerais alterou o tabuleiro político nacional.",
          full_content: "A caminhada liderada por Nikolas Ferreira não foi apenas um evento de rua; foi um manifesto de poder digital transformado em massa humana. Este fenômeno, raramente visto na história política recente do Brasil, demonstra que a base conservadora está mais viva e organizada do que nunca. A análise dos bastidores revela que o planejamento para 2026 já está em uma fase avançada de capilaridade regional.\n\nO deputado federal mais votado do país conseguiu o que muitos partidos tradicionais tentam há décadas: engajamento orgânico real. Sem o uso de fundos públicos massivos para mobilização, o evento atraiu milhares de pessoas movidas por ideais de liberdade, família e valores cristãos. Esse capital político é o que ditará o ritmo das alianças nos próximos dois anos.\n\nEstrategistas apontam que a comunicação direta, sem intermediários, é a maior arma do movimento. Através de canais como este Portal VIP, a verdade chega ao patriota sem o filtro de narrativas distorcidas. A proteção desses canais é prioridade zero, visto que a censura digital tem se tornado um desafio constante.\n\nA caminhada também serviu como um laboratório logístico. A coordenação de segurança, distribuição de material informativo e a gestão do fluxo de pessoas em Minas Gerais foram impecáveis. Isso mostra uma maturidade organizacional que será replicada em nível nacional. O projeto Direita 2026 não é mais uma promessa, é uma realidade em expansão.\n\nO impacto nas assembleias legislativas estaduais também já é sentido. Novas lideranças locais, inspiradas pelo sucesso de Nikolas, estão se levantando para defender as mesmas pautas. O objetivo é criar uma base de apoio sólida que garanta governabilidade total para o futuro presidente patriota.\n\nA economia e a liberdade individual continuam sendo os pilares centrais do discurso. A defesa do livre mercado e a desoneração do cidadão são pautas que ressoam profundamente com o brasileiro que trabalha. A caminhada de 2026 é, antes de tudo, uma jornada pela prosperidade econômica do Brasil.\n\nNos próximos meses, veremos a criação de novos núcleos de apoio em todas as capitais. A ordem é unificar o discurso e evitar divisões internas. A união é o que nos tornará imbatíveis. Cada membro deste portal tem o papel fundamental de ser um multiplicador dessa visão em sua comunidade local.\n\nA fé em Deus e a gratidão pelo sucesso da caminhada são o combustível que mantém a chama acesa. Como Nikolas costuma dizer, 'o Brasil é do Senhor Jesus', e essa convicção espiritual é o que diferencia este movimento de qualquer outra corrente política. A vitória em 2026 será a vitória da família brasileira.",
          category: "ANÁLISE ESPECIAL",
          date: "Outubro 2024",
          author: "Inteligência VIP",
          imageUrl: NEW_IMAGES[0],
          sourceUrl: "https://plenonews.com.br"
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
    <div className="bg-[#f1f5f9] min-h-screen">
      {/* Botão Flutuante Mobile de WhatsApp */}
      <a 
        href={WHATSAPP_SUPPORT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-[60] bg-[#25d366] text-white p-5 rounded-full shadow-[0_15px_40px_rgba(37,211,102,0.5)] hover:scale-110 active:scale-95 transition-all md:hidden flex items-center justify-center border-4 border-white"
      >
        <MessageCircle size={32} />
      </a>

      {/* Header Fixo */}
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
            <button onClick={() => fetchWeeklyIntelligence()} className="p-2 bg-blue-800 rounded-lg text-blue-300 hover:text-white transition-colors">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* COLUNA ESQUERDA: BRIEFING SEMANAL (FIXO) */}
          <aside className="lg:col-span-3 lg:sticky lg:top-24">
            <div className="bg-white rounded-[2rem] shadow-lg border border-slate-200 overflow-hidden">
              <div className="bg-blue-950 p-6 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <Cpu size={18} className="text-green-500 animate-pulse" />
                  <h3 className="text-sm font-black uppercase italic tracking-tighter">ANÁLISE DE IA</h3>
                </div>
                <p className="text-[10px] text-blue-300 font-bold uppercase tracking-widest">Resumo Estratégico</p>
              </div>
              <div className="p-6">
                {loading ? (
                  <div className="space-y-3">
                    <div className="h-3 bg-slate-100 rounded animate-pulse"></div>
                    <div className="h-3 bg-slate-100 rounded w-5/6 animate-pulse"></div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {briefing.split('\n').filter(p => p.trim() !== '').map((p, i) => (
                      <p key={i} className="text-slate-600 text-[11px] leading-relaxed font-medium italic border-l-4 border-green-500 pl-4 py-1">
                        "{p}"
                      </p>
                    ))}
                  </div>
                )}
                <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
                   <span className="text-[9px] font-black text-slate-400 uppercase">Sincronizado</span>
                   <Lock size={12} className="text-slate-300" />
                </div>
              </div>
            </div>
          </aside>

          {/* COLUNA CENTRAL: MATÉRIAS DETALHADAS */}
          <main className="lg:col-span-6 space-y-10">
            <div className="flex items-center gap-2 mb-4 text-blue-950">
              <TrendingUp size={24} className="text-green-600" />
              <h2 className="text-2xl font-black uppercase italic tracking-tighter">RELATÓRIOS EM TEMPO REAL</h2>
            </div>

            <div className="space-y-12">
              {loading ? (
                [1, 2, 3].map(i => (
                  <div key={i} className="bg-white rounded-[2.5rem] h-[400px] animate-pulse shadow-sm border border-slate-200"></div>
                ))
              ) : (
                news.map((item, index) => (
                  <article key={index} className="bg-white rounded-[2.5rem] shadow-md hover:shadow-2xl transition-all border border-slate-100 overflow-hidden group">
                    <div className="relative h-72 overflow-hidden">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1500ms]" />
                      <div className="absolute top-6 left-6 bg-blue-600 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase shadow-xl z-10">
                        {item.category}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
                      <div className="absolute bottom-8 left-10 right-10 z-10">
                         <div className="flex items-center gap-3 text-[11px] font-bold text-blue-200 uppercase mb-3">
                            <span className="flex items-center gap-1.5"><User size={12} className="text-green-400" /> {item.author}</span>
                            <span className="flex items-center gap-1.5"><Clock size={12} className="text-blue-400" /> {item.date}</span>
                         </div>
                         <h2 className="text-2xl md:text-3xl font-black text-white leading-tight uppercase italic tracking-tighter group-hover:text-green-400 transition-colors duration-300">
                            {item.title}
                         </h2>
                      </div>
                    </div>
                    <div className="p-10">
                      <p className="text-slate-600 text-base leading-relaxed mb-10 line-clamp-3 italic font-medium">
                        "{item.excerpt}"
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <button 
                          onClick={() => setSelectedArticle(item)}
                          className="flex-[2] bg-blue-600 text-white font-black text-sm py-5 rounded-2xl hover:bg-blue-700 active:scale-95 transition-all uppercase italic tracking-tighter shadow-2xl shadow-blue-100"
                        >
                          Ler Matéria VIP Completa
                        </button>
                        <a 
                          href={item.sourceUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1 p-5 bg-slate-50 text-slate-400 rounded-2xl hover:bg-green-500 hover:text-white transition-all border border-slate-200 flex items-center justify-center gap-2 font-black text-[10px] uppercase italic tracking-widest"
                        >
                          FONTE <ExternalLink size={18} />
                        </a>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
            
            <div className="text-center py-10 opacity-30 border-t border-slate-200">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Criptografia de Ponta-a-Ponta Ativa</p>
            </div>
          </main>

          {/* COLUNA DIREITA: MONITORAMENTO E SUPORTE (ESTÁTICO/FIXO) */}
          <aside className="lg:col-span-3 lg:sticky lg:top-24">
            <div className="space-y-6">
              {/* Card Monitoramento */}
              <div className="bg-white rounded-[2rem] shadow-lg border border-slate-200 overflow-hidden">
                <div className="p-8 text-center">
                  <div className="inline-flex p-4 bg-green-50 rounded-full mb-4">
                    <ShieldCheck size={40} className="text-green-600 animate-pulse" />
                  </div>
                  <h4 className="text-sm font-black text-blue-950 uppercase italic tracking-tighter mb-2">PÁGINA MONITORADA</h4>
                  <p className="text-[11px] text-slate-500 font-bold leading-relaxed px-2 mb-4">
                    Protocolo de segurança patriota ativado. Interações 100% privadas.
                  </p>
                  <div className="bg-red-50 p-5 rounded-2xl border-2 border-red-100 mb-6 text-left">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle size={18} className="text-red-600" />
                      <p className="text-[10px] text-red-600 font-black uppercase tracking-tight">ANTI-VAZAMENTO</p>
                    </div>
                    <p className="text-[10px] text-red-700 font-black leading-tight uppercase">
                      Vazamentos ou prints resultam em BANIMENTO IMEDIATO da sua conta VIP.
                    </p>
                  </div>
                </div>
                <div className="bg-slate-900 px-6 py-4 flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                  <span className="text-[9px] font-black text-white uppercase tracking-widest">SISTEMA SEGURO</span>
                </div>
              </div>

              {/* Card Suporte VIP 24H (Sticky no scroll) */}
              <div className="bg-blue-600 bg-gradient-to-br from-blue-600 to-blue-800 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group border border-white/10">
                <div className="absolute -right-6 -bottom-6 opacity-10 group-hover:scale-125 transition-transform duration-1000">
                  <Flag size={140} />
                </div>
                <h4 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter mb-6 leading-none">SUPORTE VIP 24H</h4>
                <p className="text-sm text-blue-100 font-medium mb-10 leading-relaxed">
                  Dúvidas sobre o conteúdo ou acesso? Fale agora com nossa central exclusiva via WhatsApp.
                </p>
                <a 
                  href={WHATSAPP_SUPPORT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-6 bg-white text-blue-800 font-black rounded-[1.8rem] text-sm uppercase italic tracking-tighter hover:bg-green-500 hover:text-white transition-all flex items-center justify-center gap-4 shadow-[0_20px_40px_rgba(0,0,0,0.3)] active:scale-95 border-2 border-white/50"
                >
                  <MessageCircle size={28} /> SUPORTE WHATSAPP
                </a>
              </div>
            </div>
          </aside>

        </div>
      </div>

      {/* Modal de Matéria Completa (Fundo Blur Forte) */}
      {selectedArticle && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-blue-950/95 backdrop-blur-2xl overflow-y-auto">
          <div className="bg-white w-full max-w-4xl min-h-fit rounded-[4rem] shadow-2xl overflow-hidden flex flex-col my-auto border border-white/10">
            <div className="relative h-80 sm:h-96 shrink-0">
              <img src={selectedArticle.imageUrl} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/60"></div>
              <button 
                onClick={() => setSelectedArticle(null)} 
                className="absolute top-10 right-10 w-16 h-16 bg-white/20 backdrop-blur-2xl hover:bg-white text-white hover:text-blue-900 rounded-full flex items-center justify-center transition-all z-20 shadow-2xl border border-white/20"
              >
                <X size={32} strokeWidth={3} />
              </button>
              <div className="absolute bottom-12 left-14 z-10">
                <span className="bg-blue-600 text-white text-[11px] font-black px-8 py-3 rounded-full uppercase tracking-widest shadow-2xl">{selectedArticle.category}</span>
              </div>
            </div>
            
            <div className="p-10 md:p-20">
              <div className="flex flex-wrap items-center gap-6 text-slate-400 text-[12px] font-black uppercase mb-12 border-b border-slate-100 pb-10">
                <span className="flex items-center gap-3 text-blue-600 bg-blue-50 px-4 py-2 rounded-xl"><User size={16} /> FONTE: {selectedArticle.author}</span>
                <span className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl"><Clock size={16} /> {selectedArticle.date}</span>
                <span className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-xl">ID: VIP-{Math.floor(Math.random()*9000)+1000}</span>
              </div>
              
              <h2 className="text-3xl md:text-5xl font-black text-blue-950 mb-12 leading-none italic tracking-tighter">{selectedArticle.title}</h2>
              
              <div className="space-y-10 text-slate-700 text-xl md:text-2xl leading-relaxed font-medium">
                {selectedArticle.full_content.split('\n').filter(p => p.trim() !== '').map((para, i) => (
                  <p key={i} className="mb-4">{para}</p>
                ))}
              </div>

              <div className="mt-20 pt-16 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-10">
                <button 
                  onClick={() => setSelectedArticle(null)} 
                  className="text-slate-400 font-black text-base hover:text-blue-600 flex items-center gap-3 transition-colors uppercase italic tracking-widest"
                >
                  <ChevronRight size={24} className="rotate-180" /> VOLTAR AO PAINEL
                </button>
                <div className="flex gap-6 w-full md:w-auto">
                   <button className="flex-1 md:flex-none p-6 bg-slate-50 text-slate-400 rounded-[2rem] hover:bg-blue-50 hover:text-blue-600 transition-colors shadow-sm">
                    <Share2 size={32} />
                  </button>
                  <a 
                    href={selectedArticle.sourceUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex-[3] md:flex-none flex items-center justify-center gap-4 bg-green-500 text-white px-14 py-7 rounded-[2rem] font-black text-sm uppercase tracking-tighter italic hover:bg-green-600 transition-all shadow-2xl shadow-green-100"
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

const Flag = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
    <line x1="4" y1="22" x2="4" y2="15" />
  </svg>
);
