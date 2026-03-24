import { createContext, useContext, useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Language = 'en' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Import translations
import { translations } from '../translations';

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleLanguageChange = (lang: Language) => {
    setIsTransitioning(true);
    setLanguage(lang);
    setTimeout(() => setIsTransitioning(false), 900);
  };

  const t = (path: string) => {
    const keys = path.split('.');
    let result: any = translations[language];
    for (const key of keys) {
      if (result && result[key] !== undefined) {
        result = result[key];
      } else {
        // Fallback to English
        let fallback: any = translations['en'];
        for (const fkey of keys) {
          if (fallback && fallback[fkey] !== undefined) {
            fallback = fallback[fkey];
          } else {
            return path;
          }
        }
        return fallback;
      }
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleLanguageChange, t }}>
      {children}
      
      {/* High-End Cinematic Liquid expand portal */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 220, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: [0.165, 0.84, 0.44, 1] }}
            className="fixed right-20 top-8 w-6 h-6 rounded-full z-[99999] pointer-events-none bg-gradient-to-br from-[#915eff]/50 via-cyan-500/30 to-transparent backdrop-blur-3xl shadow-[0_0_50px_rgba(145,94,255,0.5)]"
          />
        )}
      </AnimatePresence>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

