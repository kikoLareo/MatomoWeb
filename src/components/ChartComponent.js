// src/components/ChartComponent.js
import React from 'react';
import { Line } from 'react-chartjs-2';

const ChartComponent = ({ data, labels, title }) => {
  console.log('ChartComponent', data, labels, title);
  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data,
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  const options = {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="graph">
      <h2>{title}</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ChartComponent;