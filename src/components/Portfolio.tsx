import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { ExternalLink, Layers, Globe, Code, Loader2 } from 'lucide-react';
import { projectService, Project } from '../services/projectService';

export default function Portfolio() {
  const { t } = useTranslation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectService.getAllProjects();
        setProjects(data);
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-dark flex flex-col justify-center px-6 md:px-12 py-24 md:py-0 overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#D4AF37_1.5px,transparent_1.5px)] [background-size:48px_48px]" />
      </div>

      <div className="md:absolute top-12 left-12 flex flex-col mb-12 md:mb-0 z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-3 mb-3"
        >
          <span className="h-0.5 w-6 bg-gold" />
          <span className="text-gold font-mono text-[10px] tracking-[0.4em] uppercase font-bold">{t('portfolio.index')}</span>
        </motion.div>
        <h2 className="font-serif text-5xl md:text-6xl text-white tracking-tight leading-none">{t('portfolio.title')}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4 mt-0 md:mt-24 max-w-7xl w-full mx-auto relative z-10">
        {loading ? (
          <div className="col-span-full flex items-center justify-center h-64">
             <Loader2 className="text-gold animate-spin" size={48} />
          </div>
        ) : (
          projects.map((project, index) => (
            <motion.div
              key={project.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative h-[400px] md:h-[450px] overflow-hidden rounded-[2rem] border border-white/5 glass-morphism hover:border-gold/30 transition-all duration-500"
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-20 group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-40 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent" />
              </div>
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="text-[9px] uppercase tracking-wider font-mono text-gold-muted border border-gold/20 px-2 py-0.5 rounded-full">{tag}</span>
                    ))}
                  </div>
                  
                  <div>
                    <h3 className="text-white font-serif text-3xl mb-1 group-hover:text-gold transition-colors duration-300">{project.title}</h3>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-[#555] font-bold font-mono group-hover:text-white/60 transition-colors">
                      {project.category}
                    </p>
                  </div>

                  <div className="overflow-hidden">
                    <motion.div 
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      className="h-px w-full bg-gradient-to-r from-gold to-transparent origin-left opacity-30" 
                    />
                  </div>
                </div>
              </div>

              {/* Corner Accent */}
              <div className="absolute top-6 right-6 w-10 h-10 border-t border-r border-gold/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 duration-500">
                 <ExternalLink size={18} className="text-gold" />
              </div>
            </motion.div>
          ))
        )}
      </div>


      {/* Decorative Blueprint Text */}
      <div className="absolute bottom-12 right-12 hidden lg:flex items-center space-x-6 text-[#333]">
        <div className="flex flex-col items-end">
          <span className="text-[9px] font-mono uppercase font-bold tracking-[0.3em] text-gold/40">{t('portfolio.status')}</span>
          <span className="text-[11px] font-mono text-white/10 italic">STRATEGIC_MAPPING_LIVE</span>
        </div>
        <div className="p-3 rounded-full border border-gold/10 glass-morphism animate-pulse">
           <Layers size={24} className="opacity-40" />
        </div>
      </div>
    </div>
  );
}
