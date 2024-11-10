'use client'

import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js'
import { useTheme } from 'next-themes'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const SalesPerformance: React.FC = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Sales Performance',
        data: [30, 45, 60, 50, 70, 80, 60, 75, 85, 90, 100, 95],
        backgroundColor: isDark
          ? 'rgba(128, 0, 128, 0.6)' 
          : 'rgba(128, 0, 128, 0.3)',
        borderColor: 'rgba(128, 0, 128, 1)',
        borderWidth: 1
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: isDark ? '#E5E7EB' : 'black'
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: isDark ? '#E5E7EB' : 'black'
        },
        grid: {
          display: false
        }
      },
      y: {
        ticks: {
          color: isDark ? '#E5E7EB' : 'black'
        },
        grid: {
          color: isDark ? '#444444' : '#E5E7EB'
        }
      }
    }
  }

  return (
    <div className="w-full p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Sales Performance</h2>
      <Bar data={data} options={options} />
    </div>
  )
}

export default SalesPerformance
