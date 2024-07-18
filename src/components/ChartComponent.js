import React from 'react';
import { Bar } from 'react-chartjs-2';

const ChartComponent = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <div>No valid data available</div>;
  }

  const chartData = {
    labels: data.map(item => item.Nombre),
    datasets: [
      {
        label: 'Valor',
        data: data.map(item => item.Data && item.Data[0]?.Valor),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  console.log('Chart Data:', chartData);

  return (
    <div>
      <Bar data={chartData} />
    </div>
  );
};

export default ChartComponent;
