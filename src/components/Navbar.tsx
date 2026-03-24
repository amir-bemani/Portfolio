import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const NAV_LINKS = [
    { label: t('navbar.about'), href: '#about' },
    { label: t('navbar.skills'), href: '#skills' },
    { label: t('navbar.work'), href: '#projects' },
    { label: t('navbar.experience'), href: '#experience' },
    { label: t('navbar.contact'), href: '#contact' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-300 ${
          scrolled ? 'py-3 bg-black/40 backdrop-blur-xl border-b border-white/5' : 'py-6 bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <a href="#" className="font-bold text-lg tracking-tight text-white hover:text-[#915eff] transition-colors">
            Amirhossein<span className="text-[#915eff]">.</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="font-mono text-xs tracking-wider text-white/50 hover:text-white transition-colors duration-300 uppercase"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Connect Button & Language Toggle (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Toggle with layoutId for smooth background transition */}
            <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg border border-white/5 relative">
              {(['en', 'de'] as const).map((lng) => (
                <button
                  key={lng}
                  onClick={() => setLanguage(lng)}
                  className={`relative px-2 py-1 rounded-md text-[10px] font-mono font-bold uppercase transition-colors duration-300 z-10 ${
                    language === lng ? 'text-white' : 'text-white/40 hover:text-white'
                  }`}
                >
                  {lng}
                  {language === lng && (
                    <motion.div
                      layoutId="activeLanguageDesktop"
                      className="absolute inset-0 bg-[#915eff] rounded-md -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            <a href="#contact" className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-xs font-semibold backdrop-blur-md hover:bg-white/[0.08] transition-all duration-300">
              {t('navbar.connect')}
            </a>
          </div>

          {/* Mobile Burger Menu */}
          <div className="flex items-center gap-3 md:hidden">
            {/* Language Toggle (Mobile) */}
            <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg border border-white/5 relative">
              {(['en', 'de'] as const).map((lng) => (
                <button
                  key={lng}
                  onClick={() => setLanguage(lng)}
                  className={`relative px-1.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase transition-colors duration-300 z-10 ${
                    language === lng ? 'text-white' : 'text-white/40'
                  }`}
                >
                  {lng}
                  {language === lng && (
                    <motion.div
                      layoutId="activeLanguageMobile"
                      className="absolute inset-0 bg-[#915eff] rounded-md -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            <button
              className="text-white p-2 hover:bg-white/5 rounded-lg transition-colors"
              onClick={() => setOpen(v => !v)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(16px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 z-[190] bg-black/60 flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="font-bold text-3xl text-white hover:text-[#915eff] transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a 
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-4 px-6 py-3 rounded-xl bg-[#915eff] text-sm font-semibold text-white shadow-lg shadow-[#915eff]/20"
            >
              {t('navbar.connect')}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
