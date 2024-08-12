// src/components/PieChartComponent.js
import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChartComponent = ({ labels, data, title, description }) => {
  var others = 0;
  // Calculate total visits
  const totalVisits = data.reduce((acc, value) => acc + value, 0);

  // Calculate percentages
  const percentages = data.map(value => {
    var per = ((value / totalVisits) * 100).toFixed(2);
    if(per < 1){
      others += per;
      data = data.filter(item => item !== value);
      return 0;
    }else{
      return per;
    }
  });
  
  if(others > 0){
    labels.push("Otros");
  }


  const chartData = {
    labels: labels,
    datasets: [
      {
        data: percentages.filter(item => item !== 0).concat(others),
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
        position: 'left',
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
    animation:{
      animateScale: true,
    },
  };

  return (
    <div className="pie-chart">
      <div className='chart-description'>
        <h2>{title}</h2>
      </div>
      <div style={{width: '100%', height: '40vh', margin: 'auto'}}>
        <Pie data={chartData} options={options} />
      </div>
    
    </div>
  );
};

export default PieChartComponent;