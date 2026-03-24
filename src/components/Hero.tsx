import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export const Hero = () => {
  const { t, language } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="relative w-full h-[90vh] flex items-center justify-center px-6 overflow-hidden" style={{ perspective: 1200 }}>
      {/* Grand Ambient Orb Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#915eff]/5 rounded-full filter blur-[120px] pointer-events-none z-0" />

      <motion.div 
        key={language}
        initial={isMobile ? { opacity: 0, y: 20 } : { rotateY: -60, opacity: 0, scale: 0.95 }}
        animate={{ rotateY: 0, opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="glass-card p-10 md:p-20 max-w-5xl w-full text-center flex flex-col items-center gap-6 z-10 origin-center"
      >
        <div className="flex flex-col gap-1">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="font-mono text-xs md:text-sm tracking-[0.3em] text-[#915eff] uppercase font-bold"
          >
            {t('hero.role')}
          </motion.p>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tightest mt-2 leading-[0.9] text-white">
            {t('hero.intro')} <span className="text-accent-gradient">Amirhossein</span>
          </h1>
        </div>

        <p className="text-sm md:text-xl text-white/80 max-w-2xl font-light leading-relaxed mt-2">
          {t('hero.description')}
        </p>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex gap-4 mt-6"
        >
          <a href="#projects" className="px-8 py-3.5 rounded-2xl bg-[#915eff] hover:bg-[#7a4cd4] font-bold text-sm transition-all duration-300 shadow-xl shadow-[#915eff]/10 hover:shadow-[#915eff]/30 transform hover:-translate-y-0.5">
            {t('hero.btn_projects')}
          </a>
          <a href="#contact" className="px-8 py-3.5 rounded-2xl border border-white/10 hover:border-white/25 hover:bg-white/[0.03] backdrop-blur-md font-bold text-sm transition-all duration-300 transform hover:-translate-y-0.5">
            {t('hero.btn_contact')}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};
