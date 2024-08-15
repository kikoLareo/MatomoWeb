import React, { useState, useEffect, useContext } from 'react';
import ChartOptions from '../../../components/chartOptions';
import { setTitle } from '../../../components/Header';
import { IdSiteContext } from '../../../contexts/idSiteContext';
import DataOverviewTable from '../../../components/tableComponent';
import GraphRenderer from '../../../components/GraphRenderer';

const VisitPage = ({ pageConfig }) => {
  const chartsConfig = pageConfig.chartsConfig;

  const [selectedMetrics, setSelectedMetrics] = useState(() => {
    const savedMetrics = localStorage.getItem('selectedMetrics');
    return savedMetrics ? JSON.parse(savedMetrics) : {};
  });

  const [metricsData, setMetricsData] = useState({});
  const { idSite } = useContext(IdSiteContext);
  const [loading, setLoading] = useState(true);

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

  const renderCharts = () => {
    return chartsConfig.map((chartConfig, index) => {
      const metrics = selectedMetrics[chartConfig.title] || [];
      if (metrics.length === 0) return null;

      return (
        <div key={index} className="data-table-section">
          <h2>{chartConfig.title}</h2>
          <div className="chart-group">
            {metrics.map((metric, metricIndex) => (
              <GraphRenderer
                key={metricIndex}
                chart={{
                  type: chartConfig.type,
                  labels: chartConfig.data.value.labels || Object.keys(chartConfig.data.value),
                  data: Object.keys(chartConfig.data.value).map(label => chartConfig.data.value[label]?.[metric] || 0),
                  title: chartConfig.metrics[metric],
                }}
              />
            ))}
          </div>
        </div>
      );
    });
  };

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
                {renderCharts()}
                {chartsConfig.map((chartConfig, index) => (
                  <div key={index} className="data-table-section">
                    <h2>{chartConfig.title}</h2>
                    <DataOverviewTable 
                      fetchDataFunction={chartConfig.function} 
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisitPage;
