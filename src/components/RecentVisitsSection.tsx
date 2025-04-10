import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Filter, Search, Calendar } from 'lucide-react';
export function RecentVisitsSection({
  visits,
  onVisitClick
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReason, setSelectedReason] = useState('');
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });
  const filteredVisits = visits.filter(visit => {
    const matchesSearch = visit.name.toLowerCase().includes(searchQuery.toLowerCase()) || visit.reason.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesReason = selectedReason ? visit.reason === selectedReason : true;
    const matchesDate = dateRange.start && dateRange.end ? new Date(visit.lastVisit) >= new Date(dateRange.start) && new Date(visit.lastVisit) <= new Date(dateRange.end) : true;
    return matchesSearch && matchesReason && matchesDate;
  });
  const uniqueReasons = [...new Set(visits.map(visit => visit.reason))];
  return <div className="bg-gray-800/90 backdrop-blur-xl rounded-xl p-6 border border-blue-500/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Recent Visits</h3>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Calendar size={20} className="text-gray-400" />
            <input type="date" value={dateRange.start} onChange={e => setDateRange(prev => ({
            ...prev,
            start: e.target.value
          }))} className="px-3 py-1 bg-gray-900/50 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <span className="text-gray-400">to</span>
            <input type="date" value={dateRange.end} onChange={e => setDateRange(prev => ({
            ...prev,
            end: e.target.value
          }))} className="px-3 py-1 bg-gray-900/50 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="relative">
            <Filter size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select value={selectedReason} onChange={e => setSelectedReason(e.target.value)} className="pl-10 pr-4 py-1 bg-gray-900/50 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">All Reasons</option>
              {uniqueReasons.map(reason => <option key={reason} value={reason}>
                  {reason}
                </option>)}
            </select>
          </div>
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10 pr-4 py-1 bg-gray-900/50 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Search visits..." />
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {filteredVisits.map(visit => <motion.div key={visit.id} initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} className="p-4 bg-gray-900/50 rounded-xl border border-gray-700 hover:border-blue-500/30 transition-colors cursor-pointer" onClick={() => onVisitClick(visit)}>
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">{visit.name}</h4>
                <p className="text-sm text-gray-400">{visit.reason}</p>
              </div>
              <div className="flex items-center space-x-3">
                {visit.hasComplaint && <span className="px-2 py-1 bg-red-500/20 border border-red-500/30 rounded-full text-red-400 text-sm flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    Complaint
                  </span>}
                <span className="text-sm text-gray-400">{visit.time}</span>
              </div>
            </div>
          </motion.div>)}
      </div>
    </div>;
}