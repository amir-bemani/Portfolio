import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const ExperienceCard = ({ index, isMobile }: { index: number; isMobile: boolean }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const points = t(`experience.items.${index}.points`) || [];

  return (
    <motion.div
      key={`${index}-${language}`}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={isMobile ? { opacity: 0, y: 15 } : { opacity: 0, rotateY: -35, scale: 0.93, y: 15 }}
      whileInView={{ opacity: 1, rotateY: 0, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.7, ease: [0.215, 0.610, 0.355, 1.000], delay: index * 0.15 }}
      className="relative flex flex-col gap-2 glass-card p-6 cursor-pointer overflow-hidden group shadow-md origin-center"
    >
      <div 
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(145, 94, 255, 0.12), transparent 60%)`
        }}
      />
      
      <span className="font-mono text-xs text-[#915eff] font-bold z-10">
        {t(`experience.items.${index}.period`)}
      </span>
      <div className="flex flex-col z-10">
        <h3 className="text-lg md:text-xl font-extrabold tracking-tight text-white group-hover:text-accent-gradient transition-colors duration-300">
          {t(`experience.items.${index}.title`)}
        </h3>
        <p className="text-white/40 text-sm font-medium">
          {t(`experience.items.${index}.company`)}
        </p>
      </div>

      <ul className="mt-3 list-disc list-inside flex flex-col gap-2 text-white/70 text-sm font-light leading-relaxed z-10">
        {Array.isArray(points) && points.map((point: string, i: number) => (
          <li key={i} className="pl-1"><span className="relative -left-1">{point}</span></li>
        ))}
      </ul>
    </motion.div>
  );
};

export const Experience = () => {
  const { t, language } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="experience" className="py-10 flex flex-col gap-10" style={{ perspective: 1200 }}>
      <motion.div
        key={`experience-head-${language}`}
        initial={{ opacity: 0, x: -15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-2"
      >
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#915eff] font-bold">
          {t('experience.subtitle')}
        </p>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
          {t('experience.title')}
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-4">
        {[0, 1, 2].map((index) => (
          <ExperienceCard key={`${index}-${language}`} index={index} isMobile={isMobile} />
        ))}
      </div>
    </section>
  );
};
