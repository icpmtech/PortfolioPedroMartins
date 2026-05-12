import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Linkedin, Github, MessageCircle, Heart, Share2, Database, Check, User, Youtube, Facebook, Video, Phone, Zap } from 'lucide-react';
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
      <div className="fixed right-2 md:right-8 bottom-20 md:bottom-32 z-50 flex flex-col items-center space-y-3 md:space-y-8">
        {/* Follow Me Button */}
        <motion.a
          href="https://pt.linkedin.com/in/pedromiguelmouraomartins"
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gold hover:bg-white text-dark px-4 py-2 rounded-full flex items-center space-x-2 shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 group"
        >
          <Linkedin size={14} className="group-hover:scale-110 transition-transform" />
          <span className="text-[10px] md:text-[11px] font-black uppercase tracking-widest">{t('sidebar.follow')}</span>
        </motion.a>

        {/* Creator Identity */}
        <div className="relative group cursor-pointer" onClick={() => setIsCVOpen(true)}>
          <div className="w-11 h-11 md:w-16 md:h-16 rounded-full border-2 border-gold p-0.5 md:p-1 bg-dark overflow-hidden group-hover:scale-110 transition-transform duration-500">
            <img 
              src="https://m.media-amazon.com/images/S/amzn-author-media-prod/nq4001lv5jqet2jp2i50o2n229._SY600_._SL200_._PQ50_._FMwebp_.jpg" 
              alt="Pedro Martins" 
              className="w-full h-full object-cover rounded-full grayscale group-hover:grayscale-0 transition-all duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -bottom-1 right-0 bg-gold text-dark rounded-full p-0.5 md:p-1 border-2 border-dark"
          >
            <Zap className="w-2 h-2 md:w-2.5 md:h-2.5" fill="currentColor" />
          </motion.div>
        </div>

        <div className="flex flex-col items-center space-y-3 md:space-y-6">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsCVOpen(true)}
            className="flex flex-col items-center group relative"
          >
            <div className="w-10 h-10 md:w-14 md:h-14 rounded-full glass-morphism flex items-center justify-center text-gold border border-gold/20 group-hover:bg-gold group-hover:text-dark transition-all duration-300">
              <User className="w-[18px] h-[18px] md:w-6 md:h-6" />
            </div>
            <span className="absolute left-full ml-4 px-3 py-1 bg-gold text-dark text-[10px] uppercase font-bold tracking-widest rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap hidden lg:block">
              {t('common.profile')}
            </span>
          </motion.button>

          {actions.map((action, idx) => (
            <motion.a
              key={idx}
              href={action.url}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center group relative"
            >
              <div className="w-9 h-9 md:w-14 md:h-14 rounded-full glass-morphism flex items-center justify-center text-white/40 group-hover:text-gold group-hover:border-gold/40 transition-all duration-300">
                <action.icon className="w-4 h-4 md:w-6 md:h-6" />
              </div>
              <span className="absolute left-full ml-4 px-3 py-1 bg-[#111] text-white/60 text-[10px] uppercase font-bold tracking-widest rounded-md opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap border border-white/10 hidden lg:block">
                {action.label}
              </span>
            </motion.a>
          ))}
          
          {/* Reaction Actions */}
          <div className="h-px w-4 md:w-6 bg-white/10 my-1 md:my-2" />

          <motion.button 
            whileTap={{ scale: 0.7 }}
            onClick={handleLike}
            className="flex flex-col items-center group focus:outline-none"
          >
            <div className={`w-9 h-9 md:w-14 md:h-14 rounded-full glass-morphism flex items-center justify-center transition-all duration-300 ${liked ? 'text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)] border-red-500/40' : 'text-white/40 group-hover:text-red-500'}`}>
              <Heart className="w-4 h-4 md:w-6 md:h-6" fill={liked ? "currentColor" : "none"} />
            </div>
            <span className="text-[8px] md:text-[10px] font-mono font-bold mt-1 text-white/30 group-hover:text-white/80 transition-colors">
              {(likeCount / 1000).toFixed(1)}k
            </span>
          </motion.button>

          <motion.button 
            whileTap={{ scale: 0.7 }}
            onClick={handleShare}
            className="flex flex-col items-center group focus:outline-none"
          >
            <div className={`w-9 h-9 md:w-14 md:h-14 rounded-full glass-morphism flex items-center justify-center transition-all duration-300 ${shared ? 'text-blue-400 shadow-[0_0_20px_rgba(96,165,250,0.4)] border-blue-400/40' : 'text-white/40 group-hover:text-blue-400'}`}>
              <AnimatePresence mode="wait">
                {shared ? (
                  <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <Check className="w-4 h-4 md:w-6 md:h-6" />
                  </motion.div>
                ) : (
                  <motion.div key="share" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <Share2 className="w-4 h-4 md:w-6 md:h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <span className="text-[8px] md:text-[10px] font-mono font-bold mt-1 text-white/30 group-hover:text-white/80 transition-colors uppercase tracking-tighter">
              {shared ? t('common.copied') : t('common.share')}
            </span>
          </motion.button>
        </div>
      </div>
      <CVModal isOpen={isCVOpen} onClose={() => setIsCVOpen(false)} />
    </>
  );
}
