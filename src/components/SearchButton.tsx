import React from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Loader } from 'lucide-react';
export function SearchButton({
  onClick,
  isSearching,
  searchValue
}) {
  return <motion.button onClick={onClick} disabled={isSearching} className={`w-full py-4 rounded-lg text-white font-medium text-lg relative overflow-hidden
        ${isSearching ? 'bg-gray-600 cursor-wait' : 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400'}`} whileHover={{
    scale: 1.02
  }} whileTap={{
    scale: 0.98
  }}>
      <div className="relative z-10 flex items-center justify-center space-x-2">
        <motion.div animate={isSearching ? {
        rotate: 360,
        scale: [1, 1.2, 1]
      } : {
        scale: [1, 1.2, 1],
        rotate: 0
      }} transition={{
        duration: isSearching ? 1 : 0.5,
        repeat: isSearching ? Infinity : 0,
        ease: 'easeInOut'
      }}>
          {isSearching ? <Loader size={24} className="text-white" /> : <Search size={24} className="text-white" />}
        </motion.div>
        <motion.span animate={{
        x: isSearching ? [-2, 2] : 0
      }} transition={{
        duration: 0.5,
        repeat: isSearching ? Infinity : 0,
        repeatType: 'reverse'
      }}>
          {isSearching ? 'Searching...' : 'Search Customer'}
        </motion.span>
        {!isSearching && <motion.div initial={{
        x: -10,
        opacity: 0
      }} animate={{
        x: 0,
        opacity: 1
      }} exit={{
        x: 10,
        opacity: 0
      }}>
            <ArrowRight size={20} className="text-white/80" />
          </motion.div>}
      </div>
      <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" animate={{
      x: ['0%', '100%']
    }} transition={{
      duration: 1.5,
      repeat: Infinity,
      ease: 'linear'
    }} />
      <motion.div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-400 via-white/50 to-blue-400" animate={{
      opacity: [0.5, 1, 0.5],
      scaleX: [0.9, 1.1, 0.9]
    }} transition={{
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }} />
      <motion.div className="absolute inset-0 bg-blue-500/20 rounded-lg" animate={{
      scale: [1, 1.05, 1],
      opacity: [0, 0.2, 0]
    }} transition={{
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut'
    }} />
    </motion.button>;
}