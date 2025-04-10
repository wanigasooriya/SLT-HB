import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, XIcon, UserIcon, Search } from 'lucide-react';
import { SearchHeader } from './SearchHeader';
import { SearchInput } from './SearchInput';
import { VirtualKeypad } from './VirtualKeypad';
import { SearchButton } from './SearchButton';
import { AdminButton } from './AdminButton';
import { useLanguage } from './LanguageContext';
import { AddCustomerButton } from './AddCustomerButton';
export function SearchScreen() {
  const {
    t
  } = useLanguage();
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState('slt_acc'); // Default to SLT/Account
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const getPlaceholder = () => {
    switch (searchType) {
      case 'nic':
        return 'Enter NIC Number';
      case 'slt_acc':
        return 'Enter SLT/Account Number';
      default:
        return 'Enter Search Number';
    }
  };
  const customers = {
    '991234567V': {
      name: 'Milan Shahama',
      address: 'F - 06, Main Road, Hambantota',
      phone: '0472222156'
    },
    SLT123456: {
      name: 'Malini Silva',
      address: '45/2, Beach Road, Hambantota',
      phone: '047-2233445'
    },
    ACC789012: {
      name: 'Amal Fernando',
      address: '78, New Lane, Hambantota',
      phone: '047-2267890'
    }
  };
  useEffect(() => {
    let timer;
    if (error) {
      timer = setTimeout(() => setError(''), 10000);
    }
    return () => clearTimeout(timer);
  }, [error]);
  const handleKeyPress = key => {
    if (key === 'V') {
      if (searchType === 'nic') {
        setSearchValue(prev => prev + 'V');
      } else {
        setSearchType('nic');
        setSearchValue(prev => prev + 'V');
      }
      return;
    }
    if (key === 'backspace') {
      const newValue = searchValue.slice(0, -1);
      setSearchValue(newValue);
      if (searchType === 'nic' && !newValue.includes('V')) {
        setSearchType('slt_acc');
      }
      return;
    }
    if (key === 'clear') {
      setSearchValue('');
      setSearchType('slt_acc');
      return;
    }
    if (key === 'X' && searchValue.length < 14) {
      setSearchValue(prev => prev + key);
      return;
    }
    if (/^\d$/.test(key) && searchValue.length < 14) {
      setSearchValue(prev => prev + key);
    }
  };
  const handleKeyboardSearch = () => {
    if (!searchValue.trim()) {
      showError('error.validation.required');
      return;
    }
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      const customer = customers[searchValue];
      if (!customer) {
        showError('error.notFound');
        return;
      }
      showSuccess(customer);
    }, 1500);
  };
  const showError = message => {
    setError(t(message));
  };
  const showSuccess = customer => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      navigate(`/customer/${searchValue}`);
    }, 5000);
  };
  return <motion.main initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} className="flex flex-col items-center justify-center w-full min-h-screen p-6 relative">
      <div className="fixed inset-0 z-0 bg-cover bg-center" style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?ixlib=rb-4.0.3')"
    }}>
        <div className="absolute inset-0 bg-gray-900/85 backdrop-blur-sm">
          <div className="absolute inset-0 overflow-hidden">
            <motion.div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl" animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }} transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }} />
            <motion.div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full filter blur-3xl" animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5]
          }} transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }} />
          </div>
        </div>
      </div>
      <div className="absolute top-4 right-4 flex items-center space-x-4">
        <AddCustomerButton />
        <AdminButton />
      </div>
      <div className="w-full max-w-md mx-auto relative z-10">
        <SearchHeader />
        <motion.div initial={{
        y: 20,
        opacity: 0
      }} animate={{
        y: 0,
        opacity: 1
      }} transition={{
        type: 'spring',
        stiffness: 200,
        damping: 20,
        delay: 0.2
      }} className="mt-8 bg-gray-800/90 backdrop-blur-xl rounded-xl p-6 shadow-2xl border border-blue-500/20">
          <div className="grid grid-cols-2 gap-2 mb-6">
            {[{
            id: 'slt_acc',
            label: 'SLT/Account Number'
          }, {
            id: 'nic',
            label: 'NIC Number'
          }].map(type => <motion.button key={type.id} onClick={() => setSearchType(type.id)} className={`relative p-3 rounded-lg text-sm font-medium transition-all duration-200
                  ${searchType === type.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'}`} whileHover={{
            scale: 1.02
          }} whileTap={{
            scale: 0.98
          }}>
                {type.label}
                {searchType === type.id && <motion.div layoutId="activeTab" className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg -z-10" initial={false} transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30
            }} />}
              </motion.button>)}
          </div>
          <div className="mb-6 relative">
            <SearchInput value={searchValue} onChange={e => setSearchValue(e.target.value)} placeholder={getPlaceholder()} searchType={searchType} onSearch={handleKeyboardSearch} onTypeChange={setSearchType} />
            <motion.div initial={{
            scale: 0
          }} animate={{
            scale: 1
          }} className="absolute -right-2 -top-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full shadow-lg">
              {searchType === 'nic' ? 'NIC' : 'SLT'}
            </motion.div>
          </div>
          <VirtualKeypad onKeyPress={handleKeyPress} value={searchValue} />
          <motion.div className="mt-6" initial={{
          y: 20,
          opacity: 0
        }} animate={{
          y: 0,
          opacity: 1
        }} transition={{
          delay: 0.3
        }}>
            <SearchButton onClick={handleKeyboardSearch} isSearching={isSearching} searchValue={searchValue} />
          </motion.div>
        </motion.div>
      </div>
      <AnimatePresence>
        {error && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div initial={{
          scale: 0.5,
          y: 100
        }} animate={{
          scale: 1,
          y: 0,
          transition: {
            type: 'spring',
            stiffness: 300,
            damping: 25
          }
        }} exit={{
          scale: 0.5,
          y: 100,
          transition: {
            duration: 0.2
          }
        }} className="bg-gray-800/90 rounded-2xl p-8 border border-red-500/20 text-center max-w-md mx-auto">
              <motion.div animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }} transition={{
            duration: 0.5
          }} className="w-20 h-20 bg-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <AlertCircle size={40} className="text-white" />
              </motion.div>
              <h2 className="text-2xl font-bold mb-4">{error}</h2>
              <motion.button whileHover={{
            scale: 1.02
          }} whileTap={{
            scale: 0.98
          }} onClick={() => setError('')} className="px-6 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors">
                {t('error.tryAgain')}
              </motion.button>
            </motion.div>
          </motion.div>}
      </AnimatePresence>
      <AnimatePresence>
        {success && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={() => {
        setSuccess(false);
        navigate(`/customer/${searchValue}`);
      }} className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div initial={{
          scale: 0.5,
          y: 100
        }} animate={{
          scale: 1,
          y: 0,
          transition: {
            type: 'spring',
            stiffness: 300,
            damping: 25
          }
        }} exit={{
          scale: 0.5,
          y: 100,
          transition: {
            duration: 0.2
          }
        }} className="bg-gray-800/90 rounded-2xl p-8 border border-green-500/20 text-center max-w-md mx-auto">
              <motion.div animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }} transition={{
            duration: 0.5
          }} className="w-20 h-20 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <CheckCircle size={40} className="text-white" />
              </motion.div>
              <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.2
          }}>
                <h2 className="text-2xl font-bold mb-2">
                  ඔබව සාදරයෙන් පිළිගනිමු! 🙏
                </h2>
                <h3 className="text-xl mb-4">{customers[searchValue]?.name}</h3>
                <p className="text-gray-400 mb-6">
                  {customers[searchValue]?.address}
                </p>
              </motion.div>
              <motion.div initial={{
            width: '0%'
          }} animate={{
            width: '100%'
          }} transition={{
            duration: 5,
            ease: 'linear'
          }} className="h-1 bg-gradient-to-r from-green-500 via-green-400 to-green-500 rounded-full" />
            </motion.div>
          </motion.div>}
      </AnimatePresence>
    </motion.main>;
}