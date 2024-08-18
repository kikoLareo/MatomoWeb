// src/components/MultiChartComponent.js
import React from 'react';
import { Line } from 'react-chartjs-2';

const MultiChartComponent = ({ datasets, labels, title, loading }) => {
  if (loading) {
    return (
      <div className="skeleton-wrapper">
        <div className="skeleton-title"></div>
        <div className="skeleton-chart"></div>
      </div>
    );
  }

  const chartData = {
    labels,
    datasets: datasets.map((dataset, index) => ({
      label: dataset.title,
      data: dataset.data,
      fill: false,
      backgroundColor: dataset.color || `rgba(75, 192, 192, ${0.6 - index * 0.1})`,
      borderColor: dataset.color || `rgba(75, 192, 192, ${1 - index * 0.1})`,
    })),
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
    <div className="multigraph">
      <h2>{title}</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default MultiChartComponent;
