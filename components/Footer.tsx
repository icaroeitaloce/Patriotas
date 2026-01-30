
import React from 'react';
import { Flag, Twitter, Instagram, Facebook, Youtube } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-950 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Flag className="text-green-500 w-8 h-8" />
              <span className="text-2xl font-black italic tracking-tighter">DIREITA 2026</span>
            </div>
            <p className="text-blue-200 text-lg max-w-md leading-relaxed">
              Pelo Brasil, pela família e pela nossa liberdade. 
              Juntos somos imbatíveis na caminhada rumo ao progresso e à verdade.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-xl mb-6 text-green-500">Links Úteis</h4>
            <ul className="space-y-4 text-blue-100">
              <li><a href="#" className="hover:text-white transition-colors">Sobre o Movimento</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Como Doar</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Agenda de Eventos</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Material Digital</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xl mb-6 text-green-500">Redes Sociais</h4>
            <div className="flex gap-4">
              <a href="#" className="p-3 bg-blue-900 rounded-full hover:bg-green-600 transition-colors"><Instagram size={24} /></a>
              <a href="#" className="p-3 bg-blue-900 rounded-full hover:bg-green-600 transition-colors"><Twitter size={24} /></a>
              <a href="#" className="p-3 bg-blue-900 rounded-full hover:bg-green-600 transition-colors"><Facebook size={24} /></a>
              <a href="#" className="p-3 bg-blue-900 rounded-full hover:bg-green-600 transition-colors"><Youtube size={24} /></a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-blue-900 flex flex-col md:row justify-between items-center gap-4 text-sm text-blue-300">
          <p>© 2024 Portal Direita 2026. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white">Política de Privacidade</a>
            <a href="#" className="hover:text-white">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
