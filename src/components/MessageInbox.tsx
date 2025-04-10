import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, MessageCircle, Clock, CheckCircle, ChevronRight, Users } from 'lucide-react';
export function MessageInbox({
  isOpen,
  onClose,
  messages
}) {
  const [selectedMessage, setSelectedMessage] = useState(null);
  if (!isOpen) return null;
  return <AnimatePresence>
      <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} exit={{
      opacity: 0
    }} className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
        <motion.div initial={{
        scale: 0.95,
        opacity: 0
      }} animate={{
        scale: 1,
        opacity: 1
      }} exit={{
        scale: 0.95,
        opacity: 0
      }} onClick={e => e.stopPropagation()} className="bg-gray-800 rounded-2xl w-full max-w-2xl border border-blue-500/20 overflow-hidden max-h-[90vh]">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 sticky top-0">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <MessageCircle className="text-blue-200" size={24} />
                <h3 className="text-xl font-bold">Complaint Messages</h3>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>
          </div>
          <div className="divide-y divide-gray-700">
            {messages.map((message, index) => <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: index * 0.1
          }} key={message.id} className="p-4 hover:bg-gray-700/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-sm">
                        <AlertCircle size={14} className="mr-1" />
                        {message.type}
                      </span>
                      <span className="flex items-center text-sm text-gray-400">
                        <Clock size={14} className="mr-1" />
                        {message.time}
                      </span>
                    </div>
                    <h4 className="font-medium mb-1">{message.customerName}</h4>
                    <p className="text-sm text-gray-400">{message.message}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full ${message.status === 'resolved' ? 'bg-green-500/20 border-green-500/30 text-green-400' : 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400'} border`}>
                          {message.status === 'resolved' ? <CheckCircle size={14} className="mr-1" /> : <Clock size={14} className="mr-1" />}
                          {message.status}
                        </span>
                      </div>
                      <button className="p-2 hover:bg-gray-600/50 rounded-lg transition-colors text-blue-400 flex items-center text-sm">
                        View Details
                        <ChevronRight size={16} className="ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
                {message.showDetails && <motion.div initial={{
              opacity: 0,
              height: 0
            }} animate={{
              opacity: 1,
              height: 'auto'
            }} exit={{
              opacity: 0,
              height: 0
            }} className="mt-4 space-y-4">
                    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                      <h4 className="text-sm text-gray-400 mb-2">
                        Customer Details
                      </h4>
                      <div className="space-y-2">
                        <p className="text-sm">
                          <span className="text-gray-400">ID:</span>{' '}
                          {message.customerId}
                        </p>
                        <p className="text-sm">
                          <span className="text-gray-400">Contact:</span>{' '}
                          {message.customerContact}
                        </p>
                      </div>
                    </div>
                    <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
                      <h4 className="text-sm text-gray-400 mb-2">
                        Complaint Details
                      </h4>
                      <p className="text-sm whitespace-pre-line">
                        {message.details}
                      </p>
                    </div>
                    {message.status === 'pending' && <div className="flex justify-end space-x-3">
                        <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm">
                          Mark as Resolved
                        </button>
                        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm">
                          Assign Technician
                        </button>
                      </div>}
                  </motion.div>}
              </motion.div>)}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>;
}