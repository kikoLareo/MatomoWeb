// src/components/PieChartComponent.js
import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChartComponent = ({ data }) => {
    console.log(data);
  // Filter out items with nb_visits equal to 0
  const filteredData = data.filter(item => item.nb_visits > 0);

  // Extract labels and values
  const labels = filteredData.map(item => item.label);
  const values = filteredData.map(item => item.nb_visits);

  // Calculate total visits
  const totalVisits = values.reduce((acc, value) => acc + value, 0);

  // Calculate percentages
  const percentages = values.map(value => ((value / totalVisits) * 100).toFixed(2));

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: percentages,
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
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const currentValue = tooltipItem.raw;
            return `${tooltipItem.label}: ${currentValue}%`;
          },
        },
      },
    },
  };

  return (
    <div className="pie-chart">
      <h2>Pie Chart</h2>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChartComponent;