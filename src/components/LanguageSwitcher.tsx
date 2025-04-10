import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import { useLocation } from 'react-router-dom';
export function LanguageSwitcher() {
  const {
    language,
    setLanguage
  } = useLanguage();
  const location = useLocation();
  if (location.pathname.includes('/admin')) {
    return null;
  }
  return <motion.div initial={{
    opacity: 0,
    y: -20
  }} animate={{
    opacity: 1,
    y: 0
  }} className="fixed top-6 left-6 z-50">
      <motion.div className="bg-gray-800/90 backdrop-blur-sm rounded-xl border border-blue-500/20 p-1
                   flex items-center gap-1 shadow-lg">
        {[{
        code: 'en',
        label: 'English'
      }, {
        code: 'si',
        label: 'සිංහල'
      }].map(lang => <motion.button key={lang.code} onClick={() => setLanguage(lang.code as 'en' | 'si')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all relative
                      ${language === lang.code ? 'text-white' : 'text-gray-400 hover:text-white'}`} whileHover={{
        scale: 1.05
      }} whileTap={{
        scale: 0.95
      }}>
            {lang.label}
            {language === lang.code && <motion.div layoutId="activeLanguage" className="absolute inset-0 bg-blue-600 rounded-lg -z-10" initial={false} transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30
        }} />}
          </motion.button>)}
      </motion.div>
    </motion.div>;
}