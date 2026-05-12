import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Code, Cpu, Award, Zap, BookOpen, GraduationCap, MessageCircle } from 'lucide-react';

const MILESTONES = [
  {
    year: "2010",
    title: "Software Foundations",
    description: "Started at Exago Markets developing predictive market apps after graduating from ISMAI.",
    icon: GraduationCap,
    stat: "ISMAI / Exago"
  },
  {
    year: "2012",
    title: "Public Infrastructure",
    description: "Architected public transportation ticket systems at Novabase and news solutions for Público/ZON.",
    icon: Zap,
    stat: "Novabase"
  },
  {
    year: "2015",
    title: "Innovation & Community",
    description: "Founded 'Cantinho de .NET' while managing construction ERP solutions at Sparkle IT.",
    icon: MessageCircle,
    stat: "Sparkle / Community"
  },
  {
    year: "2017",
    title: "Global Banking Scale",
    description: "Web Solution Architect at Natixis, maintaining high-availability CIB banking platforms.",
    icon: Award,
    stat: "Natixis CIB"
  },
  {
    year: "2019",
    title: "Master Architecture",
    description: "Software Architect at Claranet, leading complex .NET/Java transitions for Whitworths and GALP.",
    icon: Cpu,
    stat: "Claranet"
  },
  {
    year: "2024",
    title: "Published Legacy",
    description: "Published over 30 technical books on Amazon, distilling 15+ years of architectural wisdom.",
    icon: BookOpen,
    stat: "30+ Books"
  }
];

export default function Bio() {
  const { t } = useTranslation();
  const MILESTONES = [
    {
      year: "2010",
      title: t('bio.milestones.2010.title'),
      description: t('bio.milestones.2010.description'),
      icon: GraduationCap,
      stat: "ISMAI / Exago"
    },
    {
      year: "2012",
      title: t('bio.milestones.2012.title'),
      description: t('bio.milestones.2012.description'),
      icon: Zap,
      stat: "Novabase"
    },
    {
      year: "2015",
      title: t('bio.milestones.2015.title'),
      description: t('bio.milestones.2015.description'),
      icon: MessageCircle,
      stat: "Sparkle / Community"
    },
    {
      year: "2017",
      title: t('bio.milestones.2017.title'),
      description: t('bio.milestones.2017.description'),
      icon: Award,
      stat: "Natixis CIB"
    },
    {
      year: "2019",
      title: t('bio.milestones.2019.title'),
      description: t('bio.milestones.2019.description'),
      icon: Cpu,
      stat: "Claranet"
    },
    {
      year: "2024",
      title: t('bio.milestones.2024.title'),
      description: t('bio.milestones.2024.description'),
      icon: BookOpen,
      stat: "30+ Books"
    }
  ];

  const [activeMilestone, setActiveMilestone] = useState(MILESTONES[4]);

  return (
    <div className="relative min-h-screen w-full flex items-center overflow-hidden pt-20 pb-20 md:py-0">
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-full md:w-[80%] h-full bg-gradient-to-l from-gold/5 via-transparent to-transparent blend-soft-light" />
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]" />
        
        {/* Animated Architectural Circles */}
        <div className="absolute -right-20 -top-20 w-[400px] h-[400px] md:w-[600px] md:h-[600px] border border-gold/10 rounded-full animate-[spin_60s_linear_infinite] opacity-20" />
        <div className="absolute -right-10 -top-10 w-[300px] h-[300px] md:w-[500px] md:h-[500px] border border-gold/5 rounded-full animate-[spin_40s_linear_infinite_reverse] opacity-20" />
      </div>

      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-8 flex flex-col justify-center"
        >
          <div className="flex items-center space-x-3 mb-6 md:mb-8">
            <span className="h-px w-8 md:w-12 bg-gold" />
            <span className="text-[10px] uppercase tracking-[0.4em] md:tracking-[0.6em] text-gold font-bold font-mono">{t('bio.role')}</span>
          </div>
          
          <h1 className="font-serif text-[clamp(2.5rem,15vw,9rem)] leading-[0.85] mb-6 tracking-tighter text-white">
            <span className="block overflow-hidden">
               <motion.span 
                 initial={{ y: "100%" }}
                 animate={{ y: 0 }}
                 transition={{ duration: 0.8, delay: 0.2 }}
                 className="block"
               >
                 Pedro
               </motion.span>
            </span>
            <span className="block overflow-hidden text-gold-muted/30 italic">
               <motion.span 
                 initial={{ y: "100%" }}
                 animate={{ y: 0 }}
                 transition={{ duration: 0.8, delay: 0.4 }}
                 className="block"
               >
                 Mourão Martins
               </motion.span>
            </span>
          </h1>

          <div className="max-w-xl space-y-6 md:space-y-8 text-[#A0A0A0] text-base md:text-xl font-light leading-relaxed mb-10 md:mb-12">
            <p className="border-l-2 border-gold/20 pl-6 py-2 bg-gradient-to-r from-gold/[0.03] to-transparent">
              {t('bio.tagline')} <span className="text-white font-medium underline underline-offset-8 decoration-gold/30">Claranet Portugal</span>.
            </p>
            
            <div className="relative mt-8 p-6 glass-morphism rounded-3xl border border-gold/10 overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 bg-gold/20 rounded-bl-3xl translate-x-1/2 -translate-y-1/2" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMilestone.year}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gold font-mono text-xs font-bold tracking-[0.3em]">{activeMilestone.year}</span>
                    <activeMilestone.icon size={16} className="text-gold" />
                  </div>
                  <h4 className="text-white font-serif text-2xl group-hover:text-gold transition-colors">{activeMilestone.title}</h4>
                  <p className="text-sm md:text-base text-[#777] leading-relaxed max-w-lg">{activeMilestone.description}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {MILESTONES.map((milestone) => (
              <button
                key={milestone.year}
                onClick={() => setActiveMilestone(milestone)}
                className={`group relative flex flex-col items-center focus:outline-none transition-all duration-500 ${activeMilestone.year === milestone.year ? 'opacity-100 scale-110' : 'opacity-30 hover:opacity-60'}`}
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center mb-2 transition-all duration-500 ${activeMilestone.year === milestone.year ? 'border-gold bg-gold/5 text-gold shadow-[0_0_25px_rgba(212,175,55,0.2)]' : 'border-white/10 text-white'}`}>
                  <milestone.icon className="w-3.5 h-3.5 sm:w-[18px] sm:h-[18px]" />
                </div>
                <span className="text-[8px] sm:text-[9px] font-mono tracking-widest uppercase font-bold text-white/50">{milestone.stat}</span>
                {activeMilestone.year === milestone.year && (
                  <motion.div 
                    layoutId="underline"
                    className="absolute -bottom-2 w-6 h-0.5 bg-gold rounded-full shadow-[0_0_10px_#D4AF37]"
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="lg:col-span-4 hidden lg:flex items-center justify-end"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        >
          <div className="relative w-full max-w-[320px] aspect-[3/4] group">
            {/* Visual Frame */}
            <div className="absolute inset-0 border border-gold/20 rounded-[2rem] transform rotate-3 scale-105 opacity-20 group-hover:rotate-0 transition-transform duration-700" />
            <div className="absolute inset-0 border border-gold/10 rounded-[2rem] transform -rotate-3 scale-105 opacity-10 group-hover:rotate-0 transition-transform duration-700 delay-100" />
            
            <div className="relative h-full w-full bg-[#080808] border border-white/5 rounded-[2rem] overflow-hidden glass-morphism flex flex-col">
              {/* Profile Image - Semi transparent layer */}
              <div className="h-2/3 relative overflow-hidden">
                <img 
                  src="https://m.media-amazon.com/images/S/amzn-author-media-prod/nq4001lv5jqet2jp2i50o2n229._SY600_._SL200_._PQ50_._FMwebp_.jpg" 
                  alt="Pedro Martins profile" 
                  className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] to-transparent" />
              </div>
              
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-gold mb-3">
                    <Code size={20} />
                    <span className="text-[10px] font-mono tracking-widest font-bold">SYSTEMS_ARCHITECT</span>
                  </div>
                  <h3 className="font-serif text-3xl text-white leading-none">
                    {t('bio.architecture').split(' ')[0]} <br/> 
                    <span className="text-gold italic font-light">{t('bio.architecture').split(' ')[1]}</span>
                  </h3>
                </div>

                <div className="space-y-4">
                   <div className="flex justify-between items-end">
                      <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Load Density</span>
                      <span className="text-[10px] font-mono text-gold font-bold">98.2%</span>
                   </div>
                   <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "98.2%" }}
                        transition={{ duration: 1.5, delay: 1 }}
                        className="h-full bg-gold shadow-[0_0_10px_#D4AF37]"
                      />
                   </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Vertical Navigation Hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center animate-bounce opacity-40">
        <span className="text-[10px] uppercase tracking-widest mb-2 font-bold text-white">{t('bio.scrollFeed')}</span>
        <div className="h-12 w-px bg-gradient-to-b from-gold to-transparent" />
      </div>
    </div>
  );
}
