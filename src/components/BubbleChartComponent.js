// src/components/BubbleChartComponent.js
import React from 'react';
import { Bubble } from 'react-chartjs-2';

const BubbleChartComponent = ({ data, labels, title }) => {
  console.log('BubbleChartComponent', data, labels, title);
  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data, // data should be an array of objects with x, y, and r properties
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
      <Bubble data={chartData} options={options} />
    </div>
  );
};

export default BubbleChartComponent;