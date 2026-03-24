import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

const servicesIcons = [
  {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
  },
  {
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
];

const ServiceCard = ({ serviceTitle, icon, index }: { serviceTitle: string; icon: string; index: number }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card p-6 flex flex-col items-center justify-center gap-4 text-center group cursor-pointer relative overflow-hidden"
    >
      <div 
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 206, 168, 0.12), transparent 60%)`
        }}
      />

      <div className="w-12 h-12 bg-white/[0.03] rounded-2xl flex items-center justify-center p-3 border border-white/5 group-hover:border-white/10 transition-all duration-300 transform group-hover:scale-105 z-10">
        <img src={icon} alt={serviceTitle} className="w-full h-full object-contain filter group-hover:brightness-110 transition-all duration-300" />
      </div>
      <h3 className="font-bold text-sm md:text-base tracking-tight group-hover:text-accent-gradient transition-all duration-300 z-10">
        {serviceTitle}
      </h3>
    </motion.div>
  );
};

export const About = () => {
  const { t, language } = useLanguage();

  return (
    <section id="about" className="py-10 flex flex-col gap-10">
      <motion.div
        key={`about-head-${language}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-2"
      >
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#915eff] font-bold">
          {t('about.subtitle')}
        </p>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
          {t('about.title')}.
        </h2>
      </motion.div>

      <motion.p
        key={`about-desc-${language}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-white/70 text-sm md:text-lg max-w-3xl leading-relaxed font-light"
      >
        {t('about.description')}
      </motion.p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {servicesIcons.map((service, index) => (
          <ServiceCard 
            key={`${index}-${language}`} 
            serviceTitle={t(`about.services.${index}`)} 
            icon={service.icon} 
            index={index} 
          />
        ))}
      </div>
    </section>
  );
};
