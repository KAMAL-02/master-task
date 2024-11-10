'use client'

import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js'
import { useTheme } from 'next-themes'

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend)

const UserActivity: React.FC = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const data = {
    labels: ['Day1', 'Day3', 'Day5', 'Day7', 'Day9'],
    datasets: [
      {
        label: 'User Activity',
        data: [30, 70, 20, 40, 10],
        fill: false,
        borderColor: '#42A5F5',
        tension: 0.1
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
          color: '#E5E7EB'
        }
      },
      y: {
        ticks: {
          color: isDark ? '#E5E7EB' : 'black' 
        },
        grid: {
          color: '#E5E7EB'
        }
      }
    }
  }

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-200">User Activity</h2>
      <Line data={data} options={options} />
    </div>
  )
}

export default UserActivity