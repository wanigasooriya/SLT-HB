import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Facebook, Info, X } from 'lucide-react';
export function Copyright() {
  const [showInfo, setShowInfo] = useState(false);
  return <>
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4">
        <motion.button whileHover={{
        scale: 1.05
      }} whileTap={{
        scale: 0.95
      }} onClick={() => setShowInfo(true)} className="px-4 py-2 bg-gray-800/90 backdrop-blur-sm rounded-xl border border-blue-500/20 
                     flex items-center gap-2 hover:bg-gray-700/90 transition-colors shadow-lg">
          <Info size={18} className="text-blue-400" />
          <span className="text-sm">MS Production</span>
        </motion.button>
      </motion.div>
      <AnimatePresence>
        {showInfo && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowInfo(false)}>
            <motion.div initial={{
          scale: 0.95,
          opacity: 0
        }} animate={{
          scale: 1,
          opacity: 1
        }} exit={{
          scale: 0.95,
          opacity: 0
        }} onClick={e => e.stopPropagation()} className="bg-gray-800 rounded-2xl w-full max-w-md border border-blue-500/20 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold">About Creator</h3>
                  <motion.button whileHover={{
                scale: 1.1
              }} whileTap={{
                scale: 0.9
              }} onClick={() => setShowInfo(false)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <X size={20} />
                  </motion.button>
                </div>
              </div>
              {/* Content */}
              <div className="p-6 space-y-6">
                <div className="text-center">
                  <h4 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                    MS Production
                  </h4>
                  <p className="text-gray-400 mt-2">
                    Crafting Digital Experiences with Innovation
                  </p>
                </div>
                <div className="space-y-4">
                  <a href="mailto:milanshahama@gmail.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-xl hover:bg-gray-700/50 transition-colors">
                    <Mail size={20} className="text-blue-400" />
                    <span>milanshahama@gmail.com</span>
                  </a>
                  <a href="https://web.facebook.com/milanshahama1" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-xl hover:bg-gray-700/50 transition-colors">
                    <Facebook size={20} className="text-blue-400" />
                    <span>Connect on Facebook</span>
                  </a>
                </div>
                <div className="pt-4 border-t border-gray-700">
                  <p className="text-sm text-gray-400 text-center">
                    © 2024 MS Production. All rights reserved.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>}
      </AnimatePresence>
    </>;
}