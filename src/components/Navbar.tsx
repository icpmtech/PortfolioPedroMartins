import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

import { triggerHaptic } from '../lib/haptics';

export default function Navbar() {
  const { i18n, t } = useTranslation();
  const amazonUrl = "https://www.amazon.es/stores/Pedro-Martins/author/B0CBCM7259?language=pt&ref=ap_rdr&shoppingPortalEnabled=true";
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const toggleLanguage = () => {
    triggerHaptic(15);
    const newLang = i18n.language === 'en' ? 'pt' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gold origin-left z-[60]"
        style={{ scaleX }}
      />
      
      <motion.nav 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-sm glass-morphism rounded-full border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)] p-1.5 flex items-center justify-around md:hidden backdrop-blur-3xl"
      >
        <button 
          onClick={toggleLanguage}
          className="flex flex-col items-center p-3 text-[8px] uppercase tracking-[0.2em] font-bold text-[var(--color-text-primary)]/70 hover:text-gold transition-all"
        >
          <Globe size={16} className="mb-1 opacity-80" />
          {i18n.language.toUpperCase()}
        </button>

        <div className="h-6 w-px bg-white/10" />

        <ThemeToggle />

        <div className="h-6 w-px bg-white/10" />

        <a 
          href={amazonUrl} 
          target="_blank" 
          rel="noreferrer"
          className="flex flex-col items-center p-3 text-[8px] uppercase tracking-[0.2em] font-black text-gold hover:text-[var(--color-text-primary)] transition-all"
          onClick={() => triggerHaptic(15)}
        >
          <span className="mb-1 opacity-90">BOOKS</span>
        </a>
      </motion.nav>

      {/* Desktop Top Nav */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="fixed top-0 left-0 w-full z-50 px-16 py-10 hidden md:flex justify-between items-start pointer-events-none"
      >
        <div className="flex flex-col space-y-8 pointer-events-auto">
          <div className="group cursor-default">
            <span className="text-[11px] uppercase tracking-[0.8em] font-bold text-[var(--color-text-secondary)] group-hover:text-gold transition-colors duration-500">{t('navbar.feedSubtitle')}</span>
            <div className="h-px w-8 bg-gold/20 mt-2" />
          </div>
          <button 
            onClick={toggleLanguage}
            className="flex items-center space-x-3 text-[11px] uppercase tracking-[0.3em] font-bold text-[var(--color-text-primary)]/40 hover:text-gold transition-all group"
          >
            <div className="p-1 rounded-full border border-white/5 group-hover:border-gold/30 group-hover:bg-gold/5 transition-all">
              <Globe size={14} />
            </div>
            <span>{i18n.language.toUpperCase()}</span>
          </button>
          <ThemeToggle />
        </div>
        
        <div className="flex flex-col items-end space-y-6 pointer-events-auto">
          <a 
            href={amazonUrl} 
            target="_blank" 
            rel="noreferrer"
            className="group flex flex-col items-end"
            onClick={() => triggerHaptic(15)}
          >
            <span className="text-[11px] uppercase tracking-[0.3em] font-black text-gold group-hover:text-[var(--color-text-primary)] transition-all">
              {t('footer.amazon').replace('_', ' ')}
            </span>
            <div className="h-px w-0 group-hover:w-full bg-gold transition-all duration-500 mt-1" />
          </a>
          <a 
            href="https://cantinhodotnet.com" 
            target="_blank" 
            rel="noreferrer"
            className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-bold text-[var(--color-text-primary)]/30 hover:text-[var(--color-text-primary)] transition-all hover:tracking-[0.4em] duration-500"
          >
            Cantinho de .NET
          </a>
          <a 
            href="#blog" 
            className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-bold text-gold/60 hover:text-gold transition-all hover:tracking-[0.4em] duration-500"
          >
            {t('navbar.blog')}
          </a>
        </div>
      </motion.nav>
    </>
  );
}
