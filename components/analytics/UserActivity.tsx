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

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend)

const UserActivity: React.FC = () => {
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
          color: 'black' // Light mode color for legend text
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: 'black' // Light mode color for x-axis labels
        },
        grid: {
          color: '#E5E7EB' // Light mode grid color (gray-200)
        }
      },
      y: {
        ticks: {
          color: 'black' // Light mode color for y-axis labels
        },
        grid: {
          color: '#E5E7EB' // Light mode grid color (gray-200)
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
