import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const EducationCard = ({ index }: { index: number }) => {
  const { t, language } = useLanguage();

  return (
    <motion.div
      key={`edu-${index}-${language}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.6, ease: [0.215, 0.610, 0.355, 1.000], delay: index * 0.15 }}
      className="relative flex flex-col gap-2 glass-card p-6 shadow-md opacity-0"
    >
      <span className="font-mono text-xs text-[#915eff] font-bold">
        {t(`education.items.${index}.period`)}
      </span>
      <div className="flex flex-col gap-1">
        <h3 className="text-lg md:text-xl font-extrabold tracking-tight text-white">
          {t(`education.items.${index}.degree`)}
        </h3>
        <p className="text-white/60 text-sm font-medium">
          {t(`education.items.${index}.institution`)}
        </p>
        <p className="text-white/40 text-xs">
          {t(`education.items.${index}.location`)}
        </p>
      </div>
    </motion.div>
  );
};

export const Education = () => {
  const { t, language } = useLanguage();

  return (
    <section id="education" className="py-10 flex flex-col gap-10">
      <motion.div
        key={`education-head-${language}`}
        initial={{ opacity: 0, x: -15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-2"
      >
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#915eff] font-bold">
          {t('education.subtitle')}
        </p>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
          {t('education.title')}
        </h2>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
        {[0, 1].map((index) => (
          <EducationCard key={`${index}-${language}`} index={index} />
        ))}
      </div>
    </section>
  );
};
