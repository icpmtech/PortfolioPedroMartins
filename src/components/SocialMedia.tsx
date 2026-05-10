import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Youtube, Facebook, Video, Play, ExternalLink, Share2, Check } from 'lucide-react';

const SOCIAL_FEEDS = [
  {
    platform: "YouTube",
    title: "Technical Architect Series",
    stats: "15.4k views",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    icon: Youtube,
    color: "bg-red-600/20 text-red-500",
    url: "https://youtube.com/@cantinhodedotnet?si=S1xPa_vduc-4-Xt6"
  },
  {
    platform: "TikTok",
    title: "Micro-Architectural Tips",
    stats: "2.1k likes",
    thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    icon: Video,
    color: "bg-cyan-500/20 text-cyan-400",
    url: "https://www.tiktok.com/@cantinhodedotnet?_r=1&_t=ZG-96FMgNnz01Q"
  },
  {
    platform: "Facebook",
    title: "Community Insights",
    stats: "890 shares",
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
    icon: Facebook,
    color: "bg-blue-600/20 text-blue-500",
    url: "https://www.facebook.com/share/1LdCY6dzfs/"
  }
];

export default function SocialMedia() {
  const [sharedIndex, setSharedIndex] = useState<number | null>(null);

  const handleShare = async (title: string, url: string, index: number) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Check out ${title} by Pedro Mourão Martins`,
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
    <div className="relative min-h-screen w-full bg-[#050505] flex flex-col justify-center px-6 md:px-12 py-24 md:py-0">
      <div className="md:absolute top-12 left-12 flex flex-col mb-10 md:mb-0">
        <span className="text-gold font-mono text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] uppercase font-bold mb-2">Media Channels</span>
        <h2 className="font-serif text-4xl text-white tracking-tight">Social Presence</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl w-full mx-auto">
        {SOCIAL_FEEDS.map((feed, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="group relative flex flex-col glass-morphism border border-white/5 rounded-3xl overflow-hidden aspect-[9/16] md:aspect-auto md:h-[500px]"
          >
            {/* Background Thumbnail */}
            <div className="absolute inset-0 overflow-hidden">
              <img 
                src={feed.thumbnail} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-60"
                alt={feed.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            </div>

            {/* Content Overlays */}
            <div className="relative h-full flex flex-col justify-between p-6">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-xl border border-white/10 ${feed.color}`}>
                  <feed.icon size={20} />
                </div>
                <div className="bg-black/40 backdrop-blur px-3 py-1 rounded-full border border-white/5 flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[10px] font-mono text-white/60">LIVE FEED</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-bold text-gold tracking-widest">{feed.platform}</p>
                  <h3 className="text-xl md:text-2xl font-serif text-white">{feed.title}</h3>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-widest text-white/40 font-bold">Engagement</span>
                    <span className="text-sm font-mono text-white/80">{feed.stats}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <motion.button
                      onClick={() => handleShare(feed.title, feed.url, index)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-12 h-12 rounded-full glass-morphism border border-white/10 flex items-center justify-center text-white/80 hover:text-gold transition-colors focus:outline-none"
                    >
                      <AnimatePresence mode="wait">
                        {sharedIndex === index ? (
                          <motion.div
                            key="check"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                          >
                            <Check size={18} />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="share"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                          >
                            <Share2 size={18} />
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
                      className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center shadow-xl group-hover:bg-gold transition-colors"
                    >
                      <Play size={20} fill="currentColor" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>

            {/* Platform Tag */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none">
               <feed.icon size={200} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
