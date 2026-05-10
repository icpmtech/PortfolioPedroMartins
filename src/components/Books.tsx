import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { BookOpen, ShoppingBag, ExternalLink } from 'lucide-react';

const BOOKS = [
  {
    title: "Ontologias em AI",
    subtitle: "Da Teoria à Prática",
    year: "2024",
    price: "€6.42",
    image: "https://m.media-amazon.com/images/I/715FlDHYuhL._UF1000,1000_QL80_FMwebp_.jpg",
  },
  {
    title: "Blazor Web Apps",
    subtitle: "Practical Guide & Advanced Patterns",
    year: "2024",
    price: "€8.48",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Arquitecto de Sistemas",
    subtitle: "O que é a vida de um arquitecto?",
    year: "2023",
    price: "€0.92",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Revolução do Copiloto",
    subtitle: "IA Generativa no Trabalho",
    year: "2024",
    price: "€9.99",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4628c6bb3?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "NLP para Todos",
    subtitle: "Da Teoria aos Modelos GPT",
    year: "2024",
    price: "€19.22",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "The Power of JavaScript",
    subtitle: "Concepts, Code, and Best Practices",
    year: "2023",
    price: "€27.33",
    image: "https://images.unsplash.com/photo-1579403124614-197f69d8187b?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Mastering Scrapy",
    subtitle: "Web Scraping Expert Class",
    year: "2024",
    price: "€12.50",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=800",
  },
];

export default function Books() {
  const { t } = useTranslation();
  const amazonUrl = "https://www.amazon.es/stores/Pedro-Martins/author/B0CBCM7259?language=pt&ref=ap_rdr&shoppingPortalEnabled=true";

  return (
    <div className="relative min-h-screen w-full bg-dark flex flex-col justify-center overflow-hidden px-6 md:px-12 py-24 md:py-0">
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
        {BOOKS.map((book, index) => (
          <motion.div
            key={index}
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
                    href={amazonUrl}
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
            <span className="block text-[10px] uppercase tracking-[0.2em] text-gold-muted font-bold">{t('books.available', { count: 36 })}</span>
          </div>
        </motion.a>
      </div>

      <div className="absolute top-1/2 right-0 -translate-y-1/2 rotate-90 origin-right hidden xl:block select-none pointer-events-none opacity-5">
        <span className="text-[140px] uppercase font-black tracking-[0.2em] text-white leading-none whitespace-nowrap">{t('common.literary')}</span>
      </div>
    </div>
  );
}
