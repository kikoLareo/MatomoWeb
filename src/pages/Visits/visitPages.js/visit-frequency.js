import React, {useState, useEffect } from 'react';
import { visitsCharts_frequency } from '../../../config/chartsConfig';
import ChartOptions from '../../../components/chartOptions';
import useGraph from '../../../utils/useGraph';
import { setTitle } from '../../../components/Header';

const VisitFrequency = () => {
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

  
  useEffect(() => {
    setTitle('Visitas - Frecuencia de visitas');
  }, []);

  

  const chartsToRender = useGraph(selectedMetrics);

  return (
    <div className="page">
      <div className="title">
      </div>
      <div className="visitsGraphs">
        <ChartOptions chartConfig={visitsCharts_frequency} onMetricSelect={handleMetricSelect} />
        <div>
          {chartsToRender}
        </div>
      </div>
    </div>
  );
};

export default VisitFrequency;