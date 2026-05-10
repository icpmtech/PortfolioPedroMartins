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

  const [activeMilestone, setActiveMilestone] = useState(MILESTONES[2]);

  return (
    <div className="relative h-screen w-full flex items-center overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-[80%] h-full bg-gradient-to-l from-gold/5 to-transparent blend-soft-light" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 relative z-10 py-24 lg:py-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-center"
        >
          <div className="flex items-center space-x-3 mb-4 md:mb-6">
            <span className="h-px w-6 md:w-8 bg-gold" />
            <span className="text-[10px] uppercase tracking-[0.3em] md:tracking-[0.5em] text-gold font-bold font-mono">{t('bio.role')}</span>
          </div>
          
          <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl leading-[0.9] md:leading-none mb-4 tracking-tighter text-white">
            Pedro <br className="hidden md:block" />
            <span className="text-white/20 italic">Mourão Martins</span>
          </h1>

          <div className="max-w-md space-y-4 md:space-y-6 text-[#A0A0A0] text-sm sm:text-base md:text-lg font-light leading-relaxed mb-8 md:mb-10">
            <p>
              {t('bio.tagline')} <span className="text-white font-medium underline underline-offset-8 decoration-gold/30">Claranet Portugal</span>.
            </p>
            
            <div className="relative mt-8 p-4 glass-morphism rounded-2xl border border-white/5 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMilestone.year}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gold font-mono text-xs bold tracking-widest">{activeMilestone.year}</span>
                    <activeMilestone.icon size={14} className="text-gold/40" />
                  </div>
                  <h4 className="text-white font-serif text-lg">{activeMilestone.title}</h4>
                  <p className="text-[11px] md:text-xs text-[#666] leading-relaxed">{activeMilestone.description}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            {MILESTONES.map((milestone) => (
              <button
                key={milestone.year}
                onClick={() => setActiveMilestone(milestone)}
                className={`group relative flex flex-col items-center focus:outline-none transition-all duration-300 ${activeMilestone.year === milestone.year ? 'opacity-100 scale-105 sm:scale-110' : 'opacity-40 hover:opacity-70'}`}
              >
                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center mb-1 transition-all ${activeMilestone.year === milestone.year ? 'border-gold bg-gold/10 text-gold shadow-[0_0_15px_rgba(197,160,89,0.3)]' : 'border-white/10 text-white'}`}>
                  <milestone.icon size={10} sm:size={12} />
                </div>
                <span className="text-[7px] sm:text-[8px] font-mono tracking-tighter uppercase font-bold">{milestone.stat}</span>
                {activeMilestone.year === milestone.year && (
                  <motion.div 
                    layoutId="underline"
                    className="absolute -bottom-1 w-4 h-0.5 bg-gold rounded-full"
                  />
                )}
              </button>
            ))}
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
                <h3 className="font-serif text-2xl text-white">{t('bio.architecture').split(' ')[0]} <br/> {t('bio.architecture').split(' ')[1]}</h3>
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
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center animate-bounce opacity-40">
        <span className="text-[10px] uppercase tracking-widest mb-2 font-bold text-white">{t('bio.scrollFeed')}</span>
        <div className="h-12 w-px bg-gradient-to-b from-gold to-transparent" />
      </div>
    </div>
  );
}
