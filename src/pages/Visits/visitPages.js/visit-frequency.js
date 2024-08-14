import React, { useState, useEffect } from 'react';
import { visitsCharts_frequency } from '../../../config/chartsConfig';
import ChartOptions from '../../../components/chartOptions';
import useGraph from '../../../utils/useGraph';
import { setTitle } from '../../../components/Header';

const VisitFrequency = () => {
  const [selectedMetrics, setSelectedMetrics] = useState(() => {
    const savedMetrics = localStorage.getItem('selectedMetrics');
    return savedMetrics ? JSON.parse(savedMetrics) : {};
  });

  const handleMetricSelect = (chart, metric) => {
    const chartTitle = chart.title;
    setSelectedMetrics((prevSelectedMetrics) => {
      const chartInfo = prevSelectedMetrics[chartTitle] || [];
      const metrics = chartInfo.includes(metric)
        ? chartInfo.filter(m => m !== metric)
        : [...chartInfo, metric];
      return {
        ...prevSelectedMetrics,
        [chartTitle]: metrics,
      };
    });
  };

  useEffect(() => {
    setTitle('Visitas - Frecuencia de visitas');
  }, []);

  useEffect(() => {
    localStorage.setItem('selectedMetrics', JSON.stringify(selectedMetrics));
  }, [selectedMetrics]);

  const chartsToRender = useGraph(visitsCharts_frequency, selectedMetrics);

  return (
    <div className="page">
      <div className="title">
      </div>
      <div className="visitsGraphs">
        <ChartOptions 
          chartConfig={visitsCharts_frequency} 
          selectedMetrics={selectedMetrics} 
          onMetricSelect={handleMetricSelect} 
        />
        <div>
          {chartsToRender}
        </div>
      </div>
    </div>
  );
};

export default VisitFrequency;