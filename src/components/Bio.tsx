import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Code, Cpu } from 'lucide-react';

export default function Bio() {
  return (
    <div className="relative h-screen w-full flex items-center overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[80%] h-full bg-gradient-to-l from-gold/5 to-transparent blend-soft-light" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 relative z-10 pt-20 md:pt-0">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-center"
        >
          <div className="flex items-center space-x-3 mb-4 md:mb-6">
            <span className="h-px w-6 md:w-8 bg-gold" />
            <span className="text-[10px] uppercase tracking-[0.3em] md:tracking-[0.5em] text-gold font-bold font-mono text-xs">Software Architect</span>
          </div>
          
          <h1 className="font-serif text-5xl md:text-8xl leading-[0.9] md:leading-none mb-4 tracking-tighter text-white">
            Pedro <br className="hidden md:block" />
            <span className="text-white/20 italic">Mourão Martins</span>
          </h1>

          <div className="max-w-md space-y-4 md:space-y-6 text-[#A0A0A0] text-base md:text-lg font-light leading-relaxed mb-8 md:mb-10">
            <p>
              Designing high-performance systems at <span className="text-white font-medium underline underline-offset-8 decoration-gold/30">Claranet Portugal</span>.
            </p>
            <p className="text-xs md:text-sm">
              Strategic technical transitions, University of Minho graduate, and founder of "Cantinho de .NET".
            </p>
          </div>

          <div className="flex items-center space-x-6 md:space-x-8">
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-serif text-white">15+</span>
              <span className="text-[8px] md:text-[9px] uppercase tracking-widest text-[#666]">Years Exp</span>
            </div>
            <div className="h-6 md:h-8 w-px bg-white/10" />
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-serif text-white">40+</span>
              <span className="text-[8px] md:text-[9px] uppercase tracking-widest text-[#666]">Systems Built</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="hidden lg:flex items-center justify-center relative"
        >
          <div className="relative w-96 h-[500px]">
            {/* Profile Image Overlay */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -top-12 -left-12 w-48 h-48 rounded-2xl overflow-hidden border-4 border-[#0A0A0A] shadow-2xl z-20 hidden xl:block"
            >
              <img 
                src="https://m.media-amazon.com/images/S/amzn-author-media-prod/nq4001lv5jqet2jp2i50o2n229._SY600_._SL200_._PQ50_._FMwebp_.jpg" 
                alt="Pedro Martins profile" 
                className="w-full h-full object-cover"
              />
            </motion.div>

             {/* Abstract System Architecture Visual */}
            <div className="absolute inset-0 border border-gold/20 backdrop-blur-3xl rounded-2xl p-8 flex flex-col justify-between group overflow-hidden glass-morphism">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 blur-[100px] group-hover:bg-gold/20 transition-colors" />
              
              <div className="space-y-4">
                <Code className="text-gold" size={32} />
                <h3 className="font-serif text-2xl text-white">Architectural <br/> Integrity</h3>
                <div className="h-px w-12 bg-gold/50" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-white">
                  <Cpu size={14} className="text-gold/60" />
                  <span className="text-[10px] font-mono opacity-40">SCALABLE_CORE_V2</span>
                </div>
                <div className="h-32 bg-white/5 border border-white/5 flex items-end p-2 space-x-1">
                  {[40, 70, 45, 90, 65, 80, 50, 95].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ duration: 1, delay: i * 0.1 + 0.5 }}
                      className="w-full bg-gold/40"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Vertical Navigation Hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce opacity-40">
        <span className="text-[10px] uppercase tracking-widest mb-2 font-bold text-white">Scroll Feed</span>
        <div className="h-12 w-px bg-gradient-to-b from-gold to-transparent" />
      </div>
    </div>
  );
}
