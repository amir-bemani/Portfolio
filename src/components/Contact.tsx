import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub } from 'react-icons/fa';
import { useLanguage } from '../context/LanguageContext';

export const Contact = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-10 flex flex-col gap-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-2"
      >
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#915eff] font-bold">
          {t('contact.subtitle')}
        </p>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
          {t('contact.title')}
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch mt-4">
        {/* Contact links card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:col-span-12 glass-card p-6 md:p-10 flex flex-col gap-6"
        >
          <div className="flex flex-col gap-2">
            <h3 className="text-xl md:text-2xl font-bold tracking-tight">
              Let's build something together.
            </h3>
            <p className="text-white/60 text-sm md:text-base font-light max-w-2xl leading-relaxed">
              {t('contact.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
            <a href="mailto:amir@bemani.me" className="glass-card p-4 flex items-center gap-4 hover:bg-white/[0.04] cursor-pointer group">
              <div className="w-10 h-10 rounded-xl bg-[#915eff]/10 flex items-center justify-center text-[#915eff] group-hover:scale-105 transition-transform duration-300">
                <FaEnvelope size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-mono tracking-widest text-white/40">Email</span>
                <span className="text-sm font-semibold tracking-tight">amir@bemani.me</span>
              </div>
            </a>

            <a href="tel:+4915755709315" className="glass-card p-4 flex items-center gap-4 hover:bg-white/[0.04] cursor-pointer group">
              <div className="w-10 h-10 rounded-xl bg-[#915eff]/10 flex items-center justify-center text-[#915eff] group-hover:scale-105 transition-transform duration-300">
                <FaPhone size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-mono tracking-widest text-white/40">Phone</span>
                <span className="text-sm font-semibold tracking-tight">+49 157 55709315</span>
              </div>
            </a>

            <a href="https://linkedin.com/in/amirbemani" target="_blank" rel="noreferrer" className="glass-card p-4 flex items-center gap-4 hover:bg-white/[0.04] cursor-pointer group">
              <div className="w-10 h-10 rounded-xl bg-[#915eff]/10 flex items-center justify-center text-[#915eff] group-hover:scale-105 transition-transform duration-300">
                <FaLinkedin size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-mono tracking-widest text-white/40">LinkedIn</span>
                <span className="text-sm font-semibold tracking-tight">amirbemani</span>
              </div>
            </a>

            <a href="https://github.com/amir-bemani" target="_blank" rel="noreferrer" className="glass-card p-4 flex items-center gap-4 hover:bg-white/[0.04] cursor-pointer group">
              <div className="w-10 h-10 rounded-xl bg-[#915eff]/10 flex items-center justify-center text-[#915eff] group-hover:scale-105 transition-transform duration-300">
                <FaGithub size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase font-mono tracking-widest text-white/40">GitHub</span>
                <span className="text-sm font-semibold tracking-tight">amir-bemani</span>
              </div>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
