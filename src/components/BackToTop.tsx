import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useScroll } from 'motion/react';
import { ArrowUp } from 'lucide-react';

interface BackToTopProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export default function BackToTop({ containerRef }: BackToTopProps) {
  const { t } = useTranslation();
  const { scrollY } = useScroll({ container: containerRef as React.RefObject<HTMLElement> });
  const [show, setShow] = useState(false);

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      // Show button after scrolling 200px
      if (latest > 200) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  }, [scrollY]);

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed left-6 md:left-12 bottom-6 md:bottom-12 z-50 w-10 h-10 md:w-12 md:h-12 glass-morphism rounded-full flex items-center justify-center text-gold border border-gold/30 hover:border-gold hover:bg-gold/10 transition-all shadow-2xl focus:outline-none"
          aria-label={t('common.backToTop')}
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
