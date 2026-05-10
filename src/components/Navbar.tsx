import React from 'react';
import { motion } from 'motion/react';

export default function Navbar() {
  const amazonUrl = "https://www.amazon.es/stores/Pedro-Martins/author/B0CBCM7259?language=pt&ref=ap_rdr&shoppingPortalEnabled=true";

  return (
    <motion.nav 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="fixed top-0 left-0 w-full z-50 px-4 py-4 md:px-12 md:py-6 flex justify-between items-start pointer-events-none"
    >
      <div className="pointer-events-auto">
        <span className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.5em] font-bold text-white/40">Portfolio Feed // 2026</span>
      </div>
      
      <div className="flex flex-col items-end space-y-2 md:space-y-4 pointer-events-auto">
        <a 
          href={amazonUrl} 
          target="_blank" 
          rel="noreferrer"
          className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] font-bold text-gold border-b border-gold/20 pb-0.5 md:pb-1 hover:text-white transition-all"
        >
          Amazon Store
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
  );
}
