
import React from 'react';
import { Flag, Twitter, Instagram, Facebook, Youtube } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-24 px-4 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-8">
              <span className="text-3xl font-black italic tracking-tighter uppercase">
                JORNAL <span className="text-patriotic-green">PATRIOTA</span>
              </span>
            </div>
            <p className="text-zinc-500 text-lg font-medium leading-relaxed">
              A última linha de defesa da informação livre e soberana no Brasil.
            </p>
          </div>

          <div>
            <h4 className="font-black text-xs uppercase tracking-[0.3em] mb-8 text-patriotic-yellow">Navegação</h4>
            <ul className="space-y-4">
              {['Início', 'Notícias', 'Portal VIP', 'Sobre Nós'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-zinc-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black text-xs uppercase tracking-[0.3em] mb-8 text-patriotic-yellow">Legal</h4>
            <ul className="space-y-4">
              {['Termos de Uso', 'Privacidade', 'Cookies', 'Contato'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-zinc-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black text-xs uppercase tracking-[0.3em] mb-8 text-patriotic-yellow">Redes Sociais</h4>
            <div className="flex gap-4">
              {[Twitter, Facebook, Instagram, Youtube].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-12 h-12 bg-white/5 rounded-sm flex items-center justify-center text-zinc-400 hover:bg-patriotic-green hover:text-white transition-all border border-white/5"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">
          <p>© 2026 JORNAL PATRIOTA. TODOS OS DIREITOS RESERVADOS.</p>
          <p className="flex items-center gap-2">
            <Flag size={12} className="text-patriotic-green" /> CONTEÚDO PROTEGIDO
          </p>
        </div>
      </div>
    </footer>
  );
};
