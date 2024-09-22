import React, { useState, useEffect, useContext } from 'react';
import ChartOptions from '../../../components/chartOptions';
import { setTitle } from '../../../components/Header';
import { IdSiteContext } from '../../../contexts/idSiteContext';
import DataOverviewTable from '../../../components/tableComponent';
import GraphRenderer from '../../../utils/GraphRenderer';

const VisitPage = ({ pageConfig }) => {
  console.log('pageConfig', pageConfig);
  const chartsConfig = pageConfig.chartsConfig;

  const [selectedMetrics, setSelectedMetrics] = useState(() => {
    const savedMetrics = localStorage.getItem('selectedMetrics');
    return savedMetrics ? JSON.parse(savedMetrics) : {};
  });

  const [metricsData, setMetricsData] = useState({});
  const { idSite } = useContext(IdSiteContext);
  const [loading, setLoading] = useState(true);
  const [iframeHtml, setIframeHtml] = useState(null);

  
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
      setLoading(false);
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

  useEffect(() => {
    const loadIframe = async () => {
      if (pageConfig.components.includes("iframe") && pageConfig.iframe) {
        const iframeContent = await pageConfig.iframe(idSite); 
        setIframeHtml(iframeContent);
      }
    };
    loadIframe();
  }, [idSite, pageConfig]); 


  const renderIframe = () => {
    if (iframeHtml) {
      return (
        <div className="iframe-container" dangerouslySetInnerHTML={{ __html: iframeHtml }} />
      );
    }
    return null;
  };

  const renderCharts = () => {
    return chartsConfig.map((chartConfig, index) => {
      const metrics = selectedMetrics[chartConfig.title] || (pageConfig.components.includes("chartOptions") ? [] : Object.keys(chartConfig.metrics));
  
      if (metrics.length === 0) return null;
  
      let labels = [];
      let dataPoints = {};
  
      // Caso 1: Formato con array y label
      if (Array.isArray(chartConfig.data.value)) {
        labels = chartConfig.data.value.map(item => item.label);
        metrics.forEach(metric => {
          dataPoints[metric] = chartConfig.data.value.map(item => item[metric] || 0);
        });
      }
      // Caso 2: Formato con objeto y fechas como claves
      else if (typeof chartConfig.data.value === 'object') {
        labels = Object.keys(chartConfig.data.value);
        metrics.forEach(metric => {
          dataPoints[metric] = labels.map(label => chartConfig.data.value[label]?.[metric] || 0);
        });
      }
  
      if (labels.length === 0) {
        console.warn(`No labels available for chart: ${chartConfig.title}`);
        return null;
      }


      metrics.forEach(metric => {
        if (chartConfig.data.info) {
          if (chartConfig.data.info.metadata.metricTypes) {
            if (chartConfig.data.info.metadata.metricTypes[metric] === "percent") {
              dataPoints[metric] = dataPoints[metric].map(value => {
                if (!value || value === 0) {
                  return 0;
                }
                // Eliminar el símbolo "%" y convertir a número
                return parseFloat(value.replace('%', ''));
              });
            }
          }
        }
      });


      return (
        <div key={index} >
          <div >
            {metrics.map((metric, metricIndex) => (
              <GraphRenderer
                key={metricIndex}
                chart={{
                  type: chartConfig.type,
                  labels: labels,
                  data: dataPoints[metric],
                  title: chartConfig.metrics[metric],
                  metricType: chartConfig.data.info?.metadata.metricTypes[metric] || 'number',
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
              {renderIframe()}
              {pageConfig.components.includes("chartOptions") && (
                <ChartOptions 
                  chartConfig={chartsConfig} 
                  selectedMetrics={selectedMetrics} 
                  onMetricSelect={handleMetricSelect} 
                  metricsData={metricsData}
                />
              )}
              <div className="chartsInfo">
                {pageConfig.components.includes("DataOverviewTable") &&
                  chartsConfig.map((chartConfig, index) => (
                    <div key={index} className="data-overview-section">
                      <DataOverviewTable 
                        chartConfig={chartConfig}
                      />
                    </div>
                  ))}
                 
              <div className="charts-section">
                {pageConfig.components.includes("GraphRenderer") && renderCharts()}
              </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisitPage;
