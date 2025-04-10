import React from 'react';
import { motion } from 'framer-motion';
export function AdminHeader() {
  return <header className="relative z-10 px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center">
          <motion.div initial={{
          scale: 0
        }} animate={{
          scale: 1
        }} transition={{
          type: 'spring',
          stiffness: 200
        }} className="relative mr-6">
            <div className="h-14 w-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl 
                          flex items-center justify-center shadow-lg shadow-blue-500/30 
                          border border-blue-500/20">
              <motion.span initial={{
              opacity: 0,
              y: 10
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              delay: 0.5
            }} className="text-2xl font-bold text-white">
                SLT
              </motion.span>
            </div>
            <motion.div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full" animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }} transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }} />
          </motion.div>
          <div>
            <motion.h1 initial={{
            y: 20,
            opacity: 0
          }} animate={{
            y: 0,
            opacity: 1
          }} className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 
                        bg-clip-text text-transparent mb-1">
              Admin Dashboard
            </motion.h1>
            <motion.div initial={{
            y: 20,
            opacity: 0
          }} animate={{
            y: 0,
            opacity: 1
          }} transition={{
            delay: 0.2
          }} className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              <p className="text-sm text-gray-400">
                Sri Lanka Telecom - Hambantota Branch
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </header>;
}