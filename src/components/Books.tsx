import React from 'react';
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
  const amazonUrl = "https://www.amazon.es/stores/Pedro-Martins/author/B0CBCM7259?language=pt&ref=ap_rdr&shoppingPortalEnabled=true";

  return (
    <div className="relative h-screen w-full bg-[#0D0D0D] flex flex-col justify-center overflow-hidden px-6 md:px-12 py-20 md:py-0">
      <div className="md:absolute top-12 left-12 flex flex-col mb-4 md:mb-0">
        <span className="text-gold font-mono text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] uppercase font-bold mb-2">Technical Publications</span>
        <h2 className="font-serif text-3xl md:text-4xl text-white">The Library</h2>
      </div>

      <div className="flex space-x-4 md:space-x-6 overflow-x-auto no-scrollbar pb-8 md:pb-12 pt-4 md:pt-20">
        {BOOKS.map((book, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            className="flex-shrink-0 w-64 md:w-72 h-[380px] md:h-[450px] relative rounded-lg overflow-hidden group border border-white/5 bg-black"
          >
            <img 
              src={book.image} 
              alt={book.title} 
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:opacity-80 transition-all duration-700"
            />
            
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col justify-end min-h-[200px]">
              <div className="absolute top-4 right-4 bg-gold text-[#0A0A0A] font-bold text-[8px] px-2 py-1 rounded">
                KINDLE EDITION
              </div>
              
              <h3 className="font-serif text-2xl text-white mb-2 leading-tight group-hover:text-gold transition-colors">{book.title}</h3>
              <p className="text-[10px] uppercase font-bold text-[#A0A0A0] mb-4 tracking-tighter">{book.subtitle}</p>
              
              <div className="flex items-center justify-between mt-auto">
                <span className="text-sm font-mono text-gold">{book.price}</span>
                <a 
                  href={amazonUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-gold hover:text-[#0A0A0A] transition-all"
                >
                  <ShoppingBag size={14} />
                </a>
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
          className="flex-shrink-0 w-72 h-[450px] flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-lg hover:border-gold/30 group transition-all"
        >
          <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center mb-6 group-hover:border-gold/30 transition-all">
            <BookOpen size={24} className="text-white/20 group-hover:text-gold transition-all" />
          </div>
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 group-hover:text-white transition-all">View Full Shelf</span>
          <span className="text-[8px] uppercase tracking-widest text-[#666] mt-2 group-hover:text-gold/60 transition-all">36 Titles Available</span>
        </motion.a>
      </div>

      <div className="absolute top-1/2 right-12 -translate-y-1/2 rotate-90 origin-right hidden lg:block">
        <span className="text-[10px] uppercase tracking-[0.8em] font-bold text-white/5 select-none text-8xl">LITERARY</span>
      </div>
    </div>
  );
}
