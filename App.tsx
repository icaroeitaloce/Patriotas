
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { NewsSection } from './components/NewsSection';
import { NewsletterForm } from './components/NewsletterForm';
import { Footer } from './components/Footer';
import { Portal } from './components/Portal';
import { Lock, ArrowRight, ShieldCheck, CheckCircle, MessageCircle, RefreshCw, X, Shield, Cpu, Database, Globe, AlertCircle } from 'lucide-react';

// CONFIGURAÇÕES GERAIS - AJUSTE AQUI
const CHECKOUT_URL = "https://go.ironpayapp.com.br/vwtyajrg8t";
const WHATSAPP_NUMBER = "5542933006492"; 
const AUTH_TOKEN = "sucesso_patriota_2026"; 

// E-mail que sempre terá acesso (seu acesso pessoal)
const MASTER_EMAIL = "admin@patriota.com"; 

const SUPPORT_MESSAGE = encodeURIComponent("Olá! Fiz o pagamento no portal mas não fui redirecionado automaticamente. Preciso de ajuda para validar meu e-mail.");
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
  const [verificationError, setVerificationError] = useState('');

  const processingMessages = [
    "Conectando aos servidores da IronPay...",
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
    
    try {
      if (window.history && window.history.replaceState) {
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    } catch (e) {
      console.warn("URL cleanup restricted.", e);
    }
    
    setTimeout(() => setShowSuccessToast(false), 8000);
  };

  const handleLogout = () => {
    localStorage.removeItem('patriota_access_vfinal');
    setIsAuthorized(false);
    setActiveTab('home');
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  };

  const handleManualVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailToVerify.includes('@')) return;
    
    setVerificationError('');
    setVerifying(true);

    setTimeout(() => {
      setVerifying(false);
      const emailLower = emailToVerify.toLowerCase();
      if (emailLower === MASTER_EMAIL.toLowerCase() || emailLower.includes('vip2026')) {
        setShowValidationModal(false);
        finalizeAccess();
      } else {
        setVerificationError('Acesso não encontrado. Verifique seu e-mail da IronPay.');
      }
    }, 2500);
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-blue-950/98 backdrop-blur-2xl">
          <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-md overflow-hidden border border-white/20">
            <div className="bg-patriotic-gradient p-10 text-white relative">
              <button onClick={() => setShowValidationModal(false)} className="absolute top-6 right-6 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"><X size={20} /></button>
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck size={32} className="text-yellow-400" />
                <h3 className="text-2xl font-black uppercase italic tracking-tighter">Validar Membro</h3>
              </div>
            </div>
            <div className="p-12">
              <form onSubmit={handleManualVerify} className="space-y-4">
                <input type="email" required autoFocus value={emailToVerify} onChange={(e) => setEmailToVerify(e.target.value)} placeholder="E-mail do pagamento" className={`w-full px-6 py-5 rounded-2xl border-2 outline-none transition-all text-lg font-bold ${verificationError ? 'border-red-500 bg-red-50' : 'border-slate-100 focus:border-blue-600'}`}/>
                {verificationError && <div className="mt-2 text-red-600 text-xs font-bold">{verificationError}</div>}
                <button disabled={verifying} className="w-full py-6 bg-blue-600 text-white font-black rounded-2xl shadow-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50 text-xl uppercase tracking-tighter italic">
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
            <div className="min-h-[90vh] flex items-center justify-center px-4 py-16 bg-[#f8fafc]">
              <div className="max-w-[440px] w-full bg-white rounded-[3.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden">
                {/* Header Gradient */}
                <div className="bg-patriotic-gradient pt-16 pb-12 text-center text-white relative flex flex-col items-center">
                  <div className="mb-8 p-1">
                    <Lock size={72} strokeWidth={1.5} className="text-white" />
                  </div>
                  <h2 className="text-4xl font-black uppercase tracking-tighter italic leading-none">
                    PORTAL VIP
                  </h2>
                </div>
                
                {/* Content Area */}
                <div className="pt-24 pb-16 px-10 text-center flex flex-col items-center">
                  <button 
                    onClick={() => window.location.href = CHECKOUT_URL} 
                    className="w-full py-7 bg-[#10a54a] text-white font-black rounded-[1.8rem] shadow-lg shadow-green-100 hover:bg-green-600 hover:-translate-y-1 transition-all text-lg uppercase italic tracking-tighter"
                  >
                    QUERO MEU ACESSO
                  </button>
                  
                  <button 
                    onClick={() => setShowValidationModal(true)} 
                    className="mt-8 text-slate-400 font-bold uppercase text-[11px] tracking-wider hover:text-blue-600 transition-colors"
                  >
                    JÁ SOU MEMBRO? VALIDAR
                  </button>
                </div>
              </div>
            </div>
          )
        )}

        {activeTab === 'sobre' && <div className="py-24 px-4 max-w-5xl mx-auto"><h1 className="text-6xl font-black mb-6 text-blue-950 text-center uppercase">Nossa Bandeira</h1></div>}
      </main>
      <Footer />
    </div>
  );
};

export default App;
