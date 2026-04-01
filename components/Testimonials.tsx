
import React from 'react';
import { MessageCircle, Star } from 'lucide-react';
import { motion } from 'motion/react';

const testimonials = [
  { name: "João Silva", text: "Finalmente a verdade que ninguém conta! O Portal VIP é essencial para quem quer entender o que realmente acontece em Brasília.", role: "Membro VIP desde 2024" },
  { name: "Maria Oliveira", text: "O melhor investimento que fiz este ano. Informação de qualidade, sem filtros e com uma análise que não encontramos na grande mídia.", role: "Assinante Vitalícia" },
  { name: "Carlos Santos", text: "Sem filtros e direto ao ponto. Parabéns pela coragem de mostrar o que os outros tentam esconder!", role: "Membro VIP" },
  { name: "Ana Souza", text: "Essencial para quem ama o Brasil e quer estar bem informado sobre os bastidores do poder e as eleições de 2026.", role: "Assinante Mensal" }
];

export const Testimonials: React.FC = () => {
  return (
    <section className="bg-black py-24 border-y border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-patriotic-green/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-patriotic-yellow/10 text-patriotic-yellow border border-patriotic-yellow/20 text-[10px] font-black tracking-widest uppercase mb-6"
          >
            <MessageCircle size={14} /> PROVA SOCIAL REAL
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-4">
            O QUE DIZEM OS <span className="text-patriotic-green">PATRIOTAS</span>
          </h2>
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Milhares de brasileiros já acessaram a verdade. Veja alguns relatos.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((dep, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-900/50 p-8 rounded-sm border border-white/5 hover:border-patriotic-yellow/30 transition-all group"
            >
              <div className="flex gap-1 mb-6">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} size={14} className="fill-patriotic-yellow text-patriotic-yellow" />
                ))}
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed italic font-bold mb-8 group-hover:text-white transition-colors">
                "{dep.text}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-patriotic-green rounded-full flex items-center justify-center text-sm font-black text-white shadow-[0_0_15px_rgba(0,155,58,0.3)]">
                  {dep.name[0]}
                </div>
                <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-tighter">{dep.name}</h4>
                  <p className="text-[9px] text-zinc-600 font-black uppercase tracking-widest">{dep.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
