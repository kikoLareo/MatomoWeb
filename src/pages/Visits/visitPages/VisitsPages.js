// src/pages/Visits/VisitPage.js
import React, { useState, useEffect, useContext } from 'react';
import ChartOptions from '../../../components/chartOptions';
import useGraph from '../../../utils/useGraph';
import { setTitle } from '../../../components/Header';
import { IdSiteContext } from '../../../contexts/idSiteContext';

const VisitPage = ({ pageConfig }) => {
  const chartsConfig = pageConfig.chartsConfig;

  const [selectedMetrics, setSelectedMetrics] = useState(() => {
    const savedMetrics = localStorage.getItem('selectedMetrics');
    return savedMetrics ? JSON.parse(savedMetrics) : {};
  });

  const [metricsData, setMetricsData] = useState({});
  const { idSite } = useContext(IdSiteContext);

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
    setTitle(pageConfig.title);
  }, [pageConfig.title]);

  useEffect(() => {
    localStorage.setItem('selectedMetrics', JSON.stringify(selectedMetrics));
  }, [selectedMetrics]);

  useEffect(() => {
    const fetchData = async () => {
      const data = {};
      for (const chart of chartsConfig) {
        if (chart.getData) {
          var chartData = await chart.getData(idSite);
          data[chart.title] = chartData.metrics;
        } else {
          data[chart.title] = chart.metrics;
        }
      }
      setMetricsData(data);
    };
    fetchData();
  }, [idSite, chartsConfig]);

  const chartsToRender = useGraph(chartsConfig, selectedMetrics);

  return (
    <div className="page">
      <div className="title">
      </div>
      <div className="visitsGraphs">
        <ChartOptions 
          chartConfig={chartsConfig} 
          selectedMetrics={selectedMetrics} 
          onMetricSelect={handleMetricSelect} 
          metricsData={metricsData}
        />
        <div>
          {chartsToRender}
        </div>
      </div>
    </div>
  );
};

export default VisitPage;