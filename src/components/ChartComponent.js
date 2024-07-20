import React from 'react';
import { Line } from 'react-chartjs-2';

const ChartComponent = ({ data }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        title: data.title,
        label: 'Metrics',
        data: Object.values(data).map(item => item.nb_plays || 0),
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
  <div class="graph">
    <h2> </h2>
    <Line data={chartData} options={options} />
    </div>
    );
};

export default ChartComponent;
