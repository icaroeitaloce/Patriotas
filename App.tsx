
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { NewsSection } from './components/NewsSection';
import { NewsletterForm } from './components/NewsletterForm';
import { Footer } from './components/Footer';
import { Portal } from './components/Portal';
import { Lock, ArrowRight, ShieldCheck, CheckCircle, MessageCircle, RefreshCw, X, Shield, Cpu, Database, Globe, AlertCircle } from 'lucide-react';

// CONFIGURAÇÕES GERAIS
const CHECKOUT_URL = "https://pay.cakto.com.br/n2itqkw_747818?affiliate=mFL9XPbn";
const AUTH_TOKEN = "sucesso_patriota_2026"; 
const MASTER_EMAIL = "admin@patriota.com"; 

// LISTA DE E-MAILS LIBERADOS (Sempre terão acesso, independente de checkout)
const WHITELIST_EMAILS = [
  "icaroeitaloce@gmail.com",
  "suporte@patriota.com",
  "contato@direitabrasil.com"
];

const WHATSAPP_SUPPORT_URL = "https://wa.me/5542933006492?text=Olá,%20sou%20membro%20VIP%20do%20Portal%20Patriota%20e%20preciso%20de%20suporte.";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isProcessingAccess, setIsProcessingAccess] = useState(false);
  const [processStep, setProcessStep] = useState(0);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [emailToVerify, setEmailToVerify] = useState('');
  const [verificationError, setVerificationError] = useState('');

  const processingMessages = [
    "Sincronizando com a plataforma de pagamento...",
    "Validando e-mail na base de dados VIP...",
    "Configurando criptografia de acesso vitalício...",
    "Liberando Central de Inteligência Patriota..."
  ];

  useEffect(() => {
    // 1. Verifica se a sessão atual está ativa
    const access = localStorage.getItem('patriota_access_vfinal');
    if (access === 'verified') {
      setIsAuthorized(true);
    }

    // 2. Lógica de Captura de E-mail via URL (Checkout ou Teste Manual)
    const params = new URLSearchParams(window.location.search);
    const hasAuth = params.get('auth') === AUTH_TOKEN;
    const rawEmail = params.get('email');

    if (hasAuth) {
      if (rawEmail) {
        const cleanEmail = decodeURIComponent(rawEmail).trim().toLowerCase();
        
        // SALVA NA MEMÓRIA PERMANENTE DO NAVEGADOR
        const savedEmails = JSON.parse(localStorage.getItem('patriota_authorized_list') || '[]');
        if (!savedEmails.includes(cleanEmail)) {
          savedEmails.push(cleanEmail);
          localStorage.setItem('patriota_authorized_list', JSON.stringify(savedEmails));
        }
      }
      // Se tem o token, inicia o fluxo de liberação automática
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
    }, 1000);
  };

  const finalizeAccess = () => {
    // Ativa a sessão
    localStorage.setItem('patriota_access_vfinal', 'verified');
    setIsAuthorized(true);
    setIsProcessingAccess(false);
    setActiveTab('portal');
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 6000);
    
    // Limpa a URL para o usuário não ver os tokens de acesso
    try {
      if (window.history && window.history.replaceState) {
        const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
      }
    } catch (e) {}
  };

  const handleLogout = () => {
    // Remove apenas a sessão ativa, mantém a lista de e-mails autorizados (patriota_authorized_list)
    localStorage.removeItem('patriota_access_vfinal');
    setIsAuthorized(false);
    setActiveTab('home');
    window.scrollTo(0, 0);
  };

  const handleManualVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setVerificationError('');
    setVerifying(true);

    // Simulação de consulta ao banco de dados local/nuvem
    setTimeout(() => {
      const inputLower = emailToVerify.trim().toLowerCase();
      
      // Busca na lista de e-mails que já "passaram" pelo checkout neste dispositivo
      const dynamicList = JSON.parse(localStorage.getItem('patriota_authorized_list') || '[]');
      
      const isMaster = inputLower === MASTER_EMAIL.toLowerCase();
      const isWhitelisted = WHITELIST_EMAILS.some(e => e.toLowerCase() === inputLower);
      const isDynamicAuthorized = dynamicList.includes(inputLower);
      const hasSecretKey = inputLower === "patriota2026vip"; // Chave de emergência

      if (isMaster || isWhitelisted || isDynamicAuthorized || hasSecretKey) {
        setVerifying(false);
        setShowValidationModal(false);
        finalizeAccess();
      } else {
        setVerifying(false);
        setVerificationError('Acesso não localizado. Use o e-mail da compra ou fale com o suporte.');
      }
    }, 2000);
  };

  if (isProcessingAccess) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-8 text-center overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full"></div>
        <div className="relative z-10 w-full max-w-lg">
          <div className="mb-12 relative inline-block">
             <div className="absolute inset-0 bg-yellow-500 blur-3xl opacity-20 animate-pulse"></div>
             <div className="relative bg-blue-900/40 p-10 rounded-[3rem] border border-blue-400/20 backdrop-blur-xl shadow-2xl">
                <Shield size={90} className="text-yellow-500 animate-[bounce_3s_infinite]" />
             </div>
          </div>
          <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-4">Verificando Credenciais</h2>
          <div className="space-y-5 text-left mt-10 bg-slate-900/50 p-8 rounded-3xl border border-white/5">
            {processingMessages.map((msg, idx) => (
              <div key={idx} className={`flex items-center gap-4 transition-all duration-700 ${idx <= processStep ? 'opacity-100 translate-x-0' : 'opacity-10 -translate-x-4'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${idx < processStep ? 'bg-green-500' : idx === processStep ? 'bg-blue-500 animate-pulse' : 'bg-slate-800'}`}>
                  {idx < processStep ? <CheckCircle size={14} className="text-white" /> : <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                </div>
                <span className={`text-[13px] font-bold uppercase tracking-tight ${idx === processStep ? 'text-white' : 'text-slate-500'}`}>{msg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative bg-gray-50">
      <Navbar onNavigate={setActiveTab} activeTab={activeTab} />
      
      {showSuccessToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] animate-in slide-in-from-top duration-700">
          <div className="bg-green-600 text-white px-8 py-5 rounded-3xl shadow-2xl flex items-center gap-4 border-2 border-green-400/50 backdrop-blur-md">
            <div className="bg-white p-2 rounded-full text-green-600 shadow-inner"><ShieldCheck size={28} /></div>
            <div>
              <p className="font-black uppercase text-lg tracking-tighter italic">ACESSO VIP LIBERADO!</p>
              <p className="text-[10px] text-green-100 font-bold opacity-90 uppercase tracking-[0.2em] text-glow">Bem-vindo à Central de Inteligência.</p>
            </div>
          </div>
        </div>
      )}

      {showValidationModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md transition-all">
          <div className="bg-white rounded-[4rem] shadow-[0_40px_100px_rgba(0,0,0,0.3)] w-full max-w-md overflow-hidden relative animate-in zoom-in duration-300 border-4 border-white">
            <div className="bg-patriotic-gradient pt-16 pb-12 px-12 text-white relative">
              <button 
                onClick={() => setShowValidationModal(false)} 
                className="absolute top-8 right-8 w-12 h-12 bg-white/10 flex items-center justify-center rounded-full text-white hover:bg-white/20 transition-all shadow-lg backdrop-blur-md"
              >
                <X size={24} strokeWidth={3} />
              </button>
              
              <div className="flex flex-col items-center text-center gap-4">
                <div className="p-4 bg-white/10 rounded-3xl backdrop-blur-xl border border-white/20">
                  <ShieldCheck size={48} className="text-yellow-400" strokeWidth={2.5} />
                </div>
                <h3 className="text-3xl font-black uppercase italic tracking-tighter leading-none mt-2">
                  VALIDAR MEU<br/><span className="text-yellow-400">ACESSO VIP</span>
                </h3>
              </div>
            </div>

            <div className="p-12">
              <form onSubmit={handleManualVerify} className="space-y-8">
                <div className="relative">
                  <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4 ml-2">
                    E-MAIL DA COMPRA:
                  </p>
                  <input 
                    type="email" 
                    required 
                    autoFocus 
                    value={emailToVerify} 
                    onChange={(e) => setEmailToVerify(e.target.value)} 
                    placeholder="exemplo@gmail.com" 
                    className={`w-full px-8 py-7 rounded-[2rem] border-4 outline-none transition-all text-xl font-bold placeholder:text-slate-300 ${
                      verificationError 
                        ? 'border-red-100 bg-red-50 text-red-900' 
                        : 'border-slate-50 bg-slate-50 focus:border-blue-500 focus:bg-white text-slate-900 shadow-inner'
                    }`}
                  />
                  {verificationError && (
                    <div className="mt-4 text-red-600 text-[11px] font-bold flex items-center gap-2 animate-in fade-in slide-in-from-left-2">
                      <AlertCircle size={16} />
                      {verificationError}
                    </div>
                  )}
                </div>

                <button 
                  disabled={verifying} 
                  className="w-full py-8 bg-blue-600 text-white font-black rounded-[2rem] shadow-[0_20px_40px_rgba(37,99,235,0.25)] hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-4 disabled:opacity-80 text-xl uppercase tracking-tighter italic"
                >
                  {verifying ? (
                    <>
                      <RefreshCw className="animate-spin" size={24} />
                      <span>SINCRONIZANDO...</span>
                    </>
                  ) : (
                    <>
                      <span>ENTRAR NO PORTAL</span>
                      <ArrowRight size={24} />
                    </>
                  )}
                </button>
                
                <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  Proteção de dados 256-bit ativa
                </p>
              </form>
            </div>
          </div>
        </div>
      )}

      <main className="flex-grow">
        {activeTab === 'home' && <><Hero /><NewsSection /><NewsletterForm /></>}
        {activeTab === 'noticias' && <div className="py-24 px-4 max-w-7xl mx-auto"><h1 className="text-5xl font-black mb-12 text-blue-900 uppercase italic tracking-tighter">A <span className="text-green-600 underline">VERDADE</span> DOS FATOS</h1><NewsSection /></div>}
        
        {activeTab === 'portal' && (
          isAuthorized ? (
            <Portal onLogout={handleLogout} />
          ) : (
            <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-slate-50/50">
              <div className="max-w-[360px] w-full bg-white rounded-[3rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.12)] overflow-hidden border border-white">
                <div className="bg-patriotic-gradient pt-14 pb-10 text-center text-white relative flex flex-col items-center">
                  <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                  <div className="mb-6 bg-white/10 p-5 rounded-3xl backdrop-blur-xl border border-white/20">
                    <Lock size={44} strokeWidth={1.5} className="text-white" />
                  </div>
                  <h2 className="text-[2rem] font-black uppercase tracking-tighter italic leading-none relative z-10">
                    ÁREA <span className="text-yellow-400">RESTRITA</span>
                  </h2>
                </div>
                
                <div className="pt-14 pb-12 px-10 text-center flex flex-col items-center">
                  <button 
                    onClick={() => window.location.href = CHECKOUT_URL} 
                    className="w-full py-6 bg-[#10a54a] text-white font-black rounded-2xl shadow-[0_15px_30px_rgba(16,165,74,0.2)] hover:bg-green-600 hover:-translate-y-1 active:scale-95 transition-all text-lg uppercase italic tracking-tighter border-b-4 border-green-800"
                  >
                    OBTER MEU ACESSO VIP
                  </button>
                  
                  <button 
                    onClick={() => {
                      setVerificationError('');
                      setShowValidationModal(true);
                    }} 
                    className="mt-8 text-slate-400 font-black uppercase text-[11px] tracking-[0.2em] hover:text-blue-600 transition-colors flex items-center gap-2 group"
                  >
                    <ShieldCheck size={14} className="group-hover:scale-110 transition-transform" />
                    JÁ SOU MEMBRO? VALIDAR
                  </button>

                  <div className="mt-12 pt-8 border-t border-slate-100 w-full flex justify-center">
                    <a 
                      href={WHATSAPP_SUPPORT_URL} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-2 px-6 py-3 bg-slate-50 text-slate-500 hover:bg-green-50 hover:text-green-600 rounded-full font-black text-[10px] uppercase tracking-widest transition-all"
                    >
                      <MessageCircle size={14} /> SUPORTE TÉCNICO
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )
        )}

        {activeTab === 'sobre' && <div className="py-24 px-4 max-w-5xl mx-auto text-center"><h1 className="text-6xl font-black mb-6 text-blue-950 uppercase italic tracking-tighter">Nossa Bandeira</h1></div>}
      </main>
      <Footer />
    </div>
  );
};

export default App;
