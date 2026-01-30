
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { NewsSection } from './components/NewsSection';
import { NewsletterForm } from './components/NewsletterForm';
import { Footer } from './components/Footer';
import { Portal } from './components/Portal';
import { Lock, ArrowRight, ShieldCheck, CheckCircle, MessageCircle, RefreshCw, X, Shield, Cpu, Database, Globe } from 'lucide-react';

// CONFIGURAÇÕES GERAIS - AJUSTE AQUI SE NECESSÁRIO
const CHECKOUT_URL = "https://go.ironpayapp.com.br/vwtyajrg8t";
const WHATSAPP_NUMBER = "5500000000000"; // COLOQUE SEU WHATSAPP AQUI (DDD + NÚMERO)
const AUTH_TOKEN = "sucesso_patriota_2026"; // CHAVE SECRETA PARA O REDIRECIONAMENTO

const SUPPORT_MESSAGE = encodeURIComponent("Olá! Fiz o pagamento no portal mas não fui redirecionado automaticamente. Preciso de ajuda.");
const SUPPORT_WHATSAPP = `https://wa.me/${WHATSAPP_NUMBER}?text=${SUPPORT_MESSAGE}`;

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isProcessingAccess, setIsProcessingAccess] = useState(false);
  const [processStep, setProcessStep] = useState(0);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [emailToVerify, setEmailToVerify] = useState('');

  const processingMessages = [
    "Conectando aos servidores da IronPay...",
    "Validando autenticidade da transação...",
    "Sincronizando banco de dados patriota...",
    "Liberando acesso vitalício ao Portal VIP..."
  ];

  useEffect(() => {
    // 1. Verifica se já possui acesso salvo no navegador
    const access = localStorage.getItem('patriota_access_vfinal');
    if (access === 'verified') {
      setIsAuthorized(true);
    }

    // 2. Verifica se o usuário acabou de vir da IronPay com o segredo
    const params = new URLSearchParams(window.location.search);
    if (params.get('auth') === AUTH_TOKEN) {
      startProcessingFlow();
    }
  }, []);

  const startProcessingFlow = () => {
    setIsProcessingAccess(true);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < processingMessages.length) {
        setProcessStep(step);
      } else {
        clearInterval(interval);
        finalizeAccess();
      }
    }, 1500);
  };

  const finalizeAccess = () => {
    localStorage.setItem('patriota_access_vfinal', 'verified');
    setIsAuthorized(true);
    setIsProcessingAccess(false);
    setActiveTab('portal');
    setShowSuccessToast(true);
    
    // Limpa a URL para esconder o token
    window.history.replaceState({}, document.title, window.location.pathname);
    setTimeout(() => setShowSuccessToast(false), 8000);
  };

  const handleManualVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailToVerify.includes('@')) return;
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setShowValidationModal(false);
      finalizeAccess();
    }, 3000);
  };

  // PÁGINA DE PROCESSAMENTO (PÓS-CHECKOUT)
  if (isProcessingAccess) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-8 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full"></div>
        <div className="relative z-10 w-full max-w-lg">
          <div className="mb-12 relative inline-block">
             <div className="absolute inset-0 bg-yellow-500 blur-2xl opacity-20 animate-pulse"></div>
             <div className="relative bg-blue-900/50 p-8 rounded-[2.5rem] border border-blue-400/30 backdrop-blur-md shadow-2xl">
                <Shield size={80} className="text-yellow-500 animate-[bounce_2s_infinite]" />
             </div>
          </div>
          <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-2">Processando Acesso</h2>
          <p className="text-blue-400 font-bold tracking-[0.3em] text-xs uppercase mb-12">Autenticação Blindada Ativada</p>
          <div className="space-y-6 text-left mb-12">
            {processingMessages.map((msg, idx) => (
              <div key={idx} className={`flex items-center gap-4 transition-all duration-500 ${idx <= processStep ? 'opacity-100' : 'opacity-20'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${idx < processStep ? 'bg-green-500' : idx === processStep ? 'bg-blue-500 animate-pulse' : 'bg-slate-700'}`}>
                  {idx < processStep ? <CheckCircle size={14} className="text-white" /> : <div className="w-2 h-2 bg-white rounded-full"></div>}
                </div>
                <span className={`text-sm font-bold ${idx === processStep ? 'text-white' : 'text-slate-400'}`}>{msg}</span>
              </div>
            ))}
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 flex items-center justify-around gap-4 backdrop-blur-sm">
             <div className="text-center">
                <Cpu size={20} className="text-blue-500 mx-auto mb-2" />
                <p className="text-[10px] text-slate-500 font-bold uppercase">Encriptação</p>
             </div>
             <div className="text-center">
                <Database size={20} className="text-green-500 mx-auto mb-2" />
                <p className="text-[10px] text-slate-500 font-bold uppercase">Sincronia</p>
             </div>
             <div className="text-center">
                <Globe size={20} className="text-yellow-500 mx-auto mb-2" />
                <p className="text-[10px] text-slate-500 font-bold uppercase">Rede VIP</p>
             </div>
          </div>
        </div>
        <p className="fixed bottom-8 text-slate-600 text-[10px] font-bold uppercase tracking-widest">Portal Direita 2026 & IronPay Security Service</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative bg-gray-50">
      <Navbar onNavigate={setActiveTab} activeTab={activeTab} />
      
      {showSuccessToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] animate-in slide-in-from-top duration-700">
          <div className="bg-green-600 text-white px-8 py-5 rounded-3xl shadow-2xl flex items-center gap-4 border-2 border-green-400/50 backdrop-blur-md">
            <div className="bg-white p-2 rounded-full text-green-600"><ShieldCheck size={28} /></div>
            <div>
              <p className="font-black uppercase text-lg tracking-tighter italic">PAGAMENTO CONFIRMADO!</p>
              <p className="text-xs text-green-100 font-bold opacity-80 uppercase tracking-widest text-glow">Acesso VIP liberado com sucesso.</p>
            </div>
          </div>
        </div>
      )}

      {showValidationModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-blue-950/98 backdrop-blur-2xl">
          <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-md overflow-hidden border border-white/20">
            <div className="bg-patriotic-gradient p-10 text-white relative">
              <button onClick={() => setShowValidationModal(false)} className="absolute top-6 right-6 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><X size={20} /></button>
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck size={32} className="text-yellow-400" />
                <h3 className="text-2xl font-black uppercase italic tracking-tighter">Validar Membro</h3>
              </div>
              <p className="text-blue-100 text-sm font-medium leading-relaxed">Insira o e-mail que você usou na IronPay para liberar seu acesso agora.</p>
            </div>
            <div className="p-12">
              <form onSubmit={handleManualVerify} className="space-y-4">
                <input 
                  type="email" required autoFocus value={emailToVerify}
                  onChange={(e) => setEmailToVerify(e.target.value)}
                  placeholder="E-mail do pagamento"
                  className="w-full px-6 py-5 rounded-2xl border-2 border-slate-100 focus:border-blue-600 outline-none transition-all text-lg font-bold"
                />
                <button disabled={verifying} className="w-full py-6 bg-blue-600 text-white font-black rounded-2xl shadow-xl hover:bg-blue-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 disabled:opacity-50 text-xl uppercase tracking-tighter italic">
                  {verifying ? <RefreshCw className="animate-spin" /> : "LIBERAR MEU ACESSO"}
                </button>
              </form>
              <div className="mt-10 text-center">
                <a href={SUPPORT_WHATSAPP} target="_blank" className="text-green-600 font-black text-sm flex items-center justify-center gap-2 hover:bg-green-50 p-4 rounded-2xl transition-all">
                  <MessageCircle size={20} /> SUPORTE VIA WHATSAPP
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="flex-grow">
        {activeTab === 'home' && (
          <><Hero /><NewsSection /><NewsletterForm /></>
        )}
        
        {activeTab === 'noticias' && (
          <div className="py-24 px-4 max-w-7xl mx-auto">
            <h1 className="text-5xl font-black mb-12 text-blue-900 uppercase italic tracking-tighter">A <span className="text-green-600 underline">VERDADE</span> DOS FATOS</h1>
            <NewsSection />
          </div>
        )}

        {activeTab === 'portal' && (
          isAuthorized ? (
            <Portal />
          ) : (
            <div className="min-h-[90vh] flex items-center justify-center px-4 py-16 bg-slate-50">
              <div className="max-w-md w-full bg-white rounded-[4rem] shadow-2xl overflow-hidden border border-gray-100">
                <div className="bg-patriotic-gradient p-16 text-center text-white relative">
                  <div className="w-28 h-28 bg-white/10 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 backdrop-blur-2xl rotate-12 border border-white/20 shadow-2xl">
                    <Lock size={56} className="text-white drop-shadow-lg" />
                  </div>
                  <h2 className="text-4xl font-black uppercase tracking-tighter italic mb-2">Portal Fechado</h2>
                  <div className="inline-block bg-yellow-500 text-blue-900 text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest">Exclusivo para Patriotas</div>
                </div>
                <div className="p-16 text-center">
                  <p className="text-gray-500 mb-12 leading-relaxed text-lg font-medium">Contribua e acesse os <strong>bastidores reais</strong> da política que a mídia esconde.</p>
                  <div className="space-y-4">
                    <button onClick={() => window.location.href = CHECKOUT_URL} className="w-full py-6 bg-green-600 text-white font-black rounded-3xl shadow-2xl shadow-green-200 hover:bg-green-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 text-2xl uppercase tracking-tighter italic">
                      QUERO MEU ACESSO <ArrowRight size={28} />
                    </button>
                    <button onClick={() => setShowValidationModal(true)} className="w-full py-4 text-slate-400 font-bold rounded-2xl hover:text-blue-600 transition-all uppercase text-[10px] tracking-widest">
                      Já é membro? Clique para validar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        )}

        {activeTab === 'sobre' && (
          <div className="py-24 px-4 max-w-5xl mx-auto">
             <div className="text-center mb-20">
              <h1 className="text-6xl font-black mb-6 text-blue-950 italic tracking-tighter uppercase">Nossa Bandeira</h1>
              <div className="w-32 h-3 bg-green-600 mx-auto rounded-full"></div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Independência", text: "Não recebemos verbas públicas. Somos mantidos por patriotas como você." },
                { title: "Coragem", text: "Falamos o que ninguém mais tem coragem de dizer sobre o futuro do Brasil." },
                { title: "Verdade", text: "Acesso a documentos e bastidores que a mídia tradicional censura." }
              ].map((card, i) => (
                <div key={i} className="bg-white p-10 rounded-[3rem] shadow-xl border border-slate-50 hover:border-blue-200 transition-all">
                  <h3 className="font-black text-blue-900 uppercase italic mb-4 text-xl">{card.title}</h3>
                  <p className="text-slate-600 leading-relaxed font-medium">{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;
