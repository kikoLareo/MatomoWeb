import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Import the full Chart.js bundle

const ChartComponent = ({ data, title }) => {
  const labels = Object.keys(data);
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: title,
        data: labels.map(label => (data[label] && data[label].nb_plays) ? data[label].nb_plays : 0),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Number of Plays'
        }
      }
    }
  };

  return (
    <div>
      <h2>{title}</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ChartComponent;
