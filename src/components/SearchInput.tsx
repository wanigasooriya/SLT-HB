import React, { useState } from 'react';
import { UserIcon, Hash, AlertCircle } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
export interface ValidationResult {
  isValid: boolean;
  error: string;
}
export const validateInput = (value: string, newChar: string = '', maxLength: number = 14): ValidationResult => {
  const newValue = value + newChar;
  const xCount = (newValue.match(/X/g) || []).length;
  const vCount = (newValue.match(/V/g) || []).length;
  if (newValue.length > maxLength) {
    return {
      isValid: false,
      error: 'error.validation.maxLength'
    };
  }
  if ((newChar === 'X' || newChar === 'V') && value.length === 0) {
    return {
      isValid: false,
      error: 'error.validation.firstChar'
    };
  }
  if (xCount > 0 && vCount > 0) {
    return {
      isValid: false,
      error: 'error.validation.xAndV'
    };
  }
  if (xCount > 1 || vCount > 1) {
    return {
      isValid: false,
      error: 'error.validation.multipleXV'
    };
  }
  return {
    isValid: true,
    error: ''
  };
};
export function SearchInput({
  value,
  onChange,
  placeholder,
  searchType,
  onSearch,
  onTypeChange
}) {
  const {
    t
  } = useLanguage();
  const [error, setError] = useState('');
  const MAX_LENGTH = 14;
  const getIcon = () => {
    return searchType === 'nic' ? <UserIcon size={20} className="text-gray-400" /> : <Hash size={20} className="text-gray-400" />;
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      const newValue = value.slice(0, -1);
      onChange({
        target: {
          value: newValue
        }
      } as React.ChangeEvent<HTMLInputElement>);
      if (searchType === 'nic' && !newValue.includes('V')) {
        onTypeChange('slt_acc');
      }
      setError('');
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearch();
      return;
    }
    e.preventDefault();
    if (/^\d$/.test(e.key) || e.code.startsWith('Numpad') && /^\d$/.test(e.key)) {
      const validation = validateInput(value, e.key, MAX_LENGTH);
      if (validation.isValid) {
        onChange({
          target: {
            value: value + e.key
          }
        } as React.ChangeEvent<HTMLInputElement>);
        setError('');
      } else {
        setError(t(validation.error));
      }
      return;
    }
    if (/^[xv]$/i.test(e.key)) {
      const upperKey = e.key.toUpperCase();
      const validation = validateInput(value, upperKey, MAX_LENGTH);
      if (validation.isValid) {
        onChange({
          target: {
            value: value + upperKey
          }
        } as React.ChangeEvent<HTMLInputElement>);
        if (upperKey === 'V') {
          onTypeChange('nic');
        }
        setError('');
      } else {
        setError(t(validation.error));
      }
    }
  };
  const getInputLength = () => {
    return `${value.length}/${MAX_LENGTH}`;
  };
  return <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2">
        {getIcon()}
      </div>
      <input type="text" value={value} onKeyDown={handleKeyDown} placeholder={placeholder} className={`w-full pl-12 pr-20 py-4 bg-gray-900 border ${error ? 'border-red-500/50' : 'border-blue-500/30'} rounded-lg text-xl focus:outline-none focus:ring-2 ${error ? 'focus:ring-red-500' : 'focus:ring-blue-500'} focus:border-transparent transition-all duration-200`} readOnly />
      <div className="absolute right-4 top-1/2 -translate-y-1/2">
        <span className={`text-sm ${value.length >= MAX_LENGTH ? 'text-red-400' : 'text-gray-400'}`}>
          {getInputLength()}
        </span>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
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
      }} className="absolute -bottom-6 left-0 flex items-center space-x-1 text-red-400">
            <AlertCircle size={14} />
            <span className="text-sm">{error}</span>
          </motion.div>}
      </AnimatePresence>
    </div>;
}