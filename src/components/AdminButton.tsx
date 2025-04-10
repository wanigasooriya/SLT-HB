import React, { useEffect, useState, useRef } from 'react';
import { UserIcon, XIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AdminLogin } from './AdminLogin';
export function AdminButton() {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();
  const timerRef = useRef(null);
  const modalRef = useRef(null);
  const handleLogin = () => {
    setShowLogin(false);
    navigate('/admin');
  };
  const handleClose = () => {
    setShowLogin(false);
  };
  useEffect(() => {
    if (showLogin) {
      timerRef.current = setTimeout(() => {
        setShowLogin(false);
      }, 60000);
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [showLogin]);
  const handleOutsideClick = e => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowLogin(false);
    }
  };
  return <>
      <motion.button whileHover={{
      scale: 1.05
    }} whileTap={{
      scale: 0.95
    }} onClick={() => setShowLogin(true)} className="px-4 py-2 bg-gray-800/90 backdrop-blur-sm rounded-lg 
                   border border-blue-500/20 flex items-center space-x-2 
                   hover:bg-gray-700/90 transition-colors duration-200">
        <UserIcon size={20} className="text-blue-400" />
        <span>Admin</span>
      </motion.button>
      <AnimatePresence>
        {showLogin && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={handleOutsideClick}>
            <div ref={modalRef} className="relative">
              <motion.button initial={{
            opacity: 0,
            scale: 0.5
          }} animate={{
            opacity: 1,
            scale: 1
          }} className="absolute -top-2 -right-2 w-8 h-8 bg-gray-800 rounded-full border border-gray-700 
                         flex items-center justify-center hover:bg-gray-700 transition-colors z-10" onClick={handleClose}>
                <XIcon size={16} />
              </motion.button>
              <div className="w-full max-w-md">
                <AdminLogin onLogin={handleLogin} />
              </div>
            </div>
          </motion.div>}
      </AnimatePresence>
    </>;
}