import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Calendar, User, ArrowRight, Tag, BookOpen } from 'lucide-react';
import { blogService, BlogPost } from '../services/blogService';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import Comments from './Comments';
import SEO from './SEO';

interface PostDetailProps {
  post: BlogPost;
  onClose: () => void;
  isAdmin: boolean;
  formatDate: (timestamp: any) => string;
}

function PostDetail({ post, onClose, isAdmin, formatDate }: PostDetailProps) {
  const { t } = useTranslation();
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({ 
    container: scrollRef
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 overflow-hidden"
    >
      <div className="absolute inset-0 bg-dark/95 backdrop-blur-xl" onClick={onClose} />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-4xl max-h-full bg-dark border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)]"
      >
        <div className="sticky top-0 z-10 flex flex-col items-center bg-dark/80 backdrop-blur-md border-b border-white/5">
          <motion.div 
            className="absolute top-0 left-0 right-0 h-1 bg-gold origin-left z-20"
            style={{ scaleX }}
          />
          <div className="w-full flex justify-between items-center p-6">
            <div className="flex items-center space-x-3">
              <div className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span className="text-[10px] font-mono text-gold uppercase tracking-[0.3em] font-bold">Entry_{post.id?.substring(0, 4)}</span>
            </div>
            <button 
              onClick={onClose}
              className="text-white/40 hover:text-white text-[10px] uppercase font-bold tracking-widest font-mono p-2"
            >
              {t('blog.close')}
            </button>
          </div>
        </div>
        
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 md:p-16 custom-scrollbar">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center space-x-4 text-white/30 text-xs font-mono uppercase tracking-[0.2em] mb-8">
              <span className="flex items-center"><Calendar size={14} className="mr-2 text-gold" /> {formatDate(post.createdAt)}</span>
              <span className="flex items-center"><User size={14} className="mr-2 text-gold" /> {post.authorName}</span>
            </div>
            
            <h1 className="font-serif text-4xl md:text-6xl text-[var(--color-text-primary)] mb-8 tracking-tighter leading-[0.9]">
              {post.title}
            </h1>
            
            <div className="aspect-video rounded-3xl overflow-hidden mb-12 border border-white/5">
              <img 
                src={post.imageUrl || `https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800`}
                className="w-full h-full object-cover"
                alt={post.title}
              />
            </div>
            
            <div className="prose prose-invert prose-gold max-w-none">
              <div className="text-[var(--color-text-primary)]/70 leading-relaxed font-light space-y-6 markdown-body">
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>
            </div>
            
            <div className="mt-16 pt-8 border-t border-white/5 flex flex-wrap gap-3">
              {post.tags.map(tag => (
                <span key={tag} className="flex items-center text-[10px] font-mono text-gold/60 uppercase tracking-widest py-1.5 px-4 rounded-full bg-gold/5 border border-gold/10">
                  <Tag size={12} className="mr-2" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Comments System */}
            <Comments postId={post.id!} isAdmin={isAdmin} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

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
    try {
      const date = timestamp.toDate 
        ? timestamp.toDate() 
        : (timestamp.seconds ? new Date(timestamp.seconds * 1000) : new Date(timestamp));
      return format(date, 'MMM dd, yyyy');
    } catch (e) {
      return '...';
    }
  };

  return (
    <div id="blog" className="relative min-h-screen w-full bg-dark flex flex-col justify-center px-6 md:px-12 py-24 md:py-0 overflow-hidden">
      <SEO 
        title="Blog Archive" 
        description="Explore insights on software architecture, technology trends, and modern development patterns by Pedro Martins."
        keywords="Architecture, Technology, Insights, Software Development, System Design, Pedro Martins, Blog, Archive"
      />
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
        <h2 className="font-serif text-5xl md:text-6xl text-[var(--color-text-primary)] tracking-tight leading-none">The Archive</h2>
      </div>

      <div className="max-w-7xl w-full mx-auto relative z-10 mt-12 md:mt-24">
        {loading ? (
          <div className="flex items-center justify-center h-64 text-gold/50 font-mono text-sm animate-pulse">
            {t('blog.initializing')}
          </div>
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 glass-morphism rounded-3xl border border-white/5">
             <BookOpen size={48} className="text-white/10 mb-4" />
             <p className="text-white/30 font-mono text-xs uppercase tracking-widest">{t('blog.empty')}</p>
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
                  <h3 className="font-serif text-2xl text-[var(--color-text-primary)] mb-2 group-hover:text-gold transition-colors line-clamp-2 leading-tight">
                    {post.title}
                  </h3>

                  <div className="flex items-center space-x-4 text-[var(--color-text-secondary)] text-[9px] font-mono uppercase tracking-[0.2em] mb-5">
                    <div className="flex items-center">
                      <Calendar size={12} className="mr-1.5 text-gold/40" />
                      {formatDate(post.createdAt)}
                    </div>
                    <div className="flex items-center border-l border-white/10 pl-4">
                      <User size={12} className="mr-1.5 text-gold/40" />
                      {post.authorName}
                    </div>
                  </div>
                  
                  <p className="text-[var(--color-text-secondary)] text-sm font-light leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-auto flex items-center text-gold text-[10px] uppercase font-bold tracking-widest">
                    <span>{t('blog.readEntry')}</span>
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
          <PostDetail 
            post={selectedPost} 
            onClose={() => setSelectedPost(null)} 
            isAdmin={isAdmin}
            formatDate={formatDate}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
