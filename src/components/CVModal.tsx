import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Phone, MapPin, Globe, Award, Briefcase, GraduationCap, Code, Server, Database, Cloud } from 'lucide-react';

import { triggerHaptic } from '../lib/haptics';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CVModal({ isOpen, onClose }: CVModalProps) {
  const { t, i18n } = useTranslation();

  const handleClose = () => {
    triggerHaptic(10);
    onClose();
  };
  
  const EXPERIENCE = [
    {
      period: "2019 - Present",
      role: t('cv.experience.role1'),
      company: "Claranet Porto",
      description: t('cv.experience.desc1'),
      tech: ["C# 7.1", "JAVA 8-11", "React JS", "AWS", "Dynamics 365"]
    },
    {
      period: "2018 - 2019",
      role: t('cv.experience.role2'),
      company: "Alter Solution / Farfetch",
      description: t('cv.experience.desc2'),
      tech: ["Kafka", "Redis", "Elastic Search", "Cassandra DB", "Grafana"]
    },
    {
      period: "2017 - 2018",
      role: t('cv.experience.role3'),
      company: "Natixis SA",
      description: t('cv.experience.desc3'),
      tech: [".NET", "SQL Server", "Sybase", "CIB Platforms"]
    }
  ];

  const SKILLS = [
    { category: t('cv.skills.backend'), items: [".NET Core", "C#", "Java", "Python", "SQL Server"] },
    { category: t('cv.skills.frontend'), items: ["React JS", "Angular 6-9", "TypeScript", "Tailwind CSS"] },
    { category: t('cv.skills.cloud'), items: ["AWS (Lambda, DynamoDB)", "Azure", "Docker", "Kafka", "Grafana"] },
    { category: t('cv.skills.enterprise'), items: ["Sharepoint Online", "Power Platform", "Dynamics 365", "Umbraco"] }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-[var(--color-bg)]/90 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl h-full max-h-[90vh] bg-[var(--color-bg)] border border-[var(--color-border)] rounded-3xl overflow-hidden flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-5 md:p-10 border-b border-[var(--color-border)] flex justify-between items-start">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif text-[var(--color-text-primary)] mb-1 md:mb-2">Pedro<span className="text-gold italic font-light ml-2">Mourão Martins</span></h2>
                <p className="text-gold font-mono text-[8px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold">{t('cv.subtitle')}</p>
              </div>
              <button 
                onClick={handleClose}
                className="w-10 h-10 rounded-full glass-morphism flex items-center justify-center text-[var(--color-text-primary)] hover:text-gold transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10 no-scrollbar">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                
                {/* Left Column: Stats & Skills */}
                <div className="space-y-10">
                  {/* Contact */}
                  <section className="space-y-4">
                    <h3 className="text-xs uppercase tracking-widest text-[var(--color-text-primary)]/40 font-bold flex items-center gap-2">
                       <MapPin size={14} className="text-gold" /> {t('cv.contact')}
                    </h3>
                    <div className="space-y-3 text-sm text-[var(--color-text-secondary)]">
                      <p className="flex items-center gap-3"><Mail size={14} /> mourao.martins@gmail.com</p>
                      <p className="flex items-center gap-3"><Globe size={14} /> cantinhode..net</p>
                      <p className="flex items-center gap-3"><MapPin size={14} /> Porto, Portugal</p>
                    </div>
                  </section>

                  {/* Skills Grid */}
                  <section className="space-y-6">
                    <h3 className="text-xs uppercase tracking-widest text-[var(--color-text-primary)]/40 font-bold flex items-center gap-2">
                       <Code size={14} className="text-gold" /> {t('cv.technologies')}
                    </h3>
                    {SKILLS.map((set, idx) => (
                      <div key={idx} className="space-y-2">
                        <p className="text-[10px] uppercase text-gold/60 font-bold tracking-wider">{set.category}</p>
                        <motion.div 
                          initial="hidden"
                          animate="visible"
                          variants={{
                            visible: {
                              transition: {
                                staggerChildren: 0.05
                              }
                            }
                          }}
                          className="flex flex-wrap gap-2"
                        >
                          {set.items.map((item, i) => (
                            <motion.span 
                              key={i}
                              variants={{
                                hidden: { opacity: 0, y: 10 },
                                visible: { opacity: 1, y: 0 }
                              }}
                              className="px-3 py-1 bg-[var(--color-text-primary)]/5 border border-[var(--color-border)] rounded-full text-[10px] text-[var(--color-text-primary)]/80"
                            >
                              {item}
                            </motion.span>
                          ))}
                        </motion.div>
                      </div>
                    ))}
                  </section>
                </div>

                {/* Right Column: Experience & Education */}
                <div className="lg:col-span-2 space-y-12">
                  <section className="space-y-8">
                    <h3 className="text-xs uppercase tracking-widest text-[var(--color-text-primary)]/40 font-bold flex items-center gap-2">
                      <Briefcase size={14} className="text-gold" /> {t('cv.professionalPath')}
                    </h3>
                    <div className="space-y-10">
                      {EXPERIENCE.map((job, idx) => (
                        <div key={idx} className="relative pl-6 border-l border-gold/20 group">
                          <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_rgba(197,160,89,0.5)] group-hover:scale-150 transition-transform" />
                          <div className="mb-2">
                            <span className="text-[10px] font-mono text-gold/60 font-bold">{job.period}</span>
                            <h4 className="text-lg text-[var(--color-text-primary)] font-medium">{job.role}</h4>
                            <p className="text-sm text-gold/80 italic">{job.company}</p>
                          </div>
                          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4">{job.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {job.tech.map((t, i) => (
                              <span key={i} className="text-[9px] uppercase tracking-tighter font-bold text-[var(--color-text-primary)]/30">{t} {i < job.tech.length - 1 && "•"}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="space-y-6">
                    <h3 className="text-xs uppercase tracking-widest text-[var(--color-text-primary)]/40 font-bold flex items-center gap-2">
                      <GraduationCap size={14} className="text-gold" /> {t('cv.education')}
                    </h3>
                    <div className="p-6 glass-morphism rounded-2xl border border-[var(--color-border)]">
                      <p className="text-[var(--color-text-primary)] font-medium">{t('cv.masters')}</p>
                      <p className="text-sm text-[var(--color-text-secondary)]">{t('cv.university')}</p>
                      <p className="text-xs text-gold/60 mt-1">2010 - 2012 • {t('cv.eqf')}</p>
                    </div>
                  </section>
                </div>
              </div>
            </div>

            {/* Footer Action */}
            <div className="p-6 md:p-8 bg-[var(--color-bg)]/40 border-t border-[var(--color-border)] flex flex-wrap gap-4 items-center justify-between">
              <p className="text-xs text-[var(--color-text-secondary)]">{t('cv.builtWith')}</p>
              <div className="flex gap-4">
                <a 
                  href="mailto:mourao.martins@gmail.com"
                  onClick={() => triggerHaptic(20)}
                  className="px-6 py-2 bg-gold text-black rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors"
                >
                  {t('cv.hireMe')}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
