
import React, { useState } from 'react';
import { Flag, Menu, X, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onNavigate: (tab: string) => void;
  activeTab: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeTab }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Início' },
    { id: 'noticias', label: 'Notícias' },
    { id: 'portal', label: 'Portal VIP', icon: <ShieldCheck size={14} className="text-patriotic-yellow" /> },
    { id: 'sobre', label: 'Sobre' },
  ];

  return (
    <nav className="bg-black/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => onNavigate('home')}>
            <Flag className="text-patriotic-green w-8 h-8 group-hover:scale-110 transition-transform" />
            <span className="text-2xl font-black tracking-tighter text-white uppercase italic">JORNAL<span className="text-patriotic-green">PATRIOTA</span></span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-xs font-black transition-all uppercase tracking-[0.2em] flex items-center gap-1.5 py-2 px-1 ${
                  activeTab === item.id ? 'text-patriotic-yellow border-b-2 border-patriotic-yellow' : 'text-zinc-500 hover:text-white'
                }`}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black border-t border-white/5 py-6 px-4 space-y-4 animate-in slide-in-from-top duration-300">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setIsOpen(false);
              }}
              className={`block w-full text-left px-6 py-4 text-sm font-black uppercase tracking-widest rounded-sm flex items-center gap-3 ${
                activeTab === item.id ? 'bg-patriotic-yellow text-black' : 'text-zinc-400 hover:bg-white/5'
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};
