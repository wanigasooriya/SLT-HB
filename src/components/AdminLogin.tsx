import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EyeIcon, EyeOffIcon, LockIcon, UserIcon, KeyIcon, CheckCircleIcon, AlertCircleIcon, XIcon } from 'lucide-react';
const TEST_CREDENTIALS = {
  ADMIN: {
    username: 'admin',
    password: 'admin123'
  },
  MANAGER: {
    username: 'manager',
    password: 'manager123'
  },
  STAFF: {
    username: 'staff',
    password: 'staff123'
  }
};
export function AdminLogin({
  onLogin
}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [error, setError] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimer, setLockTimer] = useState(0);
  useEffect(() => {
    let timer;
    if (lockTimer > 0) {
      timer = setInterval(() => {
        setLockTimer(prev => prev - 1);
      }, 1000);
    } else if (lockTimer === 0) {
      setIsLocked(false);
    }
    return () => clearInterval(timer);
  }, [lockTimer]);
  const validateInput = () => {
    if (!username.trim()) {
      setError('Please enter your username');
      return false;
    }
    if (!password.trim()) {
      setError('Please enter your password');
      return false;
    }
    return true;
  };
  const handleLogin = e => {
    e.preventDefault();
    if (isLocked) {
      setError(`System is locked. Please wait ${lockTimer} seconds`);
      return;
    }
    if (!validateInput()) return;
    if (username === 'Admin' && password === 'Admin1234') {
      setError('');
      setShowWelcome(true);
      setTimeout(() => {
        onLogin();
      }, 2000);
    } else {
      setLoginAttempts(prev => prev + 1);
      if (loginAttempts + 1 >= 3) {
        setIsLocked(true);
        setLockTimer(30);
        setError('Too many attempts! System locked for 30 seconds');
      } else {
        setError(`Invalid credentials! ${3 - (loginAttempts + 1)} attempts remaining`);
      }
    }
  };
  return <AnimatePresence>
      {showWelcome ? <motion.div initial={{
      scale: 0.5,
      opacity: 0
    }} animate={{
      scale: 1,
      opacity: 1
    }} exit={{
      scale: 0.5,
      opacity: 0
    }} className="bg-gray-800/90 backdrop-blur-xl rounded-2xl p-8 border border-blue-500/20 text-center">
          <motion.div initial={{
        scale: 0
      }} animate={{
        scale: 1
      }} transition={{
        delay: 0.2,
        type: 'spring',
        stiffness: 200
      }} className="w-16 h-16 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <CheckCircleIcon size={32} className="text-white" />
          </motion.div>
          <motion.h2 initial={{
        y: 20,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} transition={{
        delay: 0.4
      }} className="text-2xl font-bold mb-2">
            Welcome Back!
          </motion.h2>
          <motion.p initial={{
        y: 20,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} transition={{
        delay: 0.6
      }} className="text-gray-400">
            Redirecting to admin dashboard...
          </motion.p>
        </motion.div> : <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={{
      opacity: 1,
      y: 0
    }} exit={{
      opacity: 0,
      y: -20
    }} className="bg-gray-800/90 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/20">
          <div className="text-center mb-6">
            <motion.div initial={{
          scale: 0
        }} animate={{
          scale: 1
        }} transition={{
          type: 'spring',
          stiffness: 200
        }} className="h-16 w-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <LockIcon size={32} className="text-white" />
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
              <h2 className="text-xl font-bold">Admin Login</h2>
              <p className="text-gray-400 text-sm mt-1">
                Enter your credentials to continue
              </p>
            </motion.div>
          </div>
          <AnimatePresence>
            {error && <motion.div initial={{
          opacity: 0,
          y: -10
        }} animate={{
          opacity: 1,
          y: 0
        }} exit={{
          opacity: 0,
          y: -10
        }} className="mb-4 p-3 bg-red-500/10 rounded-lg border border-red-500/20 flex items-start">
                <AlertCircleIcon size={18} className="text-red-400 mt-0.5 mr-2" />
                <p className="text-red-400 text-sm flex-1">{error}</p>
                <button onClick={() => setError('')} className="text-red-400 hover:text-red-300">
                  <XIcon size={14} />
                </button>
              </motion.div>}
          </AnimatePresence>
          <form onSubmit={handleLogin} className="space-y-4">
            <motion.div initial={{
          x: -20,
          opacity: 0
        }} animate={{
          x: 0,
          opacity: 1
        }} transition={{
          delay: 0.3
        }}>
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-gray-900/50 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Username" disabled={isLocked} />
              </div>
            </motion.div>
            <motion.div initial={{
          x: 20,
          opacity: 0
        }} animate={{
          x: 0,
          opacity: 1
        }} transition={{
          delay: 0.4
        }}>
              <div className="relative">
                <KeyIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} className="w-full pl-10 pr-12 py-3 bg-gray-900/50 rounded-xl border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Password" disabled={isLocked} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300" disabled={isLocked}>
                  {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                </button>
              </div>
            </motion.div>
            <motion.button initial={{
          y: 20,
          opacity: 0
        }} animate={{
          y: 0,
          opacity: 1
        }} transition={{
          delay: 0.5
        }} type="submit" className={`w-full py-3 rounded-xl font-medium transition-colors ${isLocked ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500'}`} whileHover={isLocked ? {} : {
          scale: 1.02
        }} whileTap={isLocked ? {} : {
          scale: 0.98
        }} disabled={isLocked}>
              {isLocked ? `Locked (${lockTimer}s)` : 'Login'}
            </motion.button>
          </form>
        </motion.div>}
    </AnimatePresence>;
}