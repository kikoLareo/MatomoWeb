// src/components/Reproductions.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ChartComponent from './ChartComponent';
import ChartInfo from './ChartInfo';
import { MediaAnalytics_get } from '../modules/mediaAnalytics/mediaAnalytics';
import { IdSiteContext } from '../contexts/idSiteContext';
import { metricDescriptions } from '../chartInfo.js/MediaAnalytics/get_Info';

const Reproductions = () => {
  const { idSite } = useContext(IdSiteContext);
  const [chartData, setChartData] = useState({});
  const [storedAnalysis, setStoredAnalysis] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setChartData({}); // Reiniciar el estado de las gráficas
      try {
        const { url } = MediaAnalytics_get(idSite);
        const response = await axios.get(url);
        const data = response.data;

        const newChartData = Object.keys(metricDescriptions).reduce((acc, metric) => {
          acc[metric] = {
            labels: Object.keys(data),
            data: Object.keys(data).map(date => data[date]?.[metric] || 0),
            title: metricDescriptions[metric].shortName,
            description: metricDescriptions[metric].description,
            idSite: idSite // Agregar idSite a los datos del gráfico
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
        {Object.keys(metricDescriptions).map((metric) => (
          <div key={metric} className="graph_component">
            <ChartComponent
              data={chartData[metric]?.data || []}
              labels={chartData[metric]?.labels || []}
              label={chartData[metric]?.title || ''}
            />
            <ChartInfo
              title={chartData[metric]?.title || ''}
              description={chartData[metric]?.description || ''}
              data={chartData[metric]?.data || []}
              idSite={chartData[metric]?.idSite}
              storedAnalysis={storedAnalysis}
              setStoredAnalysis={setStoredAnalysis}
              metric={metric}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reproductions;
