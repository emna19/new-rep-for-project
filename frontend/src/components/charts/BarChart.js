import { Line } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

export default function BarChart({chartData}) {

    const options = {
        responsive: true,
        plugins: {
        title: {
            display: true,
            text: 'Impression statistics'
        },
        },
        interaction: {
        mode: 'index',
        intersect: false
        },
        scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Days'
          }
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Impressions'
          }
        }
      }}

    return (
        <Line data={chartData} options={options} />
    )
}