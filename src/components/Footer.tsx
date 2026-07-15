import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Mail, Linkedin, Github, MessageSquare, ArrowRight, Youtube, Facebook, Video, Phone } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();
  const amazonUrl = "https://www.amazon.es/stores/Pedro-Martins/author/B0CBCM7259?language=pt&ref=ap_rdr&shoppingPortalEnabled=true";

  return (
    <div className="relative min-h-screen w-full bg-dark flex items-center justify-center overflow-hidden px-6 md:px-12 py-16 md:py-0">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#D4AF37_0%,transparent_70%)] blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl text-center space-y-10 md:space-y-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center space-x-3 px-6 py-2 rounded-full border border-gold/20 bg-gold/5 text-gold text-[10px] md:text-[11px] uppercase font-mono font-bold tracking-[0.4em]"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          <span>{t('footer.connectTitle')}</span>
        </motion.div>

        <h2 className="font-serif text-4xl md:text-8xl text-[var(--color-text-primary)] leading-tight tracking-tight">
          {t('footer.connectSubtitle').split('the')[0]} <br/>
          <span className="text-gold italic font-light">{t('footer.connectSubtitle').split('the')[1]}</span>
        </h2>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto p-6 md:p-12 glass-morphism rounded-[2.5rem] text-left border border-white/5 relative group overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold/5 rounded-full blur-3xl group-hover:bg-gold/10 transition-colors" />
          
          <div className="flex flex-col space-y-6 relative z-10">
            <div className="flex items-center space-x-3">
              <span className="h-px w-8 bg-gold/40" />
              <span className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-gold font-mono font-bold">{t('footer.expertiseTitle') || 'Professional Thesis'}</span>
            </div>
            <p className="text-sm md:text-lg text-[var(--color-text-secondary)] leading-relaxed font-medium">
              {t('footer.expertise')}
              <a 
                href="https://pt.linkedin.com/in/pedromiguelmouraomartins" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center text-gold ml-2 hover:text-[var(--color-text-primary)] transition-colors group font-bold font-mono tracking-tight"
              >
                {t('footer.readMore')} <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </a>
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          <a 
            href="mailto:mourao.martins@gmail.com"
            className="flex items-center justify-between p-6 md:p-8 glass-morphism rounded-[2rem] border border-white/5 hover:border-gold/30 hover:bg-gold/5 transition-all duration-500 group"
          >
            <div className="flex items-center space-x-5">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-dark transition-all duration-500">
                <Mail size={24} />
              </div>
              <div className="text-left">
                <p className="text-[10px] md:text-[11px] uppercase font-bold text-[var(--color-text-secondary)] tracking-widest mb-1 font-mono">{t('footer.directMail')}</p>
                <p className="text-sm md:text-base text-[var(--color-text-primary)] font-medium group-hover:text-gold transition-colors">mourao.martins@gmail.com</p>
              </div>
            </div>
            <ArrowRight size={20} className="text-[var(--color-text-primary)]/10 group-hover:text-gold transition-all duration-500" />
          </a>

          <a 
            href="https://pt.linkedin.com/in/pedromiguelmouraomartins"
            target="_blank" 
            rel="noreferrer"
            className="flex items-center justify-between p-6 md:p-8 glass-morphism rounded-[2rem] border border-white/5 hover:border-[#0077b5]/30 hover:bg-[#0077b5]/5 transition-all duration-500 group"
          >
            <div className="flex items-center space-x-5">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#0077b5]/10 border border-[#0077b5]/20 flex items-center justify-center text-[#0077b5] group-hover:bg-[#0077b5] group-hover:text-white transition-all duration-500">
                <Linkedin size={24} />
              </div>
              <div className="text-left">
                <p className="text-[10px] md:text-[11px] uppercase font-bold text-[var(--color-text-secondary)] tracking-widest mb-1 font-mono">{t('footer.professional')}</p>
                <p className="text-sm md:text-base text-[var(--color-text-primary)] font-medium group-hover:text-[#0077b5] transition-colors">Network Portal</p>
              </div>
            </div>
            <ArrowRight size={20} className="text-[var(--color-text-primary)]/10 group-hover:text-[#0077b5] transition-all duration-500" />
          </a>
        </div>

        <div className="pt-12 md:pt-20 flex flex-col items-center">
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-8 md:mb-12 items-center px-4">
            <a href="https://github.com/moraomartins" target="_blank" rel="noreferrer" className="text-[var(--color-text-primary)]/20 hover:text-[var(--color-text-primary)] transition-all hover:scale-110 duration-300"><Github size={24} /></a>
            <a href="https://youtube.com/@cantinhodedotnet?si=S1xPa_vduc-4-Xt6" target="_blank" rel="noreferrer" className="text-[var(--color-text-primary)]/20 hover:text-red-500 transition-all hover:scale-110 duration-300"><Youtube size={24} /></a>
            <a href="https://www.facebook.com/share/1LdCY6dzfs/" target="_blank" rel="noreferrer" className="text-[var(--color-text-primary)]/20 hover:text-blue-500 transition-all hover:scale-110 duration-300"><Facebook size={24} /></a>
            <a href="https://www.tiktok.com/@cantinhodedotnet?_r=1&_t=ZG-96FMgNnz01Q" target="_blank" rel="noreferrer" className="text-[var(--color-text-primary)]/20 hover:text-cyan-400 transition-all hover:scale-110 duration-300"><Video size={24} /></a>
            <a href="https://wa.me/351919520386" target="_blank" rel="noreferrer" className="text-[var(--color-text-primary)]/20 hover:text-green-500 transition-all hover:scale-110 duration-300"><Phone size={24} /></a>
            <a href="https://cantinhodotnet.com" target="_blank" rel="noreferrer" className="text-gold/40 hover:text-gold transition-all hover:scale-110 duration-300"><MessageSquare size={24} /></a>
          </div>
          
          <div className="w-20 h-px bg-[var(--color-text-primary)]/5 mb-8" />
          
          <p className="text-[10px] uppercase tracking-[0.6em] text-[var(--color-text-primary)]/20 font-bold mb-4 font-mono text-center">
            © 2026 Pedro Miguel Mourão Martins • {t('common.architect')}
          </p>
          <p className="text-[8px] uppercase tracking-[0.3em] text-gold/20 font-mono">
            Crafted for the future of systems • <a href="/admin" className="hover:text-gold transition-colors">Admin_Portal</a>
          </p>
        </div>
      </div>

      <div className="absolute top-1/2 left-0 -translate-y-1/2 -rotate-90 origin-left hidden lg:block select-none pointer-events-none opacity-[0.03]">
        <span className="text-[120px] uppercase font-black tracking-[0.4em] text-[var(--color-text-primary)] whitespace-nowrap">MARTINS_ARCHIVE</span>
      </div>
    </div>
  );
}
