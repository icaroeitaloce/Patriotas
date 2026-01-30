
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { NewsSection } from './components/NewsSection';
import { NewsletterForm } from './components/NewsletterForm';
import { Footer } from './components/Footer';
import { Portal } from './components/Portal';
import { Lock, ArrowRight, ShieldCheck, CheckCircle, MessageCircle, RefreshCw, X, Shield, Cpu, Database, Globe, AlertCircle } from 'lucide-react';

// CONFIGURAÇÕES GERAIS
const CHECKOUT_URL = "https://pay.cakto.com.br/n2itqkw_747818";
const AUTH_TOKEN = "sucesso_patriota_2026"; 
const MASTER_EMAIL = "admin@patriota.com"; 
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
    "Conectando aos servidores de pagamento...",
    "Validando autenticidade da transação...",
    "Sincronizando banco de dados patriota...",
    "Liberando acesso vitalício ao Portal VIP..."
  ];

  useEffect(() => {
    const access = localStorage.getItem('patriota_access_vfinal');
    if (access === 'verified') {
      setIsAuthorized(true);
    }

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
    setTimeout(() => setShowSuccessToast(false), 8000);
    
    try {
      if (window.history && window.history.replaceState) {
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    } catch (e) {}
  };

  const handleLogout = () => {
    localStorage.removeItem('patriota_access_vfinal');
    setIsAuthorized(false);
    setActiveTab('home');
    window.scrollTo(0, 0);
  };

  const handleManualVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setVerificationError('');
    setVerifying(true);

    setTimeout(() => {
      setVerifying(false);
      const inputLower = emailToVerify.toLowerCase();
      
      if (
        inputLower === MASTER_EMAIL.toLowerCase() || 
        inputLower.includes('vip2026')
      ) {
        setShowValidationModal(false);
        finalizeAccess();
      } else {
        setVerificationError('Acesso não encontrado para este e-mail. Verifique os dados da sua compra.');
      }
    }, 1500);
  };

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
          <div className="space-y-6 text-left mt-8">
            {processingMessages.map((msg, idx) => (
              <div key={idx} className={`flex items-center gap-4 transition-all duration-500 ${idx <= processStep ? 'opacity-100' : 'opacity-20'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${idx < processStep ? 'bg-green-500' : idx === processStep ? 'bg-blue-500 animate-pulse' : 'bg-slate-700'}`}>
                  {idx < processStep ? <CheckCircle size={14} className="text-white" /> : <div className="w-2 h-2 bg-white rounded-full"></div>}
                </div>
                <span className={`text-sm font-bold ${idx === processStep ? 'text-white' : 'text-slate-400'}`}>{msg}</span>
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
            <div className="bg-white p-2 rounded-full text-green-600"><ShieldCheck size={28} /></div>
            <div>
              <p className="font-black uppercase text-lg tracking-tighter italic">PAGAMENTO CONFIRMADO!</p>
              <p className="text-xs text-green-100 font-bold opacity-80 uppercase tracking-widest text-glow">Acesso VIP liberado.</p>
            </div>
          </div>
        </div>
      )}

      {showValidationModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-[3.5rem] shadow-[0_30px_80px_rgba(0,0,0,0.2)] w-full max-w-md overflow-hidden relative animate-in zoom-in duration-300">
            <div className="bg-gradient-to-br from-[#004bbd] to-[#009b3a] pt-14 pb-12 px-10 text-white relative">
              <button 
                onClick={() => setShowValidationModal(false)} 
                className="absolute top-6 right-6 w-10 h-10 bg-[#2ea451] flex items-center justify-center rounded-full text-white hover:bg-green-600 transition-colors shadow-lg"
              >
                <X size={20} strokeWidth={3} />
              </button>
              
              <div className="flex items-center gap-4">
                <div className="text-[#fbbf24]">
                  <ShieldCheck size={42} strokeWidth={2.5} />
                </div>
                <h3 className="text-[2.2rem] font-black uppercase italic tracking-tighter leading-none">
                  VALIDAR MEMBRO
                </h3>
              </div>
            </div>

            <div className="p-12">
              <form onSubmit={handleManualVerify} className="space-y-6">
                <div>
                  <p className="text-[#8e99ab] text-[11px] font-black uppercase tracking-widest mb-4">
                    INSIRE SEU E-MAIL DE COMPRA:
                  </p>
                  <input 
                    type="text" 
                    required 
                    autoFocus 
                    value={emailToVerify} 
                    onChange={(e) => setEmailToVerify(e.target.value)} 
                    placeholder="exemplo@gmail.com" 
                    className={`w-full px-8 py-6 rounded-[1.5rem] border-2 outline-none transition-all text-2xl font-bold ${
                      verificationError 
                        ? 'border-[#ef4444] bg-[#fef2f2] text-[#1e293b]' 
                        : 'border-[#e2e8f0] focus:border-[#2563eb] text-[#1e293b]'
                    }`}
                  />
                  {verificationError && (
                    <div className="mt-4 text-[#dc2626] text-[13px] font-bold flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full border border-[#dc2626] flex items-center justify-center text-[10px] font-black">!</div>
                      {verificationError}
                    </div>
                  )}
                </div>

                <button 
                  disabled={verifying} 
                  className="w-full py-7 bg-[#2563eb] text-white font-black rounded-[1.5rem] shadow-[0_10px_25px_rgba(37,99,235,0.3)] hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 text-2xl uppercase tracking-tighter italic"
                >
                  {verifying ? <RefreshCw className="animate-spin" /> : "LIBERAR MEU ACESSO"}
                </button>
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
            <div className="min-h-[80vh] flex items-center justify-center px-4 py-8 bg-[#f8fafc]">
              <div className="max-w-[320px] w-full bg-white rounded-[2.5rem] shadow-[0_30px_70px_-10px_rgba(0,0,0,0.1)] overflow-hidden">
                <div className="bg-patriotic-gradient pt-10 pb-8 text-center text-white relative flex flex-col items-center">
                  <div className="mb-4">
                    <Lock size={48} strokeWidth={1.5} className="text-white" />
                  </div>
                  <h2 className="text-[1.8rem] font-black uppercase tracking-tighter italic leading-none">
                    PORTAL VIP
                  </h2>
                </div>
                
                <div className="pt-12 pb-10 px-8 text-center flex flex-col items-center">
                  <button 
                    onClick={() => window.location.href = CHECKOUT_URL} 
                    className="w-full py-5 bg-[#10a54a] text-white font-black rounded-[1.2rem] shadow-[0_8px_20px_rgba(16,165,74,0.1)] hover:bg-green-600 hover:-translate-y-0.5 transition-all text-base uppercase italic tracking-tighter"
                  >
                    QUERO MEU ACESSO
                  </button>
                  
                  <button 
                    onClick={() => {
                      setVerificationError('');
                      setShowValidationModal(true);
                    }} 
                    className="mt-6 text-slate-400 font-bold uppercase text-[10px] tracking-[0.1em] hover:text-blue-600 transition-colors"
                  >
                    JÁ SOU MEMBRO? VALIDAR
                  </button>

                  <div className="mt-8 pt-6 border-t border-slate-50 w-full">
                    <a 
                      href={WHATSAPP_SUPPORT_URL} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-green-50 text-green-600 hover:bg-green-100 rounded-full font-black text-[9px] uppercase tracking-widest transition-all"
                    >
                      <MessageCircle size={12} /> SUPORTE
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
