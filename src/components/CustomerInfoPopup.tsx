import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Calendar, AlertCircle, UserIcon, PhoneIcon, HistoryIcon, HashIcon, TrendingUpIcon, RepeatIcon } from 'lucide-react';
export function CustomerInfoPopup({
  isOpen,
  onClose,
  customer
}) {
  if (!isOpen || !customer) return null;
  const visitStats = {
    weekly: customer.recentActivity.filter(a => new Date(a.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length,
    monthly: customer.recentActivity.filter(a => new Date(a.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)).length,
    total: customer.totalVisits
  };
  const reasonCounts = customer.recentActivity.reduce((acc, activity) => {
    const reason = activity.action;
    acc[reason] = (acc[reason] || 0) + 1;
    return acc;
  }, {});
  const topReasons = Object.entries(reasonCounts).sort(([, a], [, b]) => b - a).slice(0, 3);
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
      }} onClick={e => e.stopPropagation()} className="bg-gray-800 rounded-2xl w-full max-w-2xl border border-blue-500/20 overflow-hidden max-h-[90vh] overflow-y-auto">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 sticky top-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <UserIcon size={24} className="text-blue-200" />
                <div>
                  <h3 className="text-xl font-bold">{customer.name}</h3>
                  <div className="flex items-center space-x-2 text-blue-200 text-sm mt-1">
                    <HashIcon size={14} />
                    <span>{customer.id}</span>
                  </div>
                </div>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <InfoCard icon={<PhoneIcon size={20} className="text-blue-400" />} title="Contact" value={customer.contact} />
              <InfoCard icon={<HashIcon size={20} className="text-purple-400" />} title="SLT Number" value={customer.id} />
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3 flex items-center">
                <TrendingUpIcon size={20} className="text-green-400 mr-2" />
                Visit Statistics
              </h4>
              <div className="grid grid-cols-3 gap-4">
                <StatCard title="This Week" value={visitStats.weekly} />
                <StatCard title="This Month" value={visitStats.monthly} />
                <StatCard title="Total" value={visitStats.total} />
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3 flex items-center">
                <RepeatIcon size={20} className="text-yellow-400 mr-2" />
                Most Frequent Reasons
              </h4>
              <div className="space-y-2">
                {topReasons.map(([reason, count], index) => <div key={reason} className="bg-gray-900/50 p-3 rounded-lg border border-gray-700 flex justify-between items-center">
                    <span>{reason}</span>
                    <span className="text-sm bg-gray-800 px-2 py-1 rounded-full">
                      {count} visits
                    </span>
                  </div>)}
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 flex items-center">
                <HistoryIcon size={20} className="text-blue-400 mr-2" />
                Recent Activity
              </h4>
              <div className="space-y-4">
                {customer.recentActivity.slice(0, 10).map((activity, index) => <motion.div initial={{
                opacity: 0,
                y: 20
              }} animate={{
                opacity: 1,
                y: 0
              }} transition={{
                delay: index * 0.1
              }} key={index} className="relative pl-6 pb-4 border-l border-gray-700">
                    <div className="absolute left-0 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-500" />
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="text-sm text-gray-400">
                            {activity.date}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(activity.date).toLocaleTimeString()}
                          </p>
                        </div>
                        <p className="font-medium mt-1">{activity.action}</p>
                        {activity.details && <p className="text-sm text-gray-400 mt-1">
                            {activity.details}
                          </p>}
                      </div>
                      {activity.action.toLowerCase().includes('complaint') && <span className="inline-flex items-center px-2 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-sm">
                          <AlertCircle size={14} className="mr-1" />
                          Complaint
                        </span>}
                    </div>
                  </motion.div>)}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>;
}
function InfoCard({
  icon,
  title,
  value
}) {
  return <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700">
      <div className="flex items-center space-x-2 mb-2">
        {icon}
        <p className="text-sm text-gray-400">{title}</p>
      </div>
      <p className="text-lg font-medium">{value}</p>
    </div>;
}
function StatCard({
  title,
  value
}) {
  return <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-700 text-center">
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-xl font-semibold mt-1">{value}</p>
    </div>;
}