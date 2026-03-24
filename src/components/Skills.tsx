import { motion } from 'framer-motion';

const TECH = [
  { name: 'Python 3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'R', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg' },
  { name: 'PyTorch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
  { name: 'scikit-learn', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
];

export const Skills = () => {
  return (
    <section id="skills" className="py-10 flex flex-col gap-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-2"
      >
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#915eff] font-semibold">My Tech Stack</p>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Core Skills.</h2>
      </motion.div>

      <div className="flex flex-wrap gap-3 mt-4">
        {TECH.map((tech, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="glass-card px-4 py-3 flex items-center gap-3 cursor-pointer group hover:bg-white/[0.04]"
          >
            <div className="w-5 h-5 flex items-center justify-center">
              <img src={tech.icon} alt={tech.name} className="w-full h-full object-contain filter group-hover:brightness-110 transition-all duration-300" />
            </div>
            <span className="text-sm font-semibold text-white/70 group-hover:text-white transition-colors duration-300">
              {tech.name}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
