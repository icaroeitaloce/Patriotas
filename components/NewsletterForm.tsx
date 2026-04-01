
import React, { useState } from 'react';
import { Send, Mail, User, ShieldCheck } from 'lucide-react';

interface NewsletterProps {
  onNavigate: (tab: string) => void;
}

export const NewsletterForm: React.FC<NewsletterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name) {
      setSubmitted(true);
      setTimeout(() => {
        onNavigate('pricing');
      }, 3000);
    }
  };

  return (
    <section className="py-32 bg-black relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-transparent to-black"></div>
      
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {!submitted ? (
          <div className="bg-zinc-900/80 backdrop-blur-xl rounded-sm p-10 md:p-16 border border-white/10 shadow-[0_0_100px_rgba(0,0,0,1)]">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase italic tracking-tighter">
                ACESSO <span className="text-patriotic-yellow underline">RESTRITO</span>
              </h2>
              <p className="text-zinc-400 text-lg font-medium">
                Inscreva-se para receber os relatórios que a grande mídia está <span className="text-white font-bold">proibida</span> de divulgar.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative">
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600" size={20} />
                  <input
                    type="text"
                    placeholder="NOME COMPLETO"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-16 pr-6 py-5 bg-black rounded-sm border border-white/10 focus:border-patriotic-yellow outline-none transition-all text-white font-bold tracking-widest text-sm placeholder:text-zinc-800"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-600" size={20} />
                  <input
                    type="email"
                    placeholder="E-MAIL SEGURO"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-16 pr-6 py-5 bg-black rounded-sm border border-white/10 focus:border-patriotic-yellow outline-none transition-all text-white font-bold tracking-widest text-sm placeholder:text-zinc-800"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">
                <ShieldCheck size={18} className="text-patriotic-green" />
                CRIPTOGRAFIA DE PONTA A PONTA ATIVA. SEM SPAM.
              </div>

              <button
                type="submit"
                className="w-full py-6 bg-patriotic-green text-white font-black text-xl rounded-sm shadow-[0_10px_30px_rgba(0,155,58,0.2)] hover:bg-green-500 hover:-translate-y-1 transition-all flex items-center justify-center gap-4 uppercase tracking-tighter italic"
              >
                CADASTRAR AGORA <Send size={24} />
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-zinc-900 rounded-sm p-16 border border-white/10 text-center shadow-[0_0_100px_rgba(0,0,0,1)]">
            <div className="w-24 h-24 bg-patriotic-green/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse border border-patriotic-green/30">
              <ShieldCheck className="text-patriotic-green w-12 h-12" />
            </div>
            <h2 className="text-4xl font-black text-white mb-4 uppercase italic tracking-tighter">CADASTRO EFETUADO</h2>
            <p className="text-zinc-400 text-lg mb-12">
              Aguarde, {name.split(' ')[0]}. Estamos preparando seu <span className="text-patriotic-yellow font-bold">Dossiê VIP</span>...
            </p>
            <div className="flex flex-col items-center gap-4">
              <div className="w-full bg-black h-1 rounded-full overflow-hidden">
                <div className="bg-patriotic-yellow h-full animate-[progress_3s_ease-in-out]" style={{width: '100%'}}></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
