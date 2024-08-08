// src/components/MediaAnalyticsGetSection.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ChartComponent from '../../components/ChartComponent';
import ChartInfo from '../../components/ChartInfo';
import { MediaAnalytics_get } from '../../modules/mediaAnalytics/mediaAnalytics';
import { IdSiteContext } from '../../contexts/idSiteContext';
import { MediaAnalytics_get_metrics } from '../../chart_config/MediaAnalytics/get_Info';
import { API_getProcessedReport } from '../../modules/API/apiFunctions';

const MediaAnalyticsGetSection = () => {
  const { idSite } = useContext(IdSiteContext);
  const [chartData, setChartData] = useState({});
  const [storedAnalysis, setStoredAnalysis] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setChartData({}); // Reiniciar el estado de las gráficas
      try {
        const dataUrl = API_getProcessedReport(idSite,'year', 'yesterday', 'MediaAnalytics', 'get', 'es', );
        const response = await axios.get(dataUrl.url);
        const processedData = response.data;

        const { url } = MediaAnalytics_get(idSite);
        const response2 = await axios.get(url);
        const data = response2.data;

        console.log(processedData);
        const newChartData = Object.keys(MediaAnalytics_get_metrics).reduce((acc, metric) => {
          const shortName = MediaAnalytics_get_metrics[metric].shortName;

          acc[metric] = {
            labels: Object.keys(data),
            data: Object.keys(data).map(date => data[date]?.[metric] || 0),
            id: metric, // Agregar id a los datos del gráfico
            title: processedData["metadata"]["metrics"][shortName],
            description:processedData["metadata"]["metricsDocumentation"][shortName]
          };
          return acc;
        }, {});

        setChartData(newChartData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [idSite]);

  return (
    <div className="reproductions">
      <div className="graphDashBoard">
        {Object.keys(MediaAnalytics_get_metrics).map((metric) => (
          <div key={metric} className="graph_component">
            {chartData[metric] ? (
                <>
                  <ChartComponent
                    data={chartData[metric].data}
                    labels={chartData[metric].labels}
                    label={chartData[metric].title}
                  />
                  <ChartInfo
                    id={chartData[metric].id}
                    title={chartData[metric].title}
                    description={chartData[metric].description}
                    data={chartData[metric].data}
                    storedAnalysis={storedAnalysis}
                    setStoredAnalysis={setStoredAnalysis}
                    metric={metric}
                  />
                </>
              
            ) : (
              <p>Loading...</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaAnalyticsGetSection;
