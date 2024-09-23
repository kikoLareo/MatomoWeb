// src/components/ChartComponent.js
import React from 'react';
import { Line } from 'react-chartjs-2';

const ChartComponent = ({ data, labels, title, metricType, xlabels = true }) => {
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

  if(metricType === 'percentage') {
    chartData.datasets[0].yAxisID = 'percentage';
  }

  if(!xlabels) {
    chartData.labels = [];
  }


  const options = {
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          maxRotation: 45,
          minRotation: 45,
          callback: function (val, index) {
            return index % 3 === 0 ? this.getLabelForValue(val) : '';
          },
        },
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