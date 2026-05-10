import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Phone, MapPin, Globe, Award, Briefcase, GraduationCap, Code, Server, Database, Cloud } from 'lucide-react';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EXPERIENCE = [
  {
    period: "2019 - Present",
    role: "Software Architect",
    company: "Claranet Porto",
    description: "Creating solutions and implementing various projects using Sharepoint Online, Power Platform, Java and .NET technologies. Mentoring the team as technical lead and solution architect.",
    tech: ["C# 7.1", "JAVA 8-11", "React JS", "AWS", "Dynamics 365"]
  },
  {
    period: "2018 - 2019",
    role: ".NET BackEnd Solution Architect",
    company: "Alter Solution / Farfetch",
    description: "Created various solutions for BackEnd Web APIs and Azure Cloud applications for Farfetch.",
    tech: ["Kafka", "Redis", "Elastic Search", "Cassandra DB", "Grafana"]
  },
  {
    period: "2017 - 2018",
    role: ".NET Web Solution Architect",
    company: "Natixis SA",
    description: "Maintained high-availability CIB banking platforms. Designed technological solutions for new business requirements and migrated databases between Sybase and SQL Server.",
    tech: [".NET", "SQL Server", "Sybase", "CIB Platforms"]
  }
];

const SKILLS = [
  { category: "Back-end", items: [".NET Core", "C#", "Java", "Python", "SQL Server"] },
  { category: "Front-end", items: ["React JS", "Angular 6-9", "TypeScript", "Tailwind CSS"] },
  { category: "Cloud & DevOps", items: ["AWS (Lambda, DynamoDB)", "Azure", "Docker", "Kafka", "Grafana"] },
  { category: "Enterprise", items: ["Sharepoint Online", "Power Platform", "Dynamics 365", "Umbraco"] }
];

export default function CVModal({ isOpen, onClose }: CVModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl h-full max-h-[90vh] bg-[#0F0F0F] border border-white/10 rounded-3xl overflow-hidden flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="p-5 md:p-10 border-b border-white/5 flex justify-between items-start">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif text-white mb-1 md:mb-2">Pedro<span className="text-gold italic font-light ml-2">Mourão Martins</span></h2>
                <p className="text-gold font-mono text-[8px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold">Software Architect // Portfolio V.2026</p>
              </div>
              <button 
                onClick={onClose}
                className="w-10 h-10 rounded-full glass-morphism flex items-center justify-center text-white hover:text-gold transition-colors"
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
                    <h3 className="text-xs uppercase tracking-widest text-white/40 font-bold flex items-center gap-2">
                       <MapPin size={14} className="text-gold" /> Contact
                    </h3>
                    <div className="space-y-3 text-sm text-[#A0A0A0]">
                      <p className="flex items-center gap-3"><Mail size={14} /> mourao.martins@gmail.com</p>
                      <p className="flex items-center gap-3"><Globe size={14} /> cantinhode..net</p>
                      <p className="flex items-center gap-3"><MapPin size={14} /> Porto, Portugal</p>
                    </div>
                  </section>

                  {/* Skills Grid */}
                  <section className="space-y-6">
                    <h3 className="text-xs uppercase tracking-widest text-white/40 font-bold flex items-center gap-2">
                      <Code size={14} className="text-gold" /> Technologies
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
                              className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-white/80"
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
                    <h3 className="text-xs uppercase tracking-widest text-white/40 font-bold flex items-center gap-2">
                      <Briefcase size={14} className="text-gold" /> Professional Path
                    </h3>
                    <div className="space-y-10">
                      {EXPERIENCE.map((job, idx) => (
                        <div key={idx} className="relative pl-6 border-l border-gold/20 group">
                          <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-gold shadow-[0_0_8px_rgba(197,160,89,0.5)] group-hover:scale-150 transition-transform" />
                          <div className="mb-2">
                            <span className="text-[10px] font-mono text-gold/60 font-bold">{job.period}</span>
                            <h4 className="text-lg text-white font-medium">{job.role}</h4>
                            <p className="text-sm text-gold/80 italic">{job.company}</p>
                          </div>
                          <p className="text-sm text-[#808080] leading-relaxed mb-4">{job.description}</p>
                          <div className="flex flex-wrap gap-2">
                            {job.tech.map((t, i) => (
                              <span key={i} className="text-[9px] uppercase tracking-tighter font-bold text-white/30">{t} {i < job.tech.length - 1 && "•"}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="space-y-6">
                    <h3 className="text-xs uppercase tracking-widest text-white/40 font-bold flex items-center gap-2">
                      <GraduationCap size={14} className="text-gold" /> Education
                    </h3>
                    <div className="p-6 glass-morphism rounded-2xl border border-white/5">
                      <p className="text-white font-medium">Masters, Systems Engineering and Informatics</p>
                      <p className="text-sm text-[#A0A0A0]">Universidade do Minho (UM), Campus de Gualtar, Braga</p>
                      <p className="text-xs text-gold/60 mt-1">2010 - 2012 • EQF level 7</p>
                    </div>
                  </section>
                </div>
              </div>
            </div>

            {/* Footer Action */}
            <div className="p-6 md:p-8 bg-black/40 border-t border-white/5 flex flex-wrap gap-4 items-center justify-between">
              <p className="text-xs text-[#666]">Built with React & Framer Motion // Systems Architect Profile</p>
              <div className="flex gap-4">
                <a 
                  href="mailto:mourao.martins@gmail.com"
                  className="px-6 py-2 bg-gold text-black rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors"
                >
                  Hire Me
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
