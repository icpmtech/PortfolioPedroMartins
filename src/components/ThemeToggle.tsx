import React from 'react';
import { Sun, Moon, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'motion/react';

import { triggerHaptic } from '../lib/haptics';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const handleToggle = () => {
    triggerHaptic(15);
    toggleTheme();
  };

  return (
    <button
      onClick={handleToggle}
      className="relative p-2.5 rounded-2xl bg-white/5 border border-white/10 hover:border-gold/50 hover:bg-gold/5 transition-all group flex items-center justify-center"
      title="Switch Theme"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {theme === 'dark' && (
            <motion.div
              key="dark"
              initial={{ scale: 0, rotate: -90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0, rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Moon size={18} className="text-gold" />
            </motion.div>
          )}
          {theme === 'light' && (
            <motion.div
              key="light"
              initial={{ scale: 0, rotate: -90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0, rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sun size={18} className="text-gold" />
            </motion.div>
          )}
          {theme === 'cobalt' && (
            <motion.div
              key="cobalt"
              initial={{ scale: 0, rotate: -90, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0, rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Zap size={18} className="text-gold" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-dark border border-white/10 rounded text-[9px] font-mono text-gold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap uppercase tracking-widest">
        {theme} mode
      </span>
    </button>
  );
};
