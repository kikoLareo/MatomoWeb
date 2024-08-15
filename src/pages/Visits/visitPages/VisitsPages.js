import React, { useState, useEffect, useContext } from 'react';
import ChartOptions from '../../../components/chartOptions';
import useGraph from '../../../utils/useGraph';
import { setTitle } from '../../../components/Header';
import { IdSiteContext } from '../../../contexts/idSiteContext';
import DataOverviewTable from '../../../components/tableComponent';

const VisitPage = ({ pageConfig }) => {
  const chartsConfig = pageConfig.chartsConfig;

  const [selectedMetrics, setSelectedMetrics] = useState(() => {
    const savedMetrics = localStorage.getItem('selectedMetrics');
    return savedMetrics ? JSON.parse(savedMetrics) : {};
  });

  const [metricsData, setMetricsData] = useState({});
  const { idSite } = useContext(IdSiteContext);
  const [loading, setLoading] = useState(true);

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
      setLoading(true);  // Start loading
      const data = {};
      for (const chart of chartsConfig) {
        if (chart.getData) {
          try {
            const chartData = await chart.getData(idSite);
            data[chart.title] = chartData.metrics;
          } catch (error) {
            console.error(`Error fetching data for chart ${chart.title}:`, error);
          }
        } else {
          data[chart.title] = chart.metrics;
        }
      }
      setMetricsData(data);
      setLoading(false);  // Stop loading
    };
    fetchData();
  }, [idSite, chartsConfig]);

  const chartsToRender = useGraph(chartsConfig, selectedMetrics, loading);

  return (
    <div className="page">
      <div className="title">{pageConfig.title}</div>

      <div className="pageBody">
        <div className="visitsGraphs">
          {loading ? (
            <div>Loading data...</div>
          ) : (
            <>
              <ChartOptions 
                chartConfig={chartsConfig} 
                selectedMetrics={selectedMetrics} 
                onMetricSelect={handleMetricSelect} 
                metricsData={metricsData}
              />
              <div className="chartsInfo">
                {chartsConfig.map((chartConfig, index) => (
                  <div key={index} className="data-table-section">
                    <h2>{chartConfig.title}</h2>
                    <DataOverviewTable 
                      fetchDataFunction={chartConfig.function} 
                    />
                  </div>
                ))}
                {chartsToRender}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisitPage;
