// app/components/SalesPerformance.tsx

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

// Register required chart components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const SalesPerformance: React.FC = () => {
  // Sample data for monthly sales
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Sales Performance',
        data: [30, 45, 60, 50, 70, 80, 60, 75, 85, 90, 100, 95],
        backgroundColor: 'rgba(128, 0, 128, 0.6)', // Purplish color with slight transparency
        borderColor: 'rgba(128, 0, 128, 1)', // Solid border in the same color
        borderWidth: 1
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: 'black' // Light mode legend text color
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: 'black' // Light mode x-axis label color
        },
        grid: {
          display: false
        }
      },
      y: {
        ticks: {
          color: 'black' // Light mode y-axis label color
        },
        grid: {
          color: '#E5E7EB' // Light mode grid color (gray-200)
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
