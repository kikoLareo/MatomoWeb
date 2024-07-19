import React, { useEffect, useState } from 'react';
import { fetchData } from '../api/index';
import { mediaAnalyticsConfig } from '../modules/mediaAnalytics/mediaAnalytics';
import ChartComponent from './ChartComponent';

function Dashboard() {
  const [chartsData, setChartsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataForCharts = async () => {
      try {
        const idSite = 2; // Example idSite
        const list = ["get", "getCurrentNumPlays"]; // Load all functionalities
        
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <div class="graphDashBoard">
      {chartsData.map(chart => (
        <ChartComponent key={chart.key} data={chart.data} title={chart.key} />
      ))}
    </div>
    </div>
  );
}

export default Dashboard;
