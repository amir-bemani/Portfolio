import { motion } from 'framer-motion';
import { Suspense, lazy } from 'react';
import { SpotlightCard } from './SpotlightCard';

const BallCanvas = lazy(() => import('./BallCanvas'));

const TECH = [
  { name: 'Python 3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'R', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg' },
  { name: 'PyTorch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg' },
  { name: 'scikit-learn', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg' }, // Fallback icon
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
];

const DOMAINS = [
  { name: 'Healthcare AI & Digital Health', num: '01' },
  { name: 'Medical Informatics', num: '02' },
  { name: 'E-Commerce & Multi-Vendor Platforms', num: '03' },
  { name: 'Restaurant & Food Tech', num: '04' },
  { name: 'Occupational Safety Systems', num: '05' },
  { name: 'Data Pipelines & ML Ops', num: '06' },
];

export const Skills = () => {
  return (
    <section id="skills" className="py-28 px-6 md:px-16 border-t border-white/10 bg-[#080808] relative z-10">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="font-mono text-xs tracking-[0.3em] text-white/40 uppercase">02 — Skills</span>
          <div className="flex-1 h-px bg-white/10"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32">

          {/* ── Tech Stack ── */}
          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading font-black text-white uppercase tracking-tighter leading-none mb-12 text-giant">
              TECH<br />ARSENAL<span className="text-white/20">.</span>
            </h2>
            <div className="flex flex-row flex-wrap justify-center gap-10">
              {TECH.map((t) => (
                <div className="w-28 h-28" key={t.name}>
                  <Suspense fallback={<div className="w-full h-full bg-white/5 rounded-full animate-pulse" />}>
                    <BallCanvas icon={t.icon} />
                  </Suspense>
                  <p className="font-mono text-[10px] tracking-widest uppercase text-white/30 text-center mt-2">
                    {t.name}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Domains ── */}
          <motion.div
            className="lg:col-span-6 lg:pt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="font-heading font-black text-white uppercase tracking-tightest leading-none mb-12"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              DOMAIN<br />EXPERTISE
            </h2>
            <SpotlightCard className="p-8 bg-tertiary/20 border-white/5 rounded-3xl">
              <div className="space-y-1">
                {DOMAINS.map((d, i) => (
                  <motion.div
                    key={d.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * i }}
                    className="group flex items-center justify-between py-6 border-b border-white/5 hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-center gap-6">
                      <span className="font-mono text-[9px] text-white/20 group-hover:text-white/60 transition-colors tracking-widest">[{d.num}]</span>
                      <span className="font-heading font-bold text-lg md:text-xl text-white/40 group-hover:text-white transition-all duration-300 uppercase tracking-tighter italic group-hover:not-italic">
                        {d.name}
                      </span>
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </motion.div>
                ))}
              </div>
            </SpotlightCard>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
