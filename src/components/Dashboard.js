import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChartComponent from './ChartComponent';
import { mediaAnalyticsFunctions } from '../modules/mediaAnalytics/mediaAnalytics';
import { idSiteOptions } from '../config';

const chartOptions = Object.keys(mediaAnalyticsFunctions);

const Dashboard = () => {
  const [selectedCharts, setSelectedCharts] = useState(['get', 'getCurrentNumPlays']);
  const [chartData, setChartData] = useState({});
  const [idSite, setIdSite] = useState(1); // Valor por defecto

  const fetchDataForCharts = async () => {
    try {
      const newChartData = {};
      for (const chartName of selectedCharts) {
        if (mediaAnalyticsFunctions[chartName]) {
          const { url, title } = mediaAnalyticsFunctions[chartName](idSite);
          const response = await axios.get(url);
          newChartData[chartName] = { data: response.data, title };
        }
      }
      setChartData(newChartData);
    } catch (error) {
      console.error('Error fetching data for charts:', error);
    }
  };

  useEffect(() => {
    fetchDataForCharts();
  }, [selectedCharts, idSite]);

  const handleChartSelection = (chartName) => {
    setSelectedCharts((prevCharts) =>
      prevCharts.includes(chartName)
        ? prevCharts.filter((name) => name !== chartName)
        : [...prevCharts, chartName]
    );
  };

  return (
    <div className="dashboard">
      <div className="options">
        <div className="optionsSite">
          <label>
            <h3>Select idSite:</h3>
            <select value={idSite} onChange={(e) => setIdSite(Number(e.target.value))}>
              {Object.entries(idSiteOptions).map(([label, value]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="optionsCharts">
          <h3>Select Charts:</h3>
          <div className="selecter">
            {chartOptions.map((chartName) => (
              <label key={chartName}>
                <input
                  type="checkbox"
                  checked={selectedCharts.includes(chartName)}
                  onChange={() => handleChartSelection(chartName)}
                />
                {mediaAnalyticsFunctions[chartName](idSite).title}
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="graphDashBoard">
        {selectedCharts.map((chartName) => (
          <div key={chartName}>
            <h3>{chartData[chartName]?.title}</h3>
            <ChartComponent data={chartData[chartName]?.data || {}} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
