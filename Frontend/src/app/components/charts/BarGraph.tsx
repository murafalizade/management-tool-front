import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { MONTHS } from '../../constants/months';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
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

const labels = MONTHS;

export const data = {
  labels: labels.map((label) => label.name),
  datasets: [
    {
      label: 'Gəlir',
      data: [1000, 1200, 800, 1500, 1100],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Çıxılan',
      data: [1000, 1200, 800, 1500, 1100],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export function BarChart() {
  return <Bar options={options} style={{width:"700px",height:"700px"}} data={data} />;
}
