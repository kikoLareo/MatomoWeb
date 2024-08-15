import React, { useEffect, useContext, useState } from 'react';
import { IdSiteContext } from '../contexts/idSiteContext';
import GraphRenderer from './GraphRenderer';
import { titles } from './dictionaryMetrics/metricsTitles';

function useGraph(chartConfig, selectedMetrics) {
  const { idSite } = useContext(IdSiteContext);
  const [charts, setCharts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        chartConfig.forEach(async (chart) => {
          if (chart.getData) {
            await chart.getData(idSite);
          }
        });
          
      } catch (error) {
          console.error("Error fetching data:", error);
      }
  };

  fetchData();
  }, [idSite, chartConfig]);



  useEffect(() => {
    if (!selectedMetrics) {
      setCharts(<p>No charts to render</p>);
      return;
    }



    const renderedCharts = chartConfig.map((chart) => {
      const metrics = selectedMetrics[chart.title] || [];
      if (metrics.length === 0) return null;

      const { data, description, title, type } = chart;
      return (
        <div className="graphGroup" key={chart.title}>
          <h3>{title}</h3>
          <p>{description}</p>
          <div className="graphGrid">
            {metrics.map((metric) => (
              <GraphRenderer
                key={metric}
                chart={{
                  type,
                  labels:  data.value.labels ? data.value.labels : Object.keys(data.value), 
                  data: Object.keys(data.value).map(label => data.value[label]?.[metric] || 0),
                  title: data.info.columns ? data.info.columns[metric] : data.info.metadata ? data.info.metadata.metrics[metric] : titles[metric]
                }}
              />
            ))}
          </div>
        </div>
      );
    }).filter(Boolean);

    setCharts(renderedCharts);
  }, [selectedMetrics, idSite, chartConfig]);

  return charts;
}

export default useGraph;