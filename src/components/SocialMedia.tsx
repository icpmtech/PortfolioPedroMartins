import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Youtube, Facebook, Video, Play, ExternalLink, Share2, Check, BookOpen } from 'lucide-react';

export default function SocialMedia() {
  const { t } = useTranslation();
  const [sharedIndex, setSharedIndex] = useState<number | null>(null);

  const SOCIAL_FEEDS = [
    {
      platform: t('media.platforms.youtube'),
      title: t('media.feeds.youtube'),
      stats: "15.4k views",
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
      icon: Youtube,
      color: "bg-red-600/20 text-red-500",
      url: "https://youtube.com/@cantinhodedotnet?si=S1xPa_vduc-4-Xt6"
    },
    {
      platform: t('media.platforms.tiktok'),
      title: t('media.feeds.tiktok'),
      stats: "2.1k likes",
      thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
      icon: Video,
      color: "bg-cyan-500/20 text-cyan-400",
      url: "https://www.tiktok.com/@cantinhodedotnet?_r=1&_t=ZG-96FMgNnz01Q"
    },
    {
      platform: t('media.platforms.facebook'),
      title: t('media.feeds.facebook'),
      stats: "890 shares",
      thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
      icon: Facebook,
      color: "bg-blue-600/20 text-blue-500",
      url: "https://www.facebook.com/share/1LdCY6dzfs/"
    },
    {
      platform: t('media.platforms.reading'),
      title: t('media.feeds.reading'),
      stats: "400+ Articles",
      thumbnail: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&q=80&w=800",
      icon: BookOpen,
      color: "bg-gold/20 text-gold",
      url: "https://cantinhodotnet.com"
    }
  ];

  const handleShare = async (title: string, url: string, index: number) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: t('media.shareTitle', { title }),
          url,
        });
        setSharedIndex(index);
        setTimeout(() => setSharedIndex(null), 2000);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setSharedIndex(index);
        setTimeout(() => setSharedIndex(null), 2000);
      } catch (err) {
        console.error('Clipboard error:', err);
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[var(--color-dark)] flex flex-col justify-center px-6 md:px-12 py-24 md:py-0 overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-full h-full opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.1)_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      <div className="md:absolute top-12 left-12 flex flex-col mb-12 md:mb-0 z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-3 mb-3"
        >
          <span className="h-px w-8 bg-gold" />
          <span className="text-gold font-mono text-[10px] tracking-[0.4em] uppercase font-bold">{t('media.channels')}</span>
        </motion.div>
        <h2 className="font-serif text-5xl md:text-6xl text-[var(--color-text-primary)] tracking-tight leading-none">{t('media.presence')}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4 mt-0 md:mt-24 max-w-7xl w-full mx-auto relative z-10">
        {SOCIAL_FEEDS.map((feed, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="group relative h-[450px] md:h-[520px] flex flex-col glass-morphism border border-white/5 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:border-gold/30 shadow-2xl"
          >
            {/* Background Thumbnail */}
              <div className="absolute inset-0 overflow-hidden">
                <img 
                  src={feed.thumbnail} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-30 group-hover:opacity-50 grayscale group-hover:grayscale-0"
                  alt={feed.title}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark)] via-[var(--color-dark)]/60 to-transparent" />
              </div>

              {/* Content Overlays */}
              <div className="relative h-full flex flex-col justify-between p-8">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-2xl border border-white/10 ${feed.color} shadow-lg backdrop-blur-md`}>
                    <feed.icon size={24} />
                  </div>
                  <div className="bg-[var(--color-card-bg)] backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                    <span className="text-[9px] font-mono font-bold text-[var(--color-text-primary)]/80 tracking-widest uppercase">{t('common.liveFeed')}</span>
                  </div>
                </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <p className="text-[10px] uppercase font-bold text-gold tracking-[0.3em] font-mono">{feed.platform}</p>
                  <h3 className="text-3xl md:text-3xl font-serif text-[var(--color-text-primary)] group-hover:text-gold transition-colors duration-300 leading-tight">{feed.title}</h3>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-[var(--color-text-secondary)] font-bold font-mono">{t('common.engagement')}</span>
                    <span className="text-base font-mono text-gold-muted font-bold group-hover:text-gold transition-colors">{feed.stats}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <motion.button
                      onClick={() => handleShare(feed.title, feed.url, index)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-12 h-12 rounded-full glass-morphism border border-white/10 flex items-center justify-center text-[var(--color-text-primary)]/60 hover:text-gold hover:border-gold/40 transition-all duration-300 focus:outline-none"
                    >
                      <AnimatePresence mode="wait">
                        {sharedIndex === index ? (
                          <motion.div key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                            <Check size={20} />
                          </motion.div>
                        ) : (
                          <motion.div key="share" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                            <Share2 size={20} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                    <motion.a
                      href={feed.url}
                      target="_blank"
                      rel="noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-12 h-12 rounded-full bg-white text-dark flex items-center justify-center shadow-xl group-hover:bg-gold transition-all duration-300"
                    >
                      <Play size={22} fill="currentColor" className="ml-1" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>

            {/* Platform Accent - Design element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-[0.03] transition-opacity pointer-events-none duration-1000">
               <feed.icon size={300} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
