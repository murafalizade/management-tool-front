import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { IChartProps } from '../../types/IChartProps';

ChartJS.register(ArcElement, Tooltip, Legend);

export function PieChart({labels, data, label}:IChartProps) {
  const option = {
    labels,
    datasets: [
      {
        label,
        data,
        backgroundColor: [
          'lightgreen',
          'red',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

return (
  <Pie data={option}  style={{height:"350px", width:"350px"}} height={"300px"} width={"300px"} options={{maintainAspectRatio:false}} />
)
}
