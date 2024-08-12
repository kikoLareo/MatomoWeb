// src/components/PieChartComponent.js
import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChartComponent = ({ labels, data, title, description }) => {
  let others = 0;
  const totalVisits = data.reduce((acc, value) => acc + value, 0);

  const filteredData = [];
  const filteredLabels = [];

  data.forEach((value, index) => {
    const per = ((value / totalVisits) * 100).toFixed(2);
    if (per < 1) {
      others += parseFloat(per);
    } else {
      filteredData.push(parseFloat(per));
      filteredLabels.push(labels[index]);
    }
  });

  if (others > 0) {
    filteredLabels.push("Otros");
    filteredData.push(others);
  }

  const chartData = {
    labels: filteredLabels,
    datasets: [
      {
        data: filteredData,
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
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

  const options = {
    hoverOffset: 100,
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const currentValue = tooltipItem.raw;
            return `${tooltipItem.label}: ${currentValue}%`;
          },
        },
      },
    },
    animation: {
      animateScale: true,
    },
  };

  return (
    <div className="pie-chart">
      <div className='chart-description'>
        <h2>{title}</h2>
      </div>
      <div style={{ width: 'auto', height: '40vh', margin: 'auto' }}>
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default PieChartComponent;