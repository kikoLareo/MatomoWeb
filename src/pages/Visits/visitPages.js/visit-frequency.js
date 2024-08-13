import React, { useContext, useState } from 'react';
import { exampleCharts } from '../../../config/chartsConfig';
import { IdSiteContext } from '../../../contexts/idSiteContext';
import ChartOptions from '../../../components/chartOptions';
import useGraph from '../../../utils/useGraph';

const VisitFrequency = () => {
  const { idSite } = useContext(IdSiteContext);
  const [selectedMetrics, setSelectedMetrics] = useState({});

  const handleMetricSelect = (chart, metric) => {
    const chartTitle = chart.title;
    setSelectedMetrics((prevSelectedMetrics) => {
      const chartInfo = prevSelectedMetrics[chartTitle] || { chart, metrics: [] };
      const metrics = chartInfo.metrics.includes(metric)
        ? chartInfo.metrics.filter(m => m !== metric)
        : [...chartInfo.metrics, metric];
      return {
        ...prevSelectedMetrics,
        [chartTitle]: { ...chartInfo, metrics },
      };
    });
  };

  const chartsToRender = useGraph(selectedMetrics, idSite);

  return (
    <div className="page">
      <h1>Visitas</h1>
      <div className="visitsGraphs">
        <ChartOptions chartConfig={exampleCharts} onMetricSelect={handleMetricSelect} />
        <div>
          {chartsToRender}
        </div>
      </div>
    </div>
  );
};

export default VisitFrequency;