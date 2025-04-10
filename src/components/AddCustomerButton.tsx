import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus } from 'lucide-react';
import { CustomerRegistrationForm } from './CustomerRegistrationForm';
export function AddCustomerButton() {
  const [showForm, setShowForm] = useState(false);
  return <>
      <motion.button whileHover={{
      scale: 1.05
    }} whileTap={{
      scale: 0.95
    }} onClick={() => setShowForm(true)} className="px-4 py-2 bg-gray-800/90 backdrop-blur-sm rounded-lg 
                   border border-blue-500/20 flex items-center space-x-2 
                   hover:bg-gray-700/90 transition-colors duration-200">
        <UserPlus size={20} className="text-blue-400" />
        <span>Add Customer</span>
      </motion.button>
      <AnimatePresence>
        {showForm && <CustomerRegistrationForm isOpen={showForm} onClose={() => setShowForm(false)} />}
      </AnimatePresence>
    </>;
}