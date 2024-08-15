import React, { useState, useEffect, useContext } from 'react';
import ChartOptions from '../../../components/chartOptions';
import { setTitle } from '../../../components/Header';
import { IdSiteContext } from '../../../contexts/idSiteContext';
import DataOverviewTable from '../../../components/tableComponent';
import GraphRenderer from '../../../utils/GraphRenderer';
import FilterPeriod from '../../../components/filterPeriod';

const VisitPage = ({ pageConfig }) => {
  const chartsConfig = pageConfig.chartsConfig;

  const [selectedMetrics, setSelectedMetrics] = useState(() => {
    const savedMetrics = localStorage.getItem('selectedMetrics');
    return savedMetrics ? JSON.parse(savedMetrics) : {};
  });

  const [metricsData, setMetricsData] = useState({});
  const { idSite } = useContext(IdSiteContext);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('day'); 
  const [date, setDate] = useState('yesterday');

  
  useEffect(() => {
    setTitle(pageConfig.title);
  }, [pageConfig.title]);

  useEffect(() => {
    localStorage.setItem('selectedMetrics', JSON.stringify(selectedMetrics));
  }, [selectedMetrics]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); 
      const data = {};
      for (const chart of chartsConfig) {
        if (chart.getData) {
          try {
            const chartData = await chart.getData(idSite, period, date);
            data[chart.title] = chartData.metrics;
          } catch (error) {
            console.error(`Error fetching data for chart ${chart.title}:`, error);
          }
        } else {
          data[chart.title] = chart.metrics;
        }
      }
      setMetricsData(data);
      setLoading(false);
    };
    fetchData();
  }, [idSite, chartsConfig, period, date]);

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

  const handlePeriodChange = (newPeriod) => {
    setPeriod(newPeriod); // Update the period state
  };

  const handleDateChange = (newDate) => {
    setDate(newDate); // Update the date state
  };

  const renderCharts = () => {
    return chartsConfig.map((chartConfig, index) => {
    
      const metrics = selectedMetrics[chartConfig.title] || (pageConfig.components.includes("chartOptions") ? [] : Object.keys(chartConfig.metrics));

      if (metrics.length === 0) return null;
      console.log('Rendering chart:', chartConfig);
      return (
        <div key={index} className="data-table-section">
          <h2>{chartConfig.title}</h2>
          <div className="chart-group">
            {metrics.map((metric, metricIndex) => (
              <GraphRenderer
                key={metricIndex}
                chart={{
                  type: chartConfig.type,
                  labels: chartConfig.labels ? chartConfig.labels : chartConfig.data.value.labels || Object.keys(chartConfig.data.value),
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
      <div className="pageBody">
        <div className="visitsGraphs">
          {loading ? (
            <div>Loading data...</div>
          ) : (
            <>
              {pageConfig.components.includes("chartOptions") && (
                <ChartOptions 
                  chartConfig={chartsConfig} 
                  selectedMetrics={selectedMetrics} 
                  onMetricSelect={handleMetricSelect} 
                  metricsData={metricsData}
                />
              )}
              <div className="chartsInfo">
                <div className="filter-options" style={{ display: 'flex' }}>
                  {pageConfig.components.includes("periodSelecter") && (
                    <FilterPeriod onPeriodChange={handlePeriodChange} />
                  )}
                  {pageConfig.components.includes("dateSelecter") && (
                    <FilterPeriod onPeriodChange={handleDateChange} />
                  )}
                  </div>
                {pageConfig.components.includes("DataOverviewTable") &&
                  chartsConfig.map((chartConfig, index) => (
                    <div key={index} className="data-overview-section">
                      <DataOverviewTable 
                        fetchDataFunction={chartConfig.function} 
                      />
                    </div>
                  ))}
                {pageConfig.components.includes("GraphRenderer") && renderCharts()}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisitPage;
