import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, X, Sparkles, MapPin, Zap, UserCircle } from 'lucide-react';
export function MSProduction() {
  const [showInfo, setShowInfo] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const students = [{
    name: 'W.A.K Dushmanthi',
    email: 'kawindiwanigasooriya@gmail.com'
  }, {
    name: 'G.D.D.Srimali',
    email: 'srimalidhananjika@gmail.com'
  }, {
    name: 'E.P.K.Madhushika',
    email: 'krishariedirisooriya23@gmail.com'
  }];
  return <>
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 1
    }} className="fixed bottom-6 right-6 z-50">
        <motion.button whileHover={{
        scale: 1.05
      }} whileTap={{
        scale: 0.95
      }} onClick={() => setShowInfo(true)} className="group relative px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-800 
                     rounded-xl border border-blue-500/20 shadow-lg shadow-blue-500/20
                     flex items-center gap-2 hover:shadow-xl hover:shadow-blue-500/30 
                     transition-all duration-300">
          <Sparkles className="text-blue-200" size={18} />
          <span className="text-sm font-medium bg-gradient-to-r from-blue-100 to-blue-200 
                          bg-clip-text text-transparent">
            Contact Creators
          </span>
          <motion.div className="absolute inset-0 -z-10 bg-blue-600/20 rounded-xl blur-xl" animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5]
        }} transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut'
        }} />
        </motion.button>
      </motion.div>
      <AnimatePresence>
        {showInfo && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="fixed inset-0 bg-gray-900/90 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowInfo(false)}>
            <motion.div initial={{
          scale: 0.95,
          opacity: 0
        }} animate={{
          scale: 1,
          opacity: 1
        }} exit={{
          scale: 0.95,
          opacity: 0
        }} onClick={e => e.stopPropagation()} className="relative w-full max-w-lg bg-gradient-to-b from-gray-800 to-gray-900 
                       rounded-2xl border border-blue-500/20 overflow-hidden shadow-2xl">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
              <div className="relative pt-8 px-6 pb-6">
                <div className="text-center">
                  <motion.div initial={{
                y: 20,
                opacity: 0
              }} animate={{
                y: 0,
                opacity: 1
              }} transition={{
                delay: 0.2
              }}>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 
                                bg-clip-text text-transparent relative inline-block">
                      Higher National Diploma in Information Technology
                      <motion.div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-blue-600" initial={{
                    scaleX: 0
                  }} animate={{
                    scaleX: 1
                  }} transition={{
                    delay: 0.5,
                    duration: 0.8
                  }} />
                    </h3>
                  </motion.div>
                  <motion.p initial={{
                y: 20,
                opacity: 0
              }} animate={{
                y: 0,
                opacity: 1
              }} transition={{
                delay: 0.4
              }} className="mt-2 text-gray-400 flex items-center justify-center gap-2">
                    <Zap size={16} className="text-yellow-400" />
                    Student Project Team
                  </motion.p>
                </div>
              </div>
              <div className="p-6 space-y-4 bg-gray-900/50">
                {students.map((student, index) => <motion.a key={index} whileHover={{
              x: 4
            }} href={`mailto:${student.email}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-xl 
                         hover:bg-gray-700/50 transition-colors border border-gray-700/50">
                    <UserCircle size={20} className="text-blue-400" />
                    <div className="flex flex-col">
                      <span className="text-gray-300">{student.name}</span>
                      <span className="text-sm text-gray-400">
                        {student.email}
                      </span>
                    </div>
                  </motion.a>)}
                <div className="pt-4 mt-6 border-t border-gray-800">
                  <div className="flex items-center justify-between text-sm">
                    <motion.a whileHover={{
                  scale: 1.02
                }} href="https://maps.app.goo.gl/oUBBhGdYZnki54Hp6" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors">
                      <MapPin size={14} />
                      <span>ATI - Tangalle</span>
                    </motion.a>
                    <span className="text-gray-500">© 2025</span>
                  </div>
                </div>
              </div>
              <motion.button whileHover={{
            scale: 1.1,
            rotate: 90
          }} whileTap={{
            scale: 0.9
          }} onClick={() => setShowInfo(false)} className="absolute top-4 right-4 p-2 rounded-full bg-gray-800 border border-gray-700
                       hover:bg-gray-700 transition-colors">
                <X size={16} />
              </motion.button>
            </motion.div>
          </motion.div>}
      </AnimatePresence>
    </>;
}