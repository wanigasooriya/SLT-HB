import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, Users, Calendar, Clock } from 'lucide-react';
export function VisitSummaryPopup({
  isOpen,
  onClose,
  data,
  period
}) {
  if (!isOpen) return null;
  const periodLabels = {
    today: "Today's",
    week: "This Week's",
    month: "This Month's",
    year: "This Year's"
  };
  const totalVisits = data.length;
  const reasonCounts = data.reduce((acc, visit) => {
    acc[visit.reason] = (acc[visit.reason] || 0) + 1;
    return acc;
  }, {});
  const topReasons = Object.entries(reasonCounts).sort(([, a], [, b]) => b - a).slice(0, 5);
  const complaintsCount = data.filter(visit => visit.hasComplaint).length;
  const monthlyDistribution = data.reduce((acc, visit) => {
    const month = new Date(visit.lastVisit).getMonth();
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});
  const renderPeriodSpecificStats = () => {
    switch (period) {
      case 'year':
        return <>
            <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700 mb-6">
              <h4 className="text-lg font-semibold mb-3">
                Monthly Distribution
              </h4>
              <div className="grid grid-cols-3 gap-4">
                {Array.from({
                length: 12
              }, (_, i) => <div key={i} className="text-center p-2 bg-gray-800/50 rounded-lg">
                      <span className="text-sm text-gray-400">
                        {new Date(0, i).toLocaleString('default', {
                    month: 'short'
                  })}
                      </span>
                      <p className="text-lg font-semibold">
                        {monthlyDistribution[i] || 0}
                      </p>
                    </div>)}
              </div>
            </div>
          </>;
      case 'today':
        return <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700 mb-6">
            <h4 className="text-lg font-semibold mb-3">Average Visit Time</h4>
            <p className="text-2xl font-bold">15 min</p>
          </div>;
      default:
        return null;
    }
  };
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
              <div className="flex items-center space-x-3">
                <Calendar className="text-blue-200" size={24} />
                <h3 className="text-xl font-bold">
                  {periodLabels[period]} Summary
                </h3>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Total Visits</span>
                  <Users size={18} className="text-blue-400" />
                </div>
                <p className="text-2xl font-bold">{totalVisits}</p>
              </div>
              <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Complaints</span>
                  <Users size={18} className="text-red-400" />
                </div>
                <p className="text-2xl font-bold">{complaintsCount}</p>
              </div>
            </div>
            {renderPeriodSpecificStats()}
            <div>
              <h4 className="text-lg font-semibold mb-3 flex items-center">
                <TrendingUp size={20} className="text-green-400 mr-2" />
                Most Common Reasons
              </h4>
              <div className="space-y-2">
                {topReasons.map(([reason, count]) => <div key={reason} className="bg-gray-900/50 p-3 rounded-lg border border-gray-700 flex justify-between items-center">
                    <span>{reason}</span>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm bg-gray-800 px-2 py-1 rounded-full">
                        {count} visits
                      </span>
                      <span className="text-sm text-gray-400">
                        ({Math.round(count / totalVisits * 100)}%)
                      </span>
                    </div>
                  </div>)}
              </div>
            </div>
            {period === 'today' && <div>
                <h4 className="text-lg font-semibold mb-3 flex items-center">
                  <Clock size={20} className="text-blue-400 mr-2" />
                  Recent Visits
                </h4>
                <div className="space-y-3 max-h-[300px] overflow-y-auto">
                  {data.map((visit, index) => <motion.div key={index} initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: index * 0.05
              }} className="bg-gray-900/50 p-3 rounded-lg border border-gray-700">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{visit.name}</p>
                          <p className="text-sm text-gray-400">
                            {visit.reason}
                          </p>
                        </div>
                        <span className="text-sm bg-gray-800 px-2 py-1 rounded-full">
                          {visit.time}
                        </span>
                      </div>
                    </motion.div>)}
                </div>
              </div>}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>;
}