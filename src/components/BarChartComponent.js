import React from 'react';
import { Bar } from 'react-chartjs-2';

// src/components/BarChartComponent.js

const BarChartComponent = ({ labels, data, title }) => {
    console.log('Rendering BarChartComponent:', { labels, data, title });
    const chartData = {
        labels,
        datasets: [
            {
                label: title,
                data,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
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
        <div className="bar-chart">
            <h2>{title}</h2>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default BarChartComponent;