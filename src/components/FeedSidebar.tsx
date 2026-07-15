import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Linkedin, Github, MessageCircle, Heart, Share2, Database, Check, User, Youtube, Facebook, Video, Phone, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import CVModal from './CVModal';

import { triggerHaptic } from '../lib/haptics';

export default function FeedSidebar() {
  const { t } = useTranslation();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(4800);
  const [shared, setShared] = useState(false);
  const [isCVOpen, setIsCVOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const actions = [
    { icon: Linkedin, label: t('sidebar.label.connect'), url: 'https://pt.linkedin.com/in/pedromiguelmouraomartins' },
    { icon: Github, label: t('sidebar.label.repo'), url: 'https://github.com/moraomartins' },
    { icon: Database, label: t('sidebar.label.kaggle'), url: 'https://www.kaggle.com/pedromouraomartins' },
    { icon: Youtube, label: t('sidebar.label.videos'), url: 'https://youtube.com/@cantinhodedotnet?si=S1xPa_vduc-4-Xt6' },
    { icon: Facebook, label: t('sidebar.label.social'), url: 'https://www.facebook.com/share/1LdCY6dzfs/' },
    { icon: Video, label: t('sidebar.label.tiktok'), url: 'https://www.tiktok.com/@cantinhodedotnet?_r=1&_t=ZG-96FMgNnz01Q' },
    { icon: Phone, label: t('sidebar.label.whatsapp'), url: 'https://wa.me/351919520386' },
  ];

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerHaptic(liked ? 10 : [15, 30, 15]);
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerHaptic(20);
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Pedro Miguel Mourão Martins | Architect & Mentor',
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      }
    } catch (err) {
      console.error('Sharing failed', err);
    }
  };

  const toggleExpanded = () => {
    triggerHaptic(isExpanded ? 10 : 25);
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className="fixed right-6 md:right-10 bottom-6 md:bottom-10 z-[100] flex flex-col items-center">
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="flex flex-col items-center space-y-4 mb-6"
            >
              <motion.a
                href="https://pt.linkedin.com/in/pedromiguelmouraomartins"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => triggerHaptic(15)}
                className="bg-gold hover:bg-white text-dark px-5 py-2.5 rounded-full flex items-center space-x-2 shadow-[0_10px_30px_rgba(212,175,55,0.4)] transition-all duration-300 group whitespace-nowrap"
              >
                <Linkedin size={14} className="group-hover:scale-110 transition-transform" />
                <span className="text-[10px] md:text-[11px] font-black uppercase tracking-widest">{t('sidebar.follow')}</span>
              </motion.a>

              <div className="flex flex-col items-center space-y-4 p-4 glass-morphism rounded-[2.5rem] border border-gold/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-2xl">
                <motion.button 
                  whileHover={{ scale: 1.1, backgroundColor: 'var(--color-gold)', color: '#000' }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    triggerHaptic(20);
                    setIsCVOpen(true);
                  }}
                  className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold transition-all duration-300"
                >
                  <User className="w-5 h-5" />
                </motion.button>

                {actions.map((action, idx) => (
                  <motion.a
                    key={idx}
                    href={action.url}
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05, type: 'spring', stiffness: 300 }}
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => triggerHaptic(15)}
                    className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[var(--color-text-primary)]/60 hover:text-gold hover:border-gold/40 transition-all duration-300 shadow-sm"
                  >
                    <action.icon className="w-5 h-5" />
                  </motion.a>
                ))}
                
                <div className="h-px w-8 bg-gold/10 my-2" />

                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.7 }}
                  onClick={handleLike}
                  className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${liked ? 'text-red-500 border-red-500/40 bg-red-500/10' : 'text-[var(--color-text-primary)]/40 border-white/10 hover:text-red-500 hover:border-red-500/20'}`}
                >
                  <Heart className="w-5 h-5" fill={liked ? "currentColor" : "none"} />
                </motion.button>

                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.7 }}
                  onClick={handleShare}
                  className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${shared ? 'text-blue-400 border-blue-400/40 bg-blue-400/10' : 'text-[var(--color-text-primary)]/40 border-white/10 hover:text-blue-400 hover:border-blue-400/20'}`}
                >
                  <AnimatePresence mode="wait">
                    {shared ? (
                      <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                        <Check className="w-5 h-5" />
                      </motion.div>
                    ) : (
                      <motion.div key="share" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                        <Share2 className="w-5 h-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trigger Button */}
        <motion.button
          onClick={toggleExpanded}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group focus:outline-none"
        >
          <div className={`w-14 h-14 md:w-18 md:h-18 rounded-full border-2 transition-all duration-500 p-1 bg-[var(--color-bg)] shadow-2xl ${isExpanded ? 'border-gold rotate-45' : 'border-white/10 hover:border-gold/50'}`}>
            <div className="w-full h-full rounded-full overflow-hidden relative">
              <img 
                src="https://m.media-amazon.com/images/S/amzn-author-media-prod/nq4001lv5jqet2jp2i50o2n229._SY600_._SL200_._PQ50_._FMwebp_.jpg" 
                alt="Pedro Martins" 
                className={`w-full h-full object-cover transition-all duration-500 ${isExpanded ? 'scale-110 grayscale-0' : 'grayscale group-hover:grayscale-0'}`}
                referrerPolicy="no-referrer"
              />
              <AnimatePresence>
                {isExpanded && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-gold/10 backdrop-blur-[2px]"
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
          
          <motion.div 
            animate={{ scale: isExpanded ? 0.8 : [1, 1.2, 1] }}
            transition={{ repeat: isExpanded ? 0 : Infinity, duration: 2 }}
            className={`absolute -bottom-1 -right-1 rounded-full p-1 border-2 transition-colors duration-500 ${isExpanded ? 'bg-white text-dark border-gold' : 'bg-gold text-dark border-dark'}`}
          >
            {isExpanded ? <Zap className="w-3 h-3" /> : <Zap className="w-3 h-3" fill="currentColor" />}
          </motion.div>

          {!isExpanded && (
            <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-dark/80 backdrop-blur-md border border-white/10 rounded-lg text-[9px] font-mono text-gold uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {t('common.menu')}
            </span>
          )}
        </motion.button>
      </div>
      <CVModal isOpen={isCVOpen} onClose={() => setIsCVOpen(false)} />
    </>
  );
}
