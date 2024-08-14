import React, { useEffect, useContext, useState } from 'react';
import { IdSiteContext } from '../contexts/idSiteContext';
import GraphRenderer from './GraphRenderer';
import { titles } from './dictionaryMetrics/metricsTitles';

function useGraph(selectedMetrics) {
  const { idSite } = useContext(IdSiteContext);
  const [charts, setCharts] = useState([]);

  useEffect(() => {
    if (
      !selectedMetrics || 
      (Array.isArray(selectedMetrics) && selectedMetrics.length === 0) || 
      (typeof selectedMetrics === 'object' && !Array.isArray(selectedMetrics) && Object.keys(selectedMetrics).length === 0)
    ) {
      setCharts(<p>No charts to render</p>);
      return;
    }

    const renderedCharts = Object.entries(selectedMetrics).map(([chartTitle, chartInfo]) => {
      const { chart, metrics } = chartInfo;
      const { data, description, title, type } = chart;
      return (
        <div className="graphGroup" key={chartTitle}>
          <h3>{title}</h3>
          <p>{description}</p>
          <div className="graphGrid">
            {metrics.map((metric) => (
              <GraphRenderer
                key={metric}
                chart={{
                  type,
                  labels: Object.keys(data.value),
                  data: Object.keys(data.value).map(date => data.value[date]?.[metric] || 0),
                  title: data.info.columns ? data.info.columns[metric] : data.info.metadata ? data.info.metadata.metrics[metric] : titles[metric]
                }}
              />
            ))}
          </div>
        </div>
      );
    });

    setCharts(renderedCharts);
  }, [selectedMetrics, idSite]);

  return charts;
}

export default useGraph;