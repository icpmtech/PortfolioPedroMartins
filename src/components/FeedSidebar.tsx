import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Linkedin, Github, MessageCircle, Heart, Share2, Database, Check, User, Youtube, Facebook, Video, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import CVModal from './CVModal';

export default function FeedSidebar() {
  const { t } = useTranslation();
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(4800);
  const [shared, setShared] = useState(false);
  const [isCVOpen, setIsCVOpen] = useState(false);

  const actions = [
    { icon: Linkedin, label: t('sidebar.label.connect'), url: 'https://pt.linkedin.com/in/pedromiguelmouraomartins' },
    { icon: Github, label: t('sidebar.label.repo'), url: 'https://github.com/moraomartins' },
    { icon: Database, label: t('sidebar.label.kaggle'), url: 'https://www.kaggle.com/pedromouraomartins' },
    { icon: Youtube, label: t('sidebar.label.videos'), url: 'https://youtube.com/@cantinhodedotnet?si=S1xPa_vduc-4-Xt6' },
    { icon: Facebook, label: t('sidebar.label.social'), url: 'https://www.facebook.com/share/1LdCY6dzfs/' },
    { icon: Video, label: t('sidebar.label.tiktok'), url: 'https://www.tiktok.com/@cantinhodedotnet?_r=1&_t=ZG-96FMgNnz01Q' },
    { icon: Phone, label: t('sidebar.label.whatsapp'), url: 'https://wa.me/351919520386' },
  ];

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  const handleShare = async () => {
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

  return (
    <>
      <div className="fixed right-2 md:right-4 bottom-16 md:bottom-24 z-50 flex flex-col items-center space-y-3 md:space-y-6">
      <div className="relative scale-90 md:scale-100">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-gold p-0.5 overflow-hidden">
          <img 
            src="https://m.media-amazon.com/images/S/amzn-author-media-prod/nq4001lv5jqet2jp2i50o2n229._SY600_._SL200_._PQ50_._FMwebp_.jpg" 
            alt="Pedro Martins" 
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="absolute -bottom-1 md:-bottom-2 left-1/2 -translate-x-1/2 bg-gold text-[#0A0A0A] rounded-full p-0.5 md:p-1 border border-[#0A0A0A]">
          <MessageCircle size={8} md:size={10} fill="currentColor" />
        </div>
      </div>

      <div className="flex flex-col items-center space-y-2 md:space-y-4">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsCVOpen(true)}
          className="flex flex-col items-center group focus:outline-none"
        >
          <div className="w-9 h-9 md:w-12 md:h-12 rounded-full glass-morphism border-2 border-gold/40 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-all">
            <User size={14} md:size={20} />
          </div>
          <span className="text-[7px] md:text-[8px] uppercase tracking-tighter font-bold text-gold mt-1 hidden sm:block">{t('common.profile')}</span>
        </motion.button>

        {actions.map((action, idx) => (
          <motion.a
            key={idx}
            href={action.url}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex flex-col items-center group"
          >
            <div className="w-9 h-9 md:w-12 md:h-12 rounded-full glass-morphism flex items-center justify-center text-white/80 group-hover:text-gold transition-colors">
              <action.icon size={14} md:size={20} />
            </div>
            <span className="text-[7px] md:text-[8px] uppercase tracking-tighter font-bold opacity-60 mt-1 hidden sm:block">{action.label}</span>
          </motion.a>
        ))}
        
        <motion.button 
          whileTap={{ scale: 0.8 }}
          onClick={handleLike}
          className="flex flex-col items-center group focus:outline-none"
        >
          <div className={`w-9 h-9 md:w-12 md:h-12 rounded-full glass-morphism flex items-center justify-center transition-all duration-300 ${liked ? 'text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]' : 'text-white/80 group-hover:text-red-500'}`}>
            <Heart size={14} md:size={20} fill={liked ? "currentColor" : "none"} />
          </div>
          <motion.span 
            key={likeCount}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[7px] md:text-[8px] uppercase tracking-tighter font-bold opacity-60 mt-1 hidden sm:block"
          >
            {(likeCount / 1000).toFixed(1)}k
          </motion.span>
        </motion.button>

        <motion.button 
          whileTap={{ scale: 0.8 }}
          onClick={handleShare}
          className="flex flex-col items-center group focus:outline-none relative"
        >
          <div className={`w-9 h-9 md:w-12 md:h-12 rounded-full glass-morphism flex items-center justify-center transition-all duration-300 ${shared ? 'text-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.4)]' : 'text-white/80 group-hover:text-blue-400'}`}>
            <AnimatePresence mode="wait">
              {shared ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  <Check size={14} md:size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="share"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  <Share2 size={14} md:size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <span className="text-[7px] md:text-[8px] uppercase tracking-tighter font-bold opacity-60 mt-1 hidden sm:block">
            {shared ? t('common.copied') : t('common.share')}
          </span>
        </motion.button>
      </div>
      </div>
      <CVModal isOpen={isCVOpen} onClose={() => setIsCVOpen(false)} />
    </>
  );
}
