// app/components/UserActivityChart.tsx

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

// Register required chart components
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
    layout: {
      padding: 0 // Remove extra padding inside the chart
    },
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
        ticks: {
          maxRotation: 0, // Prevents too much rotation
          padding: 2 // Reduces space around x-axis labels
        }
      },
      y: {
        title: {
          display: true,
        },
        beginAtZero: true,
        min: 0, // Ensures the chart doesn’t start below zero
        max: 80, // Sets a maximum closer to the highest data point
        ticks: {
          padding: 2, // Reduces space between y-axis labels and the chart area
          stepSize: 20 // Keeps steps minimal to fit the data range tightly
        }
      }
    }
  }
 //!Todo : max-w-sm max-h-72
  return (
    <div className="p-2 m-4 bg-white rounded-lg shadow-md md:min-h-[380px]">
      <h2 className="text-lg font-semibold mb-2 pl-6">User Activity</h2>
      <Line data={data} options={options} />
    </div>
  )
}

export default UserActivity
