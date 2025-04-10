import React from 'react';
import { motion } from 'framer-motion';
import { Users, TrendingUp, Clock, AlertCircle, CheckCircle, Calendar } from 'lucide-react';
export function SummaryPanel({
  period = 'today',
  data
}) {
  const periodLabels = {
    today: "Today's",
    week: "This Week's",
    month: "This Month's"
  };
  return <div className="bg-gray-800/90 backdrop-blur-xl rounded-xl p-6 border border-blue-500/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold flex items-center space-x-2">
          <TrendingUp className="text-blue-400" size={20} />
          <span>{periodLabels[period]} Summary</span>
        </h3>
        <span className="text-sm text-gray-400">
          {new Date().toLocaleDateString()}
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Total Visits</span>
            <Users size={18} className="text-blue-400" />
          </div>
          <p className="text-2xl font-bold">{data.totalVisits}</p>
          <div className="mt-2 flex items-center space-x-1 text-sm">
            <TrendingUp size={14} className="text-green-400" />
            <span className="text-green-400">+{data.visitIncrease}%</span>
            <span className="text-gray-400">vs. previous {period}</span>
          </div>
        </div>
        <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Complaints</span>
            <AlertCircle size={18} className="text-red-400" />
          </div>
          <p className="text-2xl font-bold">{data.complaints}</p>
          <div className="mt-2 text-sm text-gray-400">
            {data.resolvedComplaints} resolved
          </div>
        </div>
        <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Average Time</span>
            <Clock size={18} className="text-purple-400" />
          </div>
          <p className="text-2xl font-bold">{data.averageTime} min</p>
          <div className="mt-2 text-sm text-gray-400">per visit</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm text-gray-400 mb-3">Most Common Reasons</h4>
          <div className="space-y-2">
            {data.topReasons.map((reason, index) => <div key={index} className="bg-gray-900/50 p-3 rounded-lg border border-gray-700 flex justify-between items-center">
                <span>{reason.name}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm bg-gray-800 px-2 py-1 rounded-full">
                    {reason.count} visits
                  </span>
                  <span className="text-xs text-gray-400">
                    ({reason.percentage}%)
                  </span>
                </div>
              </div>)}
          </div>
        </div>
        <div>
          <h4 className="text-sm text-gray-400 mb-3">Peak Hours</h4>
          <div className="space-y-2">
            {data.peakHours.map((hour, index) => <div key={index} className="bg-gray-900/50 p-3 rounded-lg border border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <span>{hour.time}</span>
                  <span className="text-sm bg-gray-800 px-2 py-1 rounded-full">
                    {hour.visits} visits
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1.5">
                  <div className="bg-blue-500 h-1.5 rounded-full" style={{
                width: `${hour.percentage}%`
              }} />
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </div>;
}