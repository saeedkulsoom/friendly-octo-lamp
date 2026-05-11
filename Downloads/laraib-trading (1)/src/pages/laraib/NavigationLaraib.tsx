import React from 'react';
import { motion } from 'motion/react';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { LaraibPage } from '../../types';
import { cn } from '../../lib/utils';

export const LaraibNavbar = ({ currentPage, setPage }: { currentPage: LaraibPage, setPage: (p: LaraibPage) => void }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems: { id: LaraibPage, label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'Owner Profile' },
    { id: 'services', label: 'Services' },
    { id: 'qc', label: 'QC Services' },
    { id: 'catalog', label: 'Catalog' },
    { id: 'palette', label: 'Color Palette' },
    { id: 'contact', label: 'Inquiry' },
  ];

  return (
    <nav className="glass-effect sticky top-0 z-[100] h-20 px-8 flex items-center justify-between">
      <div className="flex items-center gap-12">
        <div 
          onClick={() => setPage('home')} 
          className="text-2xl font-display font-bold text-navy cursor-pointer flex items-center gap-2"
        >
          LARAIB <span className="font-light text-text-dim">TRADING</span>
        </div>
        
        <div className="hidden lg:flex items-center gap-8 text-navy">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={cn(
                "text-sm font-bold uppercase tracking-widest transition-all hover:text-gold",
                currentPage === item.id ? "text-gold" : "text-navy/60"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden xl:flex items-center gap-2 text-navy/40 font-mono text-xs">
          <Phone size={14} /> 03453253471
        </div>
        <button 
          onClick={() => setPage('contact')}
          className="hidden md:block bg-navy text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-navy/90"
        >
          Request Quote
        </button>
        <button className="lg:hidden text-navy" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-20 left-0 w-full bg-white border-b border-line p-8 flex flex-col gap-6 lg:hidden shadow-xl"
        >
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setPage(item.id); setIsOpen(false); }}
              className={cn(
                "text-left text-lg font-bold uppercase tracking-widest transition-all",
                currentPage === item.id ? "text-gold" : "text-navy"
              )}
            >
              {item.label}
            </button>
          ))}
          <button 
            onClick={() => { setPage('contact'); setIsOpen(false); }}
            className="bg-navy text-white w-full py-4 rounded-xl font-bold uppercase tracking-widest"
          >
            Request Quote
          </button>
        </motion.div>
      )}
    </nav>
  );
};

export const LaraibFooter = () => (
  <footer className="bg-navy text-white py-16 px-8 lg:px-24 border-t border-white/10 font-body">
    <div className="grid md:grid-cols-4 gap-12 text-left">
      <div className="space-y-8">
        <div className="text-3xl font-display font-bold text-white">LARAIB <span className="text-gold">TRADING</span></div>
        <p className="text-white/60 text-base leading-relaxed italic border-l-2 border-gold pl-4">
          "18+ Years of Excellence | 100+ Global Partners. Connecting Pakistan to the World."
        </p>
      </div>
      <div className="space-y-8">
        <h4 className="font-bold uppercase tracking-[0.2em] text-gold text-sm border-b border-white/10 pb-2">Trading Links</h4>
        <div className="flex flex-col gap-4 text-white hover:text-gold transition-colors font-medium">
           <span className="cursor-pointer">Africa Logistics</span>
           <span className="cursor-pointer">China Import & Export</span>
           <span className="cursor-pointer">Canada Distribution</span>
        </div>
      </div>
      <div className="space-y-8">
        <h4 className="font-bold uppercase tracking-[0.2em] text-gold text-sm border-b border-white/10 pb-2">Products</h4>
        <div className="flex flex-col gap-4 text-white hover:text-gold transition-colors font-medium">
           <span className="cursor-pointer">Garments Supply</span>
           <span className="cursor-pointer">Industrial Trimmings</span>
           <span className="cursor-pointer">Sewing Machine Spares</span>
        </div>
      </div>
      <div className="space-y-8">
        <h4 className="font-bold uppercase tracking-[0.2em] text-gold text-sm border-b border-white/10 pb-2">Reach Us</h4>
        <div className="flex flex-col gap-6">
           <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
              <Phone className="text-gold" size={20} />
              <div className="font-mono font-bold text-lg">03453253471</div>
           </div>
           <div className="flex items-center gap-4 text-white font-medium hover:text-gold transition-colors">
              <Mail className="text-gold" size={20} />
              <span>laraibtrading188@gmail.com</span>
           </div>
           <div className="pt-4 mt-2 border-t border-white/10">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-gold/80">Office hours: Mon-Sat 9AM-7PM</span>
           </div>
        </div>
      </div>
    </div>
    <div className="mt-20 pt-10 border-t border-white/10 text-center">
      <div className="text-[11px] uppercase tracking-[0.4em] font-bold text-gold/60">
        &copy; 2026 LARAIB TRADING | MUHAMMAD ANWAR SAEED | ALL RIGHTS RESERVED
      </div>
    </div>
  </footer>
);
