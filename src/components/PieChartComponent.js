// src/components/PieChartComponent.js
import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChartComponent = ({ data }) => {
  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const total = tooltipItem.dataset.data.reduce((acc, value) => acc + value, 0);
            const currentValue = tooltipItem.raw;
            const percentage = ((currentValue / total) * 100).toFixed(2);
            return `${tooltipItem.label}: ${percentage}%`;
          },
        },
      },
    },
  };

  return (
    <div className="pie-chart">
      <h2>Pie Chart</h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChartComponent;