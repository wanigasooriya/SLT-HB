import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale } from 'chart.js';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUpIcon, Calendar } from 'lucide-react';
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale);
export function VisitsPieChart() {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [selectedSlice, setSelectedSlice] = useState(null);
  const periodData = {
    today: [{
      reason: 'Complaint',
      count: 20
    }, {
      reason: 'Bill Payment',
      count: 45
    }, {
      reason: 'New Connection',
      count: 15
    }, {
      reason: 'Technical Support',
      count: 32
    }, {
      reason: 'Plan Upgrade',
      count: 28
    }],
    week: [{
      reason: 'Complaint',
      count: 64
    }, {
      reason: 'Bill Payment',
      count: 156
    }, {
      reason: 'New Connection',
      count: 45
    }, {
      reason: 'Technical Support',
      count: 98
    }, {
      reason: 'Plan Upgrade',
      count: 87
    }],
    month: [{
      reason: 'Complaint',
      count: 287
    }, {
      reason: 'Bill Payment',
      count: 645
    }, {
      reason: 'New Connection',
      count: 234
    }, {
      reason: 'Technical Support',
      count: 423
    }, {
      reason: 'Plan Upgrade',
      count: 345
    }],
    year: [{
      reason: 'Complaint',
      count: 3567
    }, {
      reason: 'Bill Payment',
      count: 7845
    }, {
      reason: 'New Connection',
      count: 2876
    }, {
      reason: 'Technical Support',
      count: 5234
    }, {
      reason: 'Plan Upgrade',
      count: 4123
    }]
  };
  const periods = [{
    id: 'today',
    label: 'Today'
  }, {
    id: 'week',
    label: 'This Week'
  }, {
    id: 'month',
    label: 'This Month'
  }, {
    id: 'year',
    label: 'This Year'
  }];
  const chartData = {
    labels: periodData[selectedPeriod].map(item => item.reason),
    datasets: [{
      data: periodData[selectedPeriod].map(item => item.count),
      backgroundColor: ['rgba(239, 68, 68, 0.8)', 'rgba(59, 130, 246, 0.8)', 'rgba(16, 185, 129, 0.8)', 'rgba(245, 158, 11, 0.8)', 'rgba(139, 92, 246, 0.8)'],
      borderColor: ['rgba(239, 68, 68, 1)', 'rgba(59, 130, 246, 1)', 'rgba(16, 185, 129, 1)', 'rgba(245, 158, 11, 1)', 'rgba(139, 92, 246, 1)'],
      borderWidth: 1
    }]
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: 'rgb(156, 163, 175)',
          padding: 20,
          font: {
            size: 12
          },
          boxWidth: 15
        },
        display: true,
        align: 'center',
        maxWidth: 800
      },
      tooltip: {
        callbacks: {
          label: context => {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = (context.raw / total * 100).toFixed(1);
            return `${context.label}: ${context.raw} (${percentage}%)`;
          }
        }
      }
    }
  };
  return <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold flex items-center">
          <Calendar size={20} className="text-blue-400 mr-2" />
          Visit Reasons
        </h3>
        <div className="flex items-center space-x-2 bg-gray-900/50 rounded-lg p-1">
          {periods.map(period => <motion.button key={period.id} whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }} onClick={() => setSelectedPeriod(period.id)} className={`px-3 py-1 rounded-md transition-colors relative ${selectedPeriod === period.id ? 'text-white' : 'text-gray-400 hover:text-white'}`}>
              {period.label}
              {selectedPeriod === period.id && <motion.div layoutId="activePeriod" className="absolute inset-0 bg-blue-500 rounded-md -z-10" initial={false} transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30
          }} />}
            </motion.button>)}
        </div>
      </div>
      <motion.div key={selectedPeriod} initial={{
      opacity: 0,
      scale: 0.95
    }} animate={{
      opacity: 1,
      scale: 1
    }} transition={{
      duration: 0.3
    }} className="h-[400px] flex items-center justify-center">
        <Pie data={chartData} options={options} />
      </motion.div>
      <div className="mt-6">
        <h4 className="text-sm text-gray-400 mb-3">Summary</h4>
        <div className="grid grid-cols-1 gap-2">
          {periodData[selectedPeriod].map((item, index) => <motion.div key={item.reason} initial={{
          opacity: 0,
          y: 10
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: index * 0.1
        }} className="bg-gray-900/50 p-3 rounded-lg border border-gray-700 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="w-3 h-3 rounded-full" style={{
              backgroundColor: chartData.datasets[0].backgroundColor[index]
            }} />
                <span className="font-medium">{item.reason}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm bg-gray-800 px-2 py-1 rounded-full">
                  {item.count} visits
                </span>
                <span className="text-sm text-gray-400">
                  (
                  {(item.count / periodData[selectedPeriod].reduce((acc, curr) => acc + curr.count, 0) * 100).toFixed(1)}
                  %)
                </span>
              </div>
            </motion.div>)}
        </div>
      </div>
    </div>;
}