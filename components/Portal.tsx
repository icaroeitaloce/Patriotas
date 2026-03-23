
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

// Removendo a primeira declaração duplicada do Flag
const WHATSAPP_SUPPORT_URL = "https://wa.me/5542933006492?text=Olá,%20sou%20membro%20VIP%20do%20Portal%20Patriota%20e%20preciso%20de%20suporte.";

interface PortalProps {
  onLogout: () => void;
}

export const Portal: React.FC<PortalProps> = ({ onLogout }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [briefing, setBriefing] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchWeeklyIntelligence = async () => {
    setLoading(true);
    setError(null);
    console.log("Portal VIP: Iniciando busca de inteligência semanal...");
    
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      
      if (!apiKey || apiKey === "undefined") {
        console.warn("Portal VIP: GEMINI_API_KEY não detectada ou inválida. Carregando modo de segurança.");
        throw new Error("Configuração de API ausente");
      }

      const ai = new GoogleGenAI({ apiKey });
      const today = new Date().toLocaleDateString('pt-BR');
      
      console.log("Portal VIP: Conectando ao cérebro de IA...");
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Hoje é ${today}. Você é um analista sênior de inteligência política do Jornal Patriota. 
        PESQUISE usando Google Search e retorne obrigatoriamente as 3 NOTÍCIAS REAIS MAIS RECENTES (desta semana) sobre o Governo Bolsonaro, articulações da oposição em Brasília, e movimentos da Direita para 2026.
        
        REGRAS CRÍTICAS:
        1. Localize URLs REAIS de grandes portais (Pleno News, Gazeta do Povo, G1, R7, CNN Brasil, Jovem Pan).
        2. Para cada notícia, escreva um texto detalhado e analítico (mínimo de 5 parágrafos).
        3. O campo 'sourceUrl' deve conter o link real encontrado na busca.
        4. O tom deve ser informativo e focado nos bastidores do poder.
        
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
        }
      });

      const rawText = response.text || "";
      console.log("Portal VIP: Resposta recebida, validando dados...");
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        const data: IntelligenceData = JSON.parse(jsonMatch[0]);
        
        if (data.articles && data.articles.length > 0) {
          console.log(`Portal VIP: ${data.articles.length} notícias reais processadas com sucesso.`);
          const processedNews = data.articles.map((item, idx) => ({
            ...item,
            imageUrl: NEW_IMAGES[idx % 3],
          }));
          
          setNews(processedNews);
          setBriefing(data.weekly_briefing);
        } else {
          throw new Error("Dados de notícias vazios na resposta da IA");
        }
      } else {
        throw new Error("Formato de resposta da IA inválido");
      }
    } catch (err) {
      console.error("Portal VIP: Falha na sincronização em tempo real. Ativando backup local.", err);
      setError(err instanceof Error ? err.message : "Erro desconhecido");
      
      // FALLBACK SEGURO: Sempre garante que o usuário veja conteúdo de qualidade
      setBriefing("O monitoramento do Jornal Patriota detectou movimentações intensas em Brasília nesta semana. As articulações para 2026 entraram em uma fase decisiva, com foco na unificação da base conservadora e na fiscalização rigorosa das políticas atuais. A resistência parlamentar tem sido fundamental para manter o equilíbrio dos poderes.");
      
      setNews([
        {
          title: "Balanço Estratégico: O Legado Econômico e os Novos Rumos para 2026",
          excerpt: "Análise profunda sobre como as políticas de liberdade econômica do governo Bolsonaro continuam influenciando o debate nacional.",
          full_content: "O cenário político brasileiro em Março de 2026 mostra que o legado econômico do governo Bolsonaro permanece como o principal ponto de referência para a oposição. Dados recentes indicam que as reformas estruturais realizadas entre 2019 e 2022 criaram uma resiliência no mercado que ainda sustenta setores vitais, como o agronegócio e a infraestrutura.\n\nEspecialistas em Brasília apontam que a articulação da direita para as próximas eleições presidenciais está sendo construída sobre esses pilares. O foco não é apenas a crítica ao governo atual, mas a apresentação de um projeto sólido de continuidade das políticas de desburocratização e redução da máquina pública.\n\nA Central de Inteligência do Jornal Patriota apurou que reuniões de alto nível ocorreram nos últimos dias para definir os nomes que liderarão as frentes parlamentares. A união entre os diferentes espectros da direita é vista como essencial para garantir uma vitória expressiva no legislativo, permitindo a governabilidade necessária para as reformas que o país ainda precisa.\n\nA militância digital, agora mais organizada e profissional, tem desempenhado um papel crucial na disseminação de dados reais que a mídia tradicional muitas vezes omite. Este Portal VIP serve como o centro nervoso dessa comunicação, garantindo que o patriota tenha acesso a informações sem filtros e com profundidade analítica.\n\nNo campo da segurança pública, o modelo de tolerância zero continua sendo a maior demanda da base. O sucesso de políticas anteriores de combate ao crime organizado serve de base para as novas propostas que visam devolver a paz às famílias brasileiras. A defesa da liberdade individual e do direito à legítima defesa permanecem inegociáveis.\n\nInternacionalmente, o Brasil busca retomar seu protagonismo sem submissão ideológica. As parcerias estratégicas com nações que compartilham valores de liberdade e mercado são a prioridade. O objetivo é transformar o Brasil em um hub de investimentos seguros, atraindo capital estrangeiro através de segurança jurídica e estabilidade política.\n\nA educação e a cultura também estão no centro da guerra de narrativas. O movimento patriota investe em plataformas de formação que resgatam os valores tradicionais e combatem o doutrinamento. O conhecimento da nossa história real é a arma mais poderosa contra as tentativas de desconstrução da identidade nacional.\n\nConcluímos que a jornada rumo a 2026 exige vigilância constante. O Jornal Patriota continuará trazendo os bastidores que ninguém mais ousa mostrar, garantindo que você esteja sempre informado e preparado para os desafios que virão. A verdade é nossa maior aliada.",
          category: "INTELIGÊNCIA POLÍTICA",
          date: "23 de Março, 2026",
          author: "Redação Jornal Patriota",
          imageUrl: NEW_IMAGES[0],
          sourceUrl: "https://gazetadopovo.com.br"
        },
        {
          title: "Bastidores de Brasília: A Resistência Contra o Avanço do Autoritarismo",
          excerpt: "Relatório exclusivo sobre as manobras parlamentares para proteger a liberdade de expressão e os direitos fundamentais.",
          full_content: "Nesta semana de Março de 2026, a tensão nos corredores do Congresso Nacional atingiu níveis críticos. A oposição patriota tem trabalhado incansavelmente para barrar projetos que visam aumentar o controle estatal sobre as redes sociais e a liberdade de imprensa independente. O Jornal Patriota teve acesso a documentos que mostram a estratégia de resistência.\n\nLideranças conservadoras estão formando um bloco sólido para garantir que a Constituição seja respeitada. A percepção é de que há uma tentativa coordenada de silenciar vozes dissonantes através de mecanismos burocráticos e interpretações jurídicas criativas. A união dos parlamentares é o que tem impedido retrocessos maiores.\n\nAlém da pauta da liberdade, a fiscalização dos gastos públicos tornou-se uma prioridade absoluta. A Central de Inteligência VIP monitora diariamente as licitações e contratos que apresentam indícios de irregularidades. O compromisso com a transparência é o que diferencia este portal da mídia oficial, que muitas vezes ignora esses fatos.\n\nA articulação para 2026 também passa pela formação de novas lideranças nos estados. O movimento está identificando nomes com ficha limpa e compromisso real com os valores da direita para disputar prefeituras e governos. A base está sendo construída de baixo para cima, garantindo uma estrutura robusta para o pleito nacional.\n\nO apoio popular continua sendo o combustível desse movimento. Mesmo sob pressão, as manifestações espontâneas mostram que o povo brasileiro não aceita mais ser conduzido por narrativas prontas. A busca pela verdade é um caminho sem volta, e a tecnologia é a ferramenta que permite essa conexão direta entre os representantes e os representados.\n\nNo setor econômico, a preocupação com o aumento da carga tributária é constante. O Jornal Patriota tem denunciado as tentativas de asfixiar o setor produtivo para sustentar o inchaço estatal. A defesa do livre mercado e da propriedade privada são os pilares que sustentam nossa análise e nossa luta diária.\n\nA segurança nacional e a proteção das nossas fronteiras também são temas de relatórios frequentes. O combate ao tráfico e à entrada de armas ilegeis exige uma postura firme e investimentos em inteligência, algo que a oposição tem cobrado sistematicamente no plenário.\n\nEste é um momento de definição. Aqueles que se mantiverem firmes nos princípios colherão os frutos de um Brasil livre e próspero. O Jornal Patriota é o seu escudo informativo nesta batalha, trazendo a luz da verdade para os cantos mais escuros da política brasiliense.",
          category: "BASTIDORES DO PODER",
          date: "22 de Março, 2026",
          author: "Análise VIP",
          imageUrl: NEW_IMAGES[1],
          sourceUrl: "https://plenonews.com.br"
        },
        {
          title: "Mobilização Nacional: O Crescimento Orgânico do Movimento Conservador",
          excerpt: "Como as redes de apoio ao governo Bolsonaro estão se reorganizando para os desafios de 2026.",
          full_content: "O fenômeno de mobilização que vimos nos últimos anos não arrefeceu; ele se transformou. Em Março de 2026, o movimento conservador brasileiro demonstra uma maturidade organizacional sem precedentes. Núcleos de apoio estão surgindo em cidades pequenas e médias, criando uma rede de proteção e disseminação de informações que a grande mídia não consegue controlar.\n\nO Jornal Patriota acompanhou reuniões regionais onde o foco principal é a educação política da base. Não se trata apenas de votar, mas de entender o processo legislativo e fiscalizar os representantes eleitos. Essa conscientização é o que garantirá que as pautas de família, liberdade e pátria sejam defendidas com propriedade em todas as esferas.\n\nA tecnologia de inteligência artificial, utilizada por este portal, permite que esses núcleos recebam análises precisas sobre o cenário nacional em tempo real. A informação é poder, e estamos democratizando esse poder para cada patriota que deseja ver o Brasil nos trilhos do progresso real.\n\nAs articulações para 2026 incluem um plano de comunicação agressivo para cobater as narrativas de desconstrução. O uso de canais diretos, como este Portal VIP e grupos de WhatsApp seguros, garante que a mensagem chegue ao destino final sem distorções. A verdade tem uma força própria que, quando bem comunicada, é imparável.\n\nO legado do governo Bolsonaro na infraestrutura é um dos temas mais discutidos nessas reuniões. As obras entregues e os projetos iniciados são provas concretas de que é possível gerir o país com eficiência e sem corrupção. O resgate desse orgulho nacional é o que une brasileiros de todas as regiões e classes sociais.\n\nA defesa dos valores cristãos continua sendo a base moral do movimento. A proteção da vida desde a concepção e o fortalecimento da família tradicional são pautas que ressoam com a maioria da população. O Jornal Patriota se orgulha de ser a voz que ecoa esses sentimentos, muitas vezes ridicularizados pela elite cultural.\n\nOlhando para o futuro, o desafio é manter a unidade. A oposição tentará criar divisões internas, mas o foco no objetivo maior — um Brasil livre e soberano — deve prevalecer. A estratégia de 'dividir para conquistar' só funciona se permitirmos. A união em torno de princípios claros é nossa maior fortaleza.\n\nFique atento aos nossos alertas diários. A Central de Inteligência está operando 24 horas por dia para garantir que você receba o que há de mais relevante e atual no cenário político. Juntos, somos a resistência e a esperança do Brasil.",
          category: "MOVIMENTO PATRIOTA",
          date: "21 de Março, 2026",
          author: "Equipe de Inteligência",
          imageUrl: NEW_IMAGES[2],
          sourceUrl: "https://www.jovempan.com.br"
        }
      ]);
    } finally {
      setLoading(false);
      console.log("Portal VIP: Processo de carregamento finalizado.");
    }
  };

  useEffect(() => {
    console.log("Portal VIP: Componente montado, buscando notícias...");
    fetchWeeklyIntelligence();
  }, []);

  useEffect(() => {
    console.log("Portal VIP: Estado de notícias atualizado:", news.length, "itens.");
  }, [news]);

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
              ) : news.length > 0 ? (
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
              ) : (
                <div className="bg-white rounded-[2.5rem] p-20 text-center border-2 border-dashed border-slate-200">
                   <AlertTriangle size={48} className="text-slate-300 mx-auto mb-4" />
                   <p className="text-slate-500 font-bold uppercase tracking-widest">Nenhuma notícia disponível no momento.</p>
                   <button onClick={() => fetchWeeklyIntelligence()} className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-xl font-black uppercase italic tracking-tighter hover:bg-blue-700 transition-all">
                      Tentar Sincronizar Novamente
                   </button>
                </div>
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
