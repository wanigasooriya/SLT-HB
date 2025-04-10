import React from 'react';
import { motion } from 'framer-motion';
import { Network, Radio } from 'lucide-react';
import { useLanguage } from './LanguageContext';
export function SearchHeader() {
  const {
    t
  } = useLanguage();
  return <header className="text-center">
      <motion.div className="mb-4 flex items-center justify-center" initial={{
      y: -20,
      opacity: 0
    }} animate={{
      y: 0,
      opacity: 1
    }} transition={{
      duration: 0.5
    }}>
        <div className="relative">
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 
                         flex items-center justify-center shadow-lg shadow-blue-500/30
                         border border-blue-500/20">
            <Network size={32} className="text-blue-100" />
          </div>
          <motion.div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-green-500" animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5]
        }} transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }} />
          {[1, 2, 3].map(i => <motion.div key={i} className="absolute inset-0 rounded-2xl border border-blue-400/20" animate={{
          scale: [1, 1.5, 1],
          opacity: [0.1, 0, 0.1]
        }} transition={{
          duration: 2,
          delay: i * 0.2,
          repeat: Infinity,
          ease: 'easeOut'
        }} />)}
        </div>
      </motion.div>
      <motion.div initial={{
      y: 20,
      opacity: 0
    }} animate={{
      y: 0,
      opacity: 1
    }} transition={{
      delay: 0.2
    }}>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          {t('app.title')}
        </h1>
        <p className="text-gray-400 mt-2 flex items-center justify-center gap-2">
          <Radio size={16} className="text-blue-400" />
          <span>{t('app.subtitle')}</span>
        </p>
      </motion.div>
    </header>;
}