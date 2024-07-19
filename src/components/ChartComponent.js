import React from 'react';
import { Line } from 'react-chartjs-2';

const ChartComponent = ({ data, title }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <div>Datos no disponibles</div>;
  }

  const labels = data.map(item => item.label);
  const values = data.map(item => item.nb_plays);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: title,
        data: values,
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default ChartComponent;
