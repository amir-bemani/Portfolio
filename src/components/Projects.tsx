import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

const PROJECTS_CONFIG = [
  {
    tags: ["Python", "YOLOv8", "OpenCV", "AI Engineering"],
    source_code_link: "https://github.com/amir-bemani/Safety-Helmet-Detection",
    gridClass: "md:col-span-3",
    gradient: "from-purple-600/20 via-blue-600/10 to-transparent"
  },
  {
    tags: ["Python", "Scikit-Learn", "Pandas", "Matplotlib"],
    source_code_link: "https://github.com/amir-bemani/Heart-Disease-Risk-Prediction",
    gridClass: "md:col-span-3",
    gradient: "from-teal-600/20 via-cyan-600/10 to-transparent"
  },
  {
    tags: ["Next.js", "React", "Tailwind CSS", "Loyalty Tech"],
    source_code_link: "https://github.com/amir-bemani/Doner-Haus-Webapp",
    gridClass: "md:col-span-2",
    gradient: "from-red-600/20 via-orange-600/10 to-transparent"
  },
  {
    tags: ["Python", "Pandas", "Seaborn", "Jupyter"],
    source_code_link: "https://github.com/amir-bemani/Medical-Dataset-Analysis",
    gridClass: "md:col-span-2",
    gradient: "from-pink-600/20 via-purple-600/10 to-transparent"
  },
  {
    tags: ["Python", "Data Science", "Pre-processing"],
    source_code_link: "https://github.com/amir-bemani/OSHA-Construction-Incident-Analysis",
    gridClass: "md:col-span-2",
    gradient: "from-amber-600/20 via-yellow-600/10 to-transparent"
  }
];

const ProjectCard = ({ projectConfig, index }: { projectConfig: any; index: number }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, rotateY: -35, scale: 0.93, y: 15 }}
      whileInView={{ opacity: 1, rotateY: 0, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.215, 0.610, 0.355, 1.000], delay: index * 0.12 }}
      className={`glass-card p-6 flex flex-col justify-between items-start gap-4 cursor-pointer relative overflow-hidden group ${projectConfig.gridClass} origin-center`}
    >
      {/* SpotLight Glow */}
      <div 
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(145, 94, 255, 0.12), transparent 60%)`
        }}
      />

      {/* Aesthetic Gradient Top Cover */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${projectConfig.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />

      <div className="flex flex-col gap-3 z-10 w-full">
        <div className="flex justify-between items-center w-full">
          <h3 className="font-extrabold text-lg md:text-xl tracking-tight text-white group-hover:text-accent-gradient transition-all duration-300">
            {t(`projects.items.${index}.name`)}
          </h3>
        </div>
        <p className="text-white/60 text-sm font-light leading-relaxed max-w-md">
          {t(`projects.items.${index}.description`)}
        </p>
      </div>

      <div className="flex flex-col gap-4 w-full mt-4 z-10">
        <div className="flex flex-wrap gap-2">
          {projectConfig.tags.map((tag: string, tagIndex: number) => (
            <span key={tagIndex} className="px-2 py-1 bg-white/[0.03] border border-white/5 rounded-md text-[10px] font-semibold text-white/50 font-mono">
              {tag}
            </span>
          ))}
        </div>
        <a href={projectConfig.source_code_link} target="_blank" rel="noreferrer" className="w-full text-center px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 hover:border-[#915eff]/40 text-xs font-bold hover:bg-[#915eff]/10 transition-all duration-300">
          {t('projects.btn_view')}
        </a>
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  const { t, language } = useLanguage();

  return (
    <section id="projects" className="py-10 flex flex-col gap-10" style={{ perspective: 1200 }}>
      <motion.div
        key={`projects-head-${language}`}
        initial={{ opacity: 0, x: -15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-2"
      >
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#915eff] font-bold">
          {t('projects.subtitle')}
        </p>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
          {t('projects.title')}.
        </h2>
      </motion.div>

      <motion.p
        key={`projects-desc-${language}`}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-white/70 text-sm md:text-lg max-w-3xl leading-relaxed font-light"
      >
        {t('projects.description')}
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-5 mt-4">
        {PROJECTS_CONFIG.map((project, index) => (
          <ProjectCard key={`${index}-${language}`} projectConfig={project} index={index} />
        ))}
      </div>
    </section>
  );
};
