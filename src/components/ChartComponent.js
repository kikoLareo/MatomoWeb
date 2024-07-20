import React from 'react';
import { Line } from 'react-chartjs-2';

function ChartComponent({ data, title }) {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: title,
        data: Object.values(data).map((item) => item.nb_plays || 0),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
      },
    ],
  };

  return (
    <div>
      <h3>{title}</h3>
      <Line data={chartData} />
    </div>
  );
}

export default ChartComponent;
