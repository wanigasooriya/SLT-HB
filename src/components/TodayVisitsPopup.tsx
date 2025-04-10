import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, TrendingUpIcon, Clock } from 'lucide-react';
export function TodayVisitsPopup({
  isOpen,
  onClose,
  data
}) {
  if (!isOpen) return null;
  const topReasons = Object.entries(data.visits.reduce((acc, visit) => {
    acc[visit.reason] = (acc[visit.reason] || 0) + 1;
    return acc;
  }, {})).sort(([, a], [, b]) => b - a);
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
      }} onClick={e => e.stopPropagation()} className="bg-gray-800 rounded-2xl w-full max-w-2xl border border-blue-500/20 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold flex items-center">
                <Users className="mr-2" />
                Today's Visits
              </h3>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>
          </div>
          <div className="p-6 space-y-6">
            {/* Summary Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700">
                <p className="text-sm text-gray-400">Total Visits</p>
                <p className="text-2xl font-semibold">{data.visits.length}</p>
              </div>
              <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700">
                <p className="text-sm text-gray-400">Complaints</p>
                <p className="text-2xl font-semibold">
                  {data.visits.filter(v => v.hasComplaint).length}
                </p>
              </div>
            </div>
            {/* Top Reasons */}
            <div>
              <h4 className="text-lg font-semibold mb-3 flex items-center">
                <TrendingUpIcon size={20} className="text-green-400 mr-2" />
                Most Common Reasons
              </h4>
              <div className="space-y-2">
                {topReasons.map(([reason, count]) => <div key={reason} className="bg-gray-900/50 p-3 rounded-lg border border-gray-700 flex justify-between items-center">
                    <span>{reason}</span>
                    <span className="text-sm bg-gray-800 px-2 py-1 rounded-full">
                      {count} visits
                    </span>
                  </div>)}
              </div>
            </div>
            {/* Recent Visits Timeline */}
            <div>
              <h4 className="text-lg font-semibold mb-3 flex items-center">
                <Clock size={20} className="text-blue-400 mr-2" />
                Visit Timeline
              </h4>
              <div className="space-y-3">
                {data.visits.map((visit, index) => <div key={index} className="bg-gray-900/50 p-3 rounded-lg border border-gray-700">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{visit.name}</p>
                        <p className="text-sm text-gray-400">{visit.reason}</p>
                      </div>
                      <span className="text-sm bg-gray-800 px-2 py-1 rounded-full">
                        {visit.time}
                      </span>
                    </div>
                  </div>)}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>;
}