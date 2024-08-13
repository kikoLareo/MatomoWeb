// src/utils/useGraph.js
import React, { useEffect, useState } from 'react';
import { fetchChartData } from './fetchChartData';
import GraphRenderer from './GraphRenderer';
import { titles } from './dictionaryMetrics/metricsTitles';

function transformData(data, metrics) {
  const result = {};

    Object.keys(data).forEach(date => {
        if (Array.isArray(data[date])) {
            // If the data for a date is an empty array, keep it as is
            result[date] = [];
        } else {
            // Extract only the desired metrics for the given date
            result[date] = {};
            metrics.forEach(metric => {
                if (data[date].hasOwnProperty(metric)) {
                    result[date][metric] = data[date][metric];
                }
            });
        }
    });

    return result;
};




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
  return charts.map((chart, chartIndex) => {
    const { metrics, data, description, title, type } = chart;
    const formatedData = transformData(data.value, metrics);

    return (
      <div key={chartIndex}>
        <h3>{title}</h3>
        <p>{description}</p>
        {metrics ? (
          metrics.map((metric, metricIndex) => (
          
            <GraphRenderer
              key={`${chartIndex}-${metricIndex}`}
              chart={{
                type,
                data: formatedData[metric],
                title: data.info.columns? data.info.columns[metric] : data.info.metadata? data.info.metadata.metrics[metric]: titles[metric]
                
              }}
              chartIndex={`${chartIndex}-${metricIndex}`}
            />
          ))
        ) : (
          Object.keys(data).map((date, dateIndex) => (
            <GraphRenderer
              key={`${chartIndex}-${dateIndex}`}
              chart={{ ...chart, date }}
              chartIndex={`${chartIndex}-${dateIndex}`}
            />
          ))
        )}
      </div>
    );
  });
}

export default useGraph;