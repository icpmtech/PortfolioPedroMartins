import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, User, ArrowRight, Tag, BookOpen } from 'lucide-react';
import { blogService, BlogPost } from '../services/blogService';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import Comments from './Comments';

export default function Blog() {
  const { t } = useTranslation();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const [data, adminStatus] = await Promise.all([
        blogService.getAllPosts(),
        blogService.checkIsAdmin()
      ]);
      setPosts(data);
      setIsAdmin(adminStatus);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '...';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return format(date, 'MMM dd, yyyy');
  };

  return (
    <div id="blog" className="relative min-h-screen w-full bg-dark flex flex-col justify-center px-6 md:px-12 py-24 md:py-0 overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-full h-full opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      <div className="md:absolute top-12 left-12 flex flex-col mb-12 md:mb-0 z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-3 mb-3"
        >
          <span className="h-px w-8 bg-gold" />
          <span className="text-gold font-mono text-[10px] tracking-[0.4em] uppercase font-bold">Insights // Blog</span>
        </motion.div>
        <h2 className="font-serif text-5xl md:text-6xl text-white tracking-tight leading-none">The Archive</h2>
      </div>

      <div className="max-w-7xl w-full mx-auto relative z-10 mt-12 md:mt-24">
        {loading ? (
          <div className="flex items-center justify-center h-64 text-gold/50 font-mono text-sm animate-pulse">
            INITIALIZING_FEED...
          </div>
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 glass-morphism rounded-3xl border border-white/5">
             <BookOpen size={48} className="text-white/10 mb-4" />
             <p className="text-white/30 font-mono text-xs uppercase tracking-widest">No entries found in the archive yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedPost(post)}
                className="group cursor-pointer glass-morphism rounded-[2rem] border border-white/5 overflow-hidden flex flex-col h-full hover:border-gold/30 transition-all duration-500 shadow-2xl"
              >
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={post.imageUrl || `https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800`} 
                    alt={post.title}
                    className="w-full h-full object-cover grayscale opacity-40 group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent" />
                  <div className="absolute bottom-4 left-6 flex space-x-2">
                    {post.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-[8px] font-mono font-bold uppercase tracking-widest px-2 py-1 bg-gold/10 text-gold border border-gold/20 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center space-x-4 text-white/30 text-[9px] font-mono uppercase tracking-[0.2em] mb-4">
                    <div className="flex items-center">
                      <Calendar size={12} className="mr-1 text-gold/40" />
                      {formatDate(post.createdAt)}
                    </div>
                    <div className="flex items-center">
                      <User size={12} className="mr-1 text-gold/40" />
                      {post.authorName}
                    </div>
                  </div>
                  
                  <h3 className="font-serif text-2xl text-white mb-4 group-hover:text-gold transition-colors line-clamp-2 leading-tight">
                    {post.title}
                  </h3>
                  
                  <p className="text-white/40 text-sm font-light leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-auto flex items-center text-gold text-[10px] uppercase font-bold tracking-widest">
                    <span>Read Entry</span>
                    <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedPost && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 overflow-hidden"
          >
            <div className="absolute inset-0 bg-dark/95 backdrop-blur-xl" onClick={() => setSelectedPost(null)} />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl max-h-full bg-dark border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
              <div className="sticky top-0 z-10 flex justify-between items-center p-6 bg-dark/80 backdrop-blur-md border-b border-white/5">
                <div className="flex items-center space-x-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                  <span className="text-[10px] font-mono text-gold uppercase tracking-[0.3em] font-bold">Entry_{selectedPost.id?.substring(0, 4)}</span>
                </div>
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="text-white/40 hover:text-white text-[10px] uppercase font-bold tracking-widest font-mono p-2"
                >
                  [Esc]_Close
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-8 md:p-16 custom-scrollbar">
                <div className="max-w-2xl mx-auto">
                  <div className="flex items-center space-x-4 text-white/30 text-xs font-mono uppercase tracking-[0.2em] mb-8">
                    <span className="flex items-center"><Calendar size={14} className="mr-2 text-gold" /> {formatDate(selectedPost.createdAt)}</span>
                    <span className="flex items-center"><User size={14} className="mr-2 text-gold" /> {selectedPost.authorName}</span>
                  </div>
                  
                  <h1 className="font-serif text-4xl md:text-6xl text-white mb-8 tracking-tighter leading-[0.9]">
                    {selectedPost.title}
                  </h1>
                  
                  <div className="aspect-video rounded-3xl overflow-hidden mb-12 border border-white/5">
                    <img 
                      src={selectedPost.imageUrl || `https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="prose prose-invert prose-gold max-w-none">
                    <div className="text-white/70 leading-relaxed font-light space-y-6 markdown-body">
                      <ReactMarkdown>{selectedPost.content}</ReactMarkdown>
                    </div>
                  </div>
                  
                  <div className="mt-16 pt-8 border-t border-white/5 flex flex-wrap gap-3">
                    {selectedPost.tags.map(tag => (
                      <span key={tag} className="flex items-center text-[10px] font-mono text-gold/60 uppercase tracking-widest py-1.5 px-4 rounded-full bg-gold/5 border border-gold/10">
                        <Tag size={12} className="mr-2" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Comments System */}
                  <Comments postId={selectedPost.id!} isAdmin={isAdmin} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
