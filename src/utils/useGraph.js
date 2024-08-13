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

  return chartData.flatMap((chart, chartIndex) => {
    const { metrics, data } = chart;
    if (metrics) {
      return metrics.map((metric, metricIndex) => (
        <GraphRenderer
          key={`${chartIndex}-${metricIndex}`}
          chart={{ ...chart, metric }}
          chartIndex={`${chartIndex}-${metricIndex}`}
        />
      ));
    } else {
      return Object.keys(data.value).map((item, itemIndex) => (
        <GraphRenderer
          key={`${chartIndex}-${itemIndex}`}
          chart={{ ...chart, item }}
          chartIndex={`${chartIndex}-${itemIndex}`}
        />
      ));
    }
  });
}

export default useGraph;