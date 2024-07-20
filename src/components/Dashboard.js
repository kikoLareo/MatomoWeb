import React, { useState } from 'react';
import axios from 'axios';
import ChartComponent from './ChartComponent';
import { mediaAnalytics } from '../modules/mediaAnalytics/mediaAnalytics';

const Dashboard = () => {
  const [selectedCharts, setSelectedCharts] = useState(['get', 'getCurrentNumPlays']);
  const [chartData, setChartData] = useState({});
  const idSite = 2; // ID del sitio que estás analizando

  const fetchDataForCharts = async () => {
    try {
      const fetchedData = await Promise.all(
        selectedCharts.map(async (chartName) => {
          const url = mediaAnalytics[chartName].func(idSite);
          const response = await axios.get(url);
          return { [chartName]: response.data };
        })
      );
  
      const mergedData = fetchedData.reduce((acc, curr) => ({ ...acc, ...curr }), {});
      setChartData(mergedData);
    } catch (error) {
      console.error('Error fetching data for charts:', error);
    }
  };
  

  const handleChartSelection = (chartName) => {
    setSelectedCharts((prevSelectedCharts) =>
      prevSelectedCharts.includes(chartName)
        ? prevSelectedCharts.filter((name) => name !== chartName)
        : [...prevSelectedCharts, chartName]
    );
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h2>Select Charts to Display</h2>
        {Object.keys(mediaAnalytics).map((chartName) => (
          <div key={chartName}>
            <input
              type="checkbox"
              checked={selectedCharts.includes(chartName)}
              onChange={() => handleChartSelection(chartName)}
            />
            {mediaAnalytics[chartName].title}
          </div>
        ))}
      </div>
      <div class="graphDashBoard">
        {selectedCharts.map((chartName) => (
          <div key={chartName}>
            <h3>{mediaAnalytics[chartName].title}</h3>
            <ChartComponent data={chartData[chartName] || {}} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
