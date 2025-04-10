import React from 'react';
import { DeleteIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { validateInput } from './SearchInput';
import { useLanguage } from './LanguageContext';
export function VirtualKeypad({
  onKeyPress,
  value = ''
}) {
  const {
    t
  } = useLanguage();
  const numericKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const MAX_LENGTH = 14;
  const handleKey = key => {
    onKeyPress(key);
  };
  return <div className="space-y-3 relative">
      <div className="grid grid-cols-3 gap-3">
        {numericKeys.map(key => <KeypadButton key={key} onClick={() => handleKey(key)} disabled={value.length >= MAX_LENGTH}>
            {key}
          </KeypadButton>)}
      </div>
      <div className="grid grid-cols-4 gap-3">
        <KeypadButton onClick={() => handleKey('0')} disabled={value.length >= MAX_LENGTH}>
          0
        </KeypadButton>
        <KeypadButton variant="special" onClick={() => handleKey('X')} disabled={value.length === 0 || value.length >= MAX_LENGTH || value.includes('X') || value.includes('V')}>
          X
        </KeypadButton>
        <KeypadButton variant="special" onClick={() => handleKey('V')} disabled={value.length === 0 || value.length >= MAX_LENGTH || value.includes('X') || value.includes('V')}>
          V
        </KeypadButton>
        <KeypadButton onClick={() => handleKey('backspace')} variant="danger">
          <DeleteIcon size={20} className="mx-auto" />
        </KeypadButton>
      </div>
      <div>
        <KeypadButton onClick={() => handleKey('clear')} variant="danger" className="w-full">
          Clear
        </KeypadButton>
      </div>
    </div>;
}
function KeypadButton({
  children,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false
}) {
  return <motion.button onClick={onClick} whileHover={disabled ? {} : {
    scale: 1.05
  }} whileTap={disabled ? {} : {
    scale: 0.95
  }} className={`
        relative overflow-hidden p-4 rounded-xl text-xl font-medium
        transition-all duration-150
        ${disabled ? 'bg-gray-800/50 text-gray-600 cursor-not-allowed' : variant === 'primary' ? 'bg-gradient-to-br from-gray-700 to-gray-800 text-white shadow-lg hover:shadow-xl' : variant === 'special' ? 'bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-lg hover:shadow-xl shadow-blue-500/20 ring-1 ring-blue-500/50' : variant === 'danger' ? 'bg-gradient-to-br from-red-700 to-red-800 text-white shadow-lg hover:shadow-xl shadow-red-500/20' : 'bg-gradient-to-br from-gray-600 to-gray-700 text-white shadow-lg hover:shadow-xl'}
        ${className}
      `} disabled={disabled}>
      <motion.span initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <span className="relative z-10">{children}</span>
    </motion.button>;
}