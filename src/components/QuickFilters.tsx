import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, LineChart } from 'lucide-react';
export function QuickFilters({
  onFilterChange,
  currentFilter,
  stats,
  onPeriodClick
}) {
  const filters = [{
    id: 'today',
    label: 'Today',
    count: stats.today,
    icon: <Clock className="text-blue-400" size={20} />
  }, {
    id: 'week',
    label: 'This Week',
    count: stats.week,
    icon: <Calendar className="text-green-400" size={20} />
  }, {
    id: 'month',
    label: 'This Months',
    count: stats.month,
    icon: <Calendar className="text-yellow-400" size={20} />
  }, {
    id: 'year',
    label: 'This Year',
    count: stats.year,
    icon: <Calendar className="text-purple-400" size={20} />
  }];
  return <div className="grid grid-cols-4 gap-4 mb-6">
      {filters.map(filter => <motion.button key={filter.id} whileHover={{
      scale: 1.02
    }} whileTap={{
      scale: 0.98
    }} onClick={() => {
      onFilterChange(filter.id);
      onPeriodClick(filter.id);
    }} className={`p-4 rounded-xl border transition-colors cursor-pointer
            ${currentFilter === filter.id ? 'bg-blue-600/20 border-blue-500/50' : 'bg-gray-800/50 border-gray-700/50 hover:border-gray-600'}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">{filter.label}</span>
            {filter.icon}
          </div>
          <p className="text-2xl font-bold">{filter.count}</p>
        </motion.button>)}
    </div>;
}