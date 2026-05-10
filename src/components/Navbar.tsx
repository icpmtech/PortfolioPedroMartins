import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed top-0 left-0 w-full z-50 px-6 py-6 md:px-12 md:py-6 flex justify-between items-start pointer-events-none"
      >
      <div className="flex flex-col space-y-4 pointer-events-auto">
        <div>
          <span className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.5em] font-bold text-white/40">Portfolio Feed // 2026</span>
        </div>
        <button 
          onClick={toggleLanguage}
          className="flex items-center space-x-2 text-[8px] md:text-[9px] uppercase tracking-[0.2em] font-bold text-white/40 hover:text-gold transition-all"
        >
          <Globe size={12} className="md:w-3.5 md:h-3.5" />
          <span>{i18n.language.toUpperCase()}</span>
        </button>
      </div>
      
      <div className="flex flex-col items-end space-y-2 md:space-y-4 pointer-events-auto">
        <a 
          href={amazonUrl} 
          target="_blank" 
          rel="noreferrer"
          className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] font-bold text-gold border-b border-gold/20 pb-0.5 md:pb-1 hover:text-white transition-all"
        >
          {t('footer.amazon').replace('_', ' ')}
        </a>
        <a 
          href="https://cantinhodotnet.com" 
          target="_blank" 
          rel="noreferrer"
          className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] font-bold text-white/40 hover:text-white transition-all"
        >
          Cantinho de .NET
        </a>
      </div>
    </motion.nav>
    </>
  );
}
