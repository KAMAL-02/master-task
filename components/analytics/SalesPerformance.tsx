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
        display: true,
        position: 'top' as const
      }
    },
    scales: {
      x: {
        title: {
          display: true,
        },
        grid: {
          display: false
        }
      },
      y: {
        title: {
          display: true,
        },
        beginAtZero: true,
        grid: {
          color: 'rgba(200, 200, 200, 0.2)' // Light grid lines for better readability
        }
      }
    }
  }

  return (
    <div className="p-4 m-4 bg-white rounded-lg shadow-md md:min-h-[380px]">
      <h2 className="text-lg font-semibold mb-4">Sales Performance</h2>
      <Bar data={data} options={options} />
    </div>
  )
}

export default SalesPerformance
