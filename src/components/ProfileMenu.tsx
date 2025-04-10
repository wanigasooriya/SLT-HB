import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, UserCircle, HomeIcon, MessageCircle } from 'lucide-react';
export function ProfileMenu({
  navigate,
  showProfileMenu,
  setShowProfileMenu,
  setShowInbox,
  unreadMessages = 0
}) {
  return <div className="fixed top-6 right-6 flex items-center space-x-4 z-20">
      <motion.button whileHover={{
      scale: 1.05
    }} whileTap={{
      scale: 0.95
    }} onClick={() => navigate('/')} className="p-3 bg-gray-800/90 rounded-xl hover:bg-gray-700/90 border border-gray-700/50 backdrop-blur-sm
                   transition-all duration-200 shadow-lg hover:shadow-xl hover:border-blue-500/20">
        <HomeIcon size={20} className="text-blue-400" />
      </motion.button>
      <motion.button whileHover={{
      scale: 1.05
    }} whileTap={{
      scale: 0.95
    }} onClick={() => setShowInbox(true)} className="p-3 bg-gray-800/90 rounded-xl hover:bg-gray-700/90 border border-gray-700/50 backdrop-blur-sm
                   transition-all duration-200 shadow-lg hover:shadow-xl hover:border-blue-500/20 relative">
        <MessageCircle size={20} className="text-blue-400" />
        {unreadMessages > 0 && <motion.span initial={{
        scale: 0
      }} animate={{
        scale: 1
      }} className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs 
                     flex items-center justify-center border-2 border-gray-800 font-medium">
            {unreadMessages}
          </motion.span>}
      </motion.button>
      <div className="relative">
        <motion.button whileHover={{
        scale: 1.05
      }} whileTap={{
        scale: 0.95
      }} onClick={() => setShowProfileMenu(!showProfileMenu)} className="flex items-center space-x-3 px-4 py-3 bg-gray-800/90 rounded-xl hover:bg-gray-700/90 
                     border border-gray-700/50 backdrop-blur-sm transition-all duration-200 
                     shadow-lg hover:shadow-xl hover:border-blue-500/20">
          <UserCircle size={20} className="text-blue-400" />
          <span className="font-medium">Admin</span>
        </motion.button>
        <AnimatePresence>
          {showProfileMenu && <motion.div initial={{
          opacity: 0,
          y: 10,
          scale: 0.95
        }} animate={{
          opacity: 1,
          y: 0,
          scale: 1
        }} exit={{
          opacity: 0,
          y: 10,
          scale: 0.95
        }} className="absolute right-0 mt-2 w-48 bg-gray-800/90 backdrop-blur-xl rounded-xl 
                        border border-gray-700/50 shadow-xl overflow-hidden">
              <motion.div initial={{
            y: -10
          }} animate={{
            y: 0
          }} className="p-4 border-b border-gray-700/50">
                <p className="text-sm text-gray-400">Logged in as</p>
                <p className="font-medium">Administrator</p>
              </motion.div>
              <div className="p-2">
                <motion.button whileHover={{
              x: 4
            }} onClick={() => {
              setShowProfileMenu(false);
              navigate('/');
            }} className="w-full p-2 text-left rounded-lg hover:bg-red-500/20 text-red-400
                            flex items-center space-x-2 transition-colors duration-200">
                  <LogOut size={18} />
                  <span>Logout</span>
                </motion.button>
              </div>
            </motion.div>}
        </AnimatePresence>
      </div>
    </div>;
}