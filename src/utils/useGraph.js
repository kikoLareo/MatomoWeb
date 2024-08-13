// src/utils/useGraph.js
import React, { useEffect, useState } from 'react';
import { fetchChartData } from './fetchChartData';
import GraphRenderer from './GraphRenderer';

function useGraph(charts, idSite) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchChartData(charts, idSite);
      setChartData(data);
    };
    fetchData();
  }, [idSite, charts]);

  if (!chartData || chartData.length === 0) {
    return <p>Loading...</p>;
  }

  return chartData.map((chart, chartIndex) => (
    <GraphRenderer key={chartIndex} chart={chart} chartIndex={chartIndex} />
  ));
}

export default useGraph;