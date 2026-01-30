
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
    { id: 'portal', label: 'Portal VIP', icon: <ShieldCheck size={14} className="text-yellow-500" /> },
    { id: 'sobre', label: 'Sobre Nós' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <Flag className="text-green-600 w-8 h-8" />
            <span className="text-2xl font-extrabold tracking-tight text-blue-900">DIREITA<span className="text-green-600">2026</span></span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-sm font-semibold transition-colors uppercase tracking-widest flex items-center gap-1 ${
                  activeTab === item.id ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-base font-bold text-gray-700 hover:bg-gray-50 rounded-lg flex items-center gap-2"
            >
              {item.icon} {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};
