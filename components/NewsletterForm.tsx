
import React, { useState } from 'react';
import { Send, Mail, User, ShieldCheck } from 'lucide-react';

const CHECKOUT_URL = "https://go.ironpayapp.com.br/vwtyajrg8t";

export const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name) {
      setSubmitted(true);
      // Simulate API call and redirect
      setTimeout(() => {
        window.location.href = CHECKOUT_URL;
      }, 3000);
    }
  };

  return (
    <section className="py-24 bg-patriotic-gradient relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {!submitted ? (
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-4 uppercase italic tracking-tighter">
                Receba Tudo em Primeira Mão
              </h2>
              <p className="text-gray-600 text-lg">
                Junte-se aos milhares de patriotas que recebem informações exclusivas sobre 2026.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Seu Nome Completo"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    placeholder="Seu Melhor E-mail"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-gray-500">
                <ShieldCheck size={18} className="text-green-600" />
                Seus dados estão protegidos. Não enviamos spam.
              </div>

              <button
                type="submit"
                className="w-full py-5 bg-blue-600 text-white font-black text-xl rounded-xl shadow-xl hover:bg-blue-700 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 uppercase tracking-widest"
              >
                CADASTRAR AGORA <Send size={24} />
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 shadow-2xl text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <ShieldCheck className="text-green-600 w-10 h-10" />
            </div>
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Inscrição Confirmada!</h2>
            <p className="text-gray-600 text-lg mb-8">
              Obrigado {name.split(' ')[0]}! Estamos te redirecionando para o nosso <strong>Portal VIP</strong> exclusivo...
            </p>
            <div className="flex flex-col items-center gap-4">
              <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full animate-[progress_3s_ease-in-out]" style={{width: '100%'}}></div>
              </div>
              <button 
                onClick={() => window.location.href = CHECKOUT_URL}
                className="text-blue-600 font-bold hover:underline"
              >
                Clique aqui se não for redirecionado em 3 segundos.
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
