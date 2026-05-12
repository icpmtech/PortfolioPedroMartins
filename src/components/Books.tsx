import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { BookOpen, ShoppingBag, ExternalLink, Loader2 } from 'lucide-react';
import SEO from './SEO';
import { bookService, Book } from '../services/bookService';

export default function Books() {
  const { t } = useTranslation();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const amazonUrl = "https://www.amazon.es/stores/Pedro-Martins/author/B0CBCM7259?language=pt&ref=ap_rdr&shoppingPortalEnabled=true";

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await bookService.getAllBooks();
        setBooks(data);
      } catch (error) {
        console.error('Error loading books:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-dark flex flex-col justify-center overflow-hidden px-6 md:px-12 py-24 md:py-0">
      <SEO 
        title="Literary Collection" 
        description="Discover the publications and books by Pedro Martins, specialized in IA, NLP, and Software Architecture."
        keywords="Publications, Books, Authorship, Tech Books, NLP, IA, Copilot, Blazor, Pedro Martins, Kindle, Amazon"
      />
      {/* Absolute Decorative Background */}
      <div className="absolute top-1/2 left-0 w-full h-[600px] -translate-y-1/2 opacity-5 pointer-events-none">
         <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="md:absolute top-12 left-12 flex flex-col mb-8 md:mb-0 z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-3 mb-3"
        >
          <span className="h-0.5 w-6 bg-gold" />
          <span className="text-gold font-mono text-[10px] tracking-[0.4em] uppercase font-bold">{t('books.publications')}</span>
        </motion.div>
        <h2 className="font-serif text-5xl md:text-6xl text-white tracking-tight leading-none">{t('books.library')}</h2>
      </div>

      <div className="flex space-x-6 md:space-x-8 overflow-x-auto no-scrollbar pb-12 md:pb-16 pt-8 md:pt-32 snap-x snap-mandatory relative z-10">
        {loading ? (
          <div className="flex w-full items-center justify-center h-[400px]">
             <Loader2 className="text-gold animate-spin" size={48} />
          </div>
        ) : (
          <>
            {books.map((book, index) => (
              <motion.div
                key={book.id || index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="flex-shrink-0 w-[280px] md:w-[320px] h-[420px] md:h-[500px] relative rounded-[2.5rem] overflow-hidden group border border-white/5 bg-[#080808] snap-center shadow-2xl hover:border-gold/30 transition-all duration-500"
              >
                <div className="absolute inset-0 overflow-hidden">
                  <img 
                    src={book.image} 
                    alt={book.title} 
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-30 group-hover:opacity-60 group-hover:scale-105 transition-all duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />
                </div>
                
                <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end min-h-[250px]">
                  <div className="absolute top-6 right-6 bg-gold text-dark font-black text-[9px] px-2.5 py-1 rounded-full uppercase tracking-widest shadow-[0_0_15px_#D4AF37]">
                    {t('common.kindle')}
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-serif text-3xl text-white mb-2 leading-none group-hover:text-gold transition-colors duration-300">{book.title}</h3>
                      <p className="text-[11px] uppercase font-bold text-[#555] font-mono tracking-[0.1em]">{book.subtitle}</p>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <span className="text-lg font-mono text-gold-muted font-black group-hover:text-gold transition-colors">{book.price}</span>
                      <a 
                        href={book.amazonUrl || amazonUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="w-12 h-12 rounded-full glass-morphism border border-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-dark hover:border-gold transition-all duration-300"
                      >
                        <ShoppingBag size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* View All Card */}
            <motion.a
              href={amazonUrl}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="flex-shrink-0 w-80 h-[500px] flex flex-col items-center justify-center border-2 border-dashed border-gold/10 rounded-[2.5rem] hover:border-gold/30 hover:bg-gold/5 group transition-all duration-500 glass-morphism snap-center"
            >
              <div className="w-20 h-20 rounded-full border border-gold/20 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:border-gold transition-all duration-500">
                <BookOpen size={32} className="text-gold/40 group-hover:text-gold transition-all duration-500" />
              </div>
              <div className="text-center space-y-2">
                <span className="block text-[12px] uppercase tracking-[0.4em] font-black text-white/40 group-hover:text-white transition-all duration-500">{t('books.viewShelf')}</span>
                <span className="block text-[10px] uppercase tracking-[0.2em] text-gold-muted font-bold">{t('books.available', { count: books.length > 0 ? books.length : 36 })}</span>
              </div>
            </motion.a>
          </>
        )}
      </div>


      <div className="absolute top-1/2 right-0 -translate-y-1/2 rotate-90 origin-right hidden xl:block select-none pointer-events-none opacity-5">
        <span className="text-[140px] uppercase font-black tracking-[0.2em] text-white leading-none whitespace-nowrap">{t('common.literary')}</span>
      </div>
    </div>
  );
}
