import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { TrendingUp } from 'lucide-react';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);
export function VisitsLineChart() {
  const [period, setPeriod] = useState('days');
  const data = {
    days: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      datasets: [{
        label: 'Visits',
        data: [156, 145, 198, 156, 132, 98],
        fill: true,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(59, 130, 246)',
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    },
    months: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [{
        label: 'Visits',
        data: [856, 1245, 978, 1432, 1100, 1350, 1560, 1242, 1345, 1432, 1245, 1567],
        fill: true,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(59, 130, 246)',
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    },
    years: {
      labels: ['2020', '2021', '2022', '2023', '2024'],
      datasets: [{
        label: 'Visits',
        data: [9856, 12450, 15978, 18432, 21567],
        fill: true,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(59, 130, 246)',
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    }
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleFont: {
          size: 13
        },
        bodyFont: {
          size: 12
        },
        padding: 12,
        borderColor: 'rgba(59, 130, 246, 0.2)',
        borderWidth: 1,
        callbacks: {
          label: context => `${context.parsed.y} visits`
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          color: 'rgb(156, 163, 175)',
          font: {
            size: 12
          }
        }
      },
      y: {
        grid: {
          color: 'rgba(75, 85, 99, 0.2)',
          drawBorder: false
        },
        ticks: {
          color: 'rgb(156, 163, 175)',
          font: {
            size: 12
          },
          callback: value => `${value}`
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    },
    animation: {
      duration: 1000
    }
  };
  return <div className="bg-gray-800/90 backdrop-blur-xl rounded-xl p-6 border border-blue-500/20 h-[450px] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <TrendingUp className="text-blue-400 mr-2" size={20} />
          Visit Count
        </h3>
        <div className="flex items-center space-x-2 bg-gray-900/50 rounded-lg p-1">
          <motion.button whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }} onClick={() => setPeriod('days')} className={`px-4 py-2 rounded-md transition-all duration-200 
              ${period === 'days' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25' : 'hover:bg-gray-700/50'}`}>
            Days
          </motion.button>
          <motion.button whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }} onClick={() => setPeriod('months')} className={`px-4 py-2 rounded-md transition-all duration-200 
              ${period === 'months' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25' : 'hover:bg-gray-700/50'}`}>
            Months
          </motion.button>
          <motion.button whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }} onClick={() => setPeriod('years')} className={`px-4 py-2 rounded-md transition-all duration-200 
              ${period === 'years' ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25' : 'hover:bg-gray-700/50'}`}>
            Years
          </motion.button>
        </div>
      </div>
      <div className="flex-1">
        <Line options={options} data={data[period]} />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700">
          <p className="text-sm text-gray-400 mb-1">Average Visits</p>
          <p className="text-2xl font-bold">
            {Math.round(data[period].datasets[0].data.reduce((a, b) => a + b, 0) / data[period].datasets[0].data.length)}
          </p>
        </div>
        <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-700">
          <p className="text-sm text-gray-400 mb-1">Peak Visits</p>
          <p className="text-2xl font-bold">
            {Math.max(...data[period].datasets[0].data)}
          </p>
        </div>
      </div>
    </div>;
}