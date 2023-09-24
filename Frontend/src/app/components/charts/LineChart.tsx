import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { MONTHS } from '../../constants/months';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio:false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Aylar üzrə verilən ümumi məbləğ',
    },
  },
};

const labels = MONTHS

export const data = {
  labels: labels.map((label) => label.name),
  datasets: [
    {
      label: 'Ümumi məbləğ',
      data: [1000, 1200, 800, 1500, 1100],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    }
  ],
};

export function LineChart() {
  return <Line style={{height:"360px", width:"360px"}} options={options} data={data} />;
}
