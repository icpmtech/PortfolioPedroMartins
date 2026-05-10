import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Layers, Globe, Code } from 'lucide-react';

const PROJECTS = [
  {
    title: "Whitworths Industrial",
    category: "Lead Architect / Claranet",
    year: "Active",
    tags: [".NET Core", "React JS", "Sharepoint"],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Natixis CIB",
    category: "High-Availability Banking",
    year: "2018",
    tags: ["CIB", "Architecture", "Fintech"],
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "ZON TV Widgets",
    category: "Media & Consumption Systems",
    year: "2012",
    tags: ["C#", "SQL Server", "Widgets"],
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "GALP Energy Portal",
    category: "Power Platform & Dynamics",
    year: "2020",
    tags: ["Dynamics 365", "Dynamics", "Azure"],
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800",
  },
];

export default function Portfolio() {
  return (
    <div className="relative min-h-screen w-full bg-[#0A0A0A] flex flex-col justify-center px-6 md:px-12 py-24 md:py-0">
      <div className="md:absolute top-12 left-12 flex flex-col mb-10 md:mb-0">
        <span className="text-gold font-mono text-[9px] md:text-[10px] tracking-[0.3em] md:tracking-[0.4em] uppercase font-bold mb-2">Systems Index</span>
        <h2 className="font-serif text-4xl text-white tracking-tight">Strategic Architecture</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-0 md:mt-20 max-w-7xl w-full">
        {PROJECTS.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group relative aspect-[16/9] sm:aspect-[3/4] overflow-hidden rounded-xl border border-white/5 glass-morphism"
          >
            <img 
              src={project.image} 
              alt={project.title} 
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-30 group-hover:opacity-60 transition-opacity duration-500"
            />
            
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <div className="flex flex-wrap gap-1 mb-4">
                {project.tags.map((tag, i) => (
                  <span key={i} className="text-[8px] uppercase tracking-tighter bg-white/10 text-white/60 px-1.5 py-0.5 rounded-full border border-white/10">{tag}</span>
                ))}
              </div>
              <h3 className="text-white font-serif text-xl mb-1 group-hover:text-gold transition-colors">{project.title}</h3>
              <p className="text-[10px] uppercase tracking-widest text-[#666] font-bold">{project.category}</p>
              
              <div className="h-px w-0 group-hover:w-full bg-gold transition-all duration-700 mt-4 opacity-50" />
            </div>

            <div className="absolute top-4 right-4 text-gold opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
               <ExternalLink size={18} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="absolute bottom-12 right-12 hidden md:flex items-center space-x-4 text-[#444]">
        <div className="flex flex-col items-end">
          <span className="text-[8px] uppercase font-bold tracking-widest">Active Status</span>
          <span className="text-[10px] font-mono text-gold/60">SYSTEMS_GREEN_OK</span>
        </div>
        <Layers size={24} className="opacity-20" />
      </div>
    </div>
  );
}
