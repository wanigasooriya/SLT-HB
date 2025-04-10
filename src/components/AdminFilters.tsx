import React from 'react';
import { Calendar, Filter, Search } from 'lucide-react';
import { motion } from 'framer-motion';
export function AdminFilters({
  dateRange,
  setDateRange,
  selectedReason,
  setSelectedReason,
  searchQuery,
  setSearchQuery,
  reasons
}) {
  return <div className="mb-6 space-y-4">
      <div className="flex flex-wrap gap-4">
        {/* Date Range Filters */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Calendar size={20} className="text-gray-400" />
            <input type="date" value={dateRange.start} onChange={e => setDateRange(prev => ({
            ...prev,
            start: e.target.value
          }))} className="px-3 py-2 bg-gray-900/50 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <span className="text-gray-400">to</span>
          <input type="date" value={dateRange.end} onChange={e => setDateRange(prev => ({
          ...prev,
          end: e.target.value
        }))} className="px-3 py-2 bg-gray-900/50 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        {/* Reason Filter */}
        <div className="flex items-center space-x-2">
          <Filter size={20} className="text-gray-400" />
          <select value={selectedReason} onChange={e => setSelectedReason(e.target.value)} className="px-3 py-2 bg-gray-900/50 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">All Reasons</option>
            {reasons.map(reason => <option key={reason} value={reason}>
                {reason}
              </option>)}
          </select>
        </div>
        {/* Search Input */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-gray-900/50 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Search visits..." />
        </div>
      </div>
      {/* Active Filters */}
      {(dateRange.start || dateRange.end || selectedReason) && <motion.div initial={{
      opacity: 0,
      y: -10
    }} animate={{
      opacity: 1,
      y: 0
    }} className="flex flex-wrap gap-2">
          {(dateRange.start || dateRange.end) && <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-sm">
              Date: {dateRange.start || 'Start'} to {dateRange.end || 'End'}
            </span>}
          {selectedReason && <span className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-sm">
              Reason: {selectedReason}
            </span>}
        </motion.div>}
    </div>;
}