// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { fetchData } from '../api';
import { mediaAnalyticsConfig } from '../modules/mediaAnalytics/mediaAnalytics';
import ChartComponent from './ChartComponent';
import SelectGraphs from './SelectGraphs';

const graphOptions = [
  'get',
  'getCurrentNumPlays',
  'getCurrentSumTimeSpent',
  'getCurrentMostPlays',
  'getVideoResources',
  'getAudioResources',
  'getVideoTitles',
  'getAudioTitles',
  'getGroupedVideoResources',
  'getGroupedAudioResources',
  'getVideoHours',
  'getAudioHours',
  'getVideoResolutions',
  'getPlayers'
];

function Dashboard() {
  const [chartsData, setChartsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedGraphs, setSelectedGraphs] = useState([]);

  useEffect(() => {
    const fetchDataForCharts = async () => {
      setLoading(true);
      try {
        const idSite = 2; // Example idSite

        const dataPromises = selectedGraphs.map(async (functionName) => {
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

    if (selectedGraphs.length > 0) {
      fetchDataForCharts();
    }
  }, [selectedGraphs]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <SelectGraphs
        options={graphOptions}
        selectedOptions={selectedGraphs}
        onChange={setSelectedGraphs}
      />
      {chartsData.map(chart => (
        <ChartComponent key={chart.key} data={chart.data} title={chart.key} />
      ))}
    </div>
  );
}

export default Dashboard;
