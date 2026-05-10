import React from 'react';
import { motion } from 'motion/react';
import { Mail, Linkedin, Github, MessageSquare, ArrowRight, Youtube, Facebook, Video, Phone } from 'lucide-react';

export default function Footer() {
  const amazonUrl = "https://www.amazon.es/stores/Pedro-Martins/author/B0CBCM7259?language=pt&ref=ap_rdr&shoppingPortalEnabled=true";

  return (
    <div className="relative min-h-screen w-full bg-black flex items-center justify-center overflow-hidden px-6 md:px-12 py-24 md:py-0">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#C5A059_0%,transparent_70%)] blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-4xl text-center space-y-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="inline-block px-4 py-1 rounded-full border border-gold/30 bg-gold/5 text-gold text-[10px] uppercase font-bold tracking-[0.4em]"
        >
          End of Feed
        </motion.div>

        <h2 className="font-serif text-4xl md:text-7xl text-white leading-tight">
          Let's Architect the <br/>
          <span className="text-gold italic">Next Generation.</span>
        </h2>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto p-5 md:p-8 glass-morphism rounded-3xl text-left border border-gold/10"
        >
          <div className="flex flex-col space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-white/40 font-bold">Expertise & Achievements</span>
            </div>
            <p className="text-xs md:text-base text-[#A0A0A0] leading-relaxed">
              Software Architect at Claranet Portugal with 15+ years of cross-industry experience. Specialized in .NET, Cloud Solutions, and AI Ontologies. Published author of over 30 technical books on Amazon and founder of "Cantinho de .NET".
              <a 
                href="https://pt.linkedin.com/in/pedromiguelmouraomartins" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center text-gold ml-1 md:ml-2 hover:underline group font-bold tracking-tight"
              >
                Read More <ArrowRight size={12} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </a>
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          <a 
            href="mailto:hello@martins-archive.com"
            className="flex items-center justify-between p-4 md:p-6 glass-morphism rounded-2xl hover:bg-gold/10 transition-all group"
          >
            <div className="flex items-center space-x-3 md:space-x-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl border border-white/10 flex items-center justify-center text-gold">
                <Mail size={18} />
              </div>
              <div className="text-left">
                <p className="text-[8px] md:text-[10px] uppercase font-bold text-white/40">Direct Mail</p>
                <p className="text-xs md:text-sm text-white">mourao.martins@gmail.com</p>
              </div>
            </div>
            <ArrowRight size={14} className="text-white/20 group-hover:text-gold transition-all" />
          </a>

          <a 
            href="https://pt.linkedin.com/in/pedromiguelmouraomartins"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between p-4 md:p-6 glass-morphism rounded-2xl hover:bg-[#0077b5]/20 transition-all group"
          >
            <div className="flex items-center space-x-3 md:space-x-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl border border-white/10 flex items-center justify-center text-[#0077b5]">
                <Linkedin size={18} md:size={20} />
              </div>
              <div className="text-left">
                <p className="text-[8px] md:text-[10px] uppercase font-bold text-white/40">Professional</p>
                <p className="text-xs md:text-sm text-white">LinkedIn Network</p>
              </div>
            </div>
            <ArrowRight size={14} md:size={16} className="text-white/20 group-hover:text-[#0077b5] transition-all" />
          </a>
        </div>

        <div className="pt-12 flex flex-col items-center">
          <div className="flex space-x-8 mb-8 items-center">
            <a href="https://github.com/moraomartins" className="text-white/40 hover:text-white transition-all"><Github size={20} /></a>
            <a href="https://youtube.com/@cantinhodedotnet?si=S1xPa_vduc-4-Xt6" target="_blank" rel="noreferrer" className="text-white/40 hover:text-red-500 transition-all"><Youtube size={20} /></a>
            <a href="https://www.facebook.com/share/1LdCY6dzfs/" target="_blank" rel="noreferrer" className="text-white/40 hover:text-blue-500 transition-all"><Facebook size={20} /></a>
            <a href="https://www.tiktok.com/@cantinhodedotnet?_r=1&_t=ZG-96FMgNnz01Q" target="_blank" rel="noreferrer" className="text-white/40 hover:text-cyan-400 transition-all"><Video size={20} /></a>
            <a href="https://wa.me/351919520386" target="_blank" rel="noreferrer" className="text-white/40 hover:text-green-500 transition-all"><Phone size={20} /></a>
            <a href="https://cantinhodotnet.com" className="text-gold opacity-50 hover:opacity-100 transition-all"><MessageSquare size={20} /></a>
            <a href={amazonUrl} className="text-white/40 hover:text-gold transition-all font-mono text-[10px] font-bold tracking-widest">AMAZON_STORE</a>
          </div>
          
          <p className="text-[8px] uppercase tracking-[0.5em] text-white/20 font-bold">
            © 2026 Pedro Miguel Mourão Martins • System Architect
          </p>
        </div>
      </div>

      <div className="absolute top-1/2 left-12 -translate-y-1/2 -rotate-90 origin-left hidden lg:block">
        <span className="text-[10px] uppercase tracking-[0.8em] font-bold text-white/5 select-none text-8xl">REBOOT_CORE</span>
      </div>
    </div>
  );
}
