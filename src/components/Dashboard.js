import React, { useEffect, useState } from 'react';
import { fetchData } from '../api';
import { mediaAnalyticsConfig } from '../modules/mediaAnalytics/mediaAnalytics';
import ChartComponent from './ChartComponent';

function Dashboard() {
  const [chartsData, setChartsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCharts, setSelectedCharts] = useState({});

  useEffect(() => {
    const fetchDataForCharts = async () => {
      try {
        const idSite = 2; // Example idSite
        const list = Object.keys(mediaAnalyticsConfig); // Load all functionalities
        
        const dataPromises = list.map(async (functionName) => {
          const data = await fetchData(functionName, idSite, mediaAnalyticsConfig);
          return { key: functionName, data };
        });

        const results = await Promise.all(dataPromises);
        setChartsData(results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataForCharts();
  }, []);

  const handleCheckboxChange = (functionName) => {
    setSelectedCharts((prevSelectedCharts) => ({
      ...prevSelectedCharts,
      [functionName]: !prevSelectedCharts[functionName],
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h2>Select Charts to Display</h2>
        {Object.keys(mediaAnalyticsConfig).map((functionName) => (
          <div key={functionName}>
            <label>
              <input
                type="checkbox"
                checked={!!selectedCharts[functionName]}
                onChange={() => handleCheckboxChange(functionName)}
              />
              {functionName}
            </label>
          </div>
        ))}
      </div>
      <div>
        {chartsData
          .filter((chart) => selectedCharts[chart.key])
          .map((chart) => (
            <ChartComponent key={chart.key} data={chart.data} title={chart.key} />
          ))}
      </div>
    </div>
  );
}

export default Dashboard;
