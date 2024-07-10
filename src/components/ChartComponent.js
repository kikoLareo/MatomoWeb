// src/components/ChartComponent.js
import React from 'react';
import { Bar } from 'react-chartjs-2';

const ChartComponent = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.title),
    datasets: [
      {
        label: 'Example Data',
        data: data.map(item => item.id),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div>
      <Bar data={chartData} />
    </div>
  );
};

export default ChartComponent;
