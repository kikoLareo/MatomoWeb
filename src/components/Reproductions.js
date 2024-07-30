// src/components/Reproductions.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChartComponent from './ChartComponent';
import ChartInfo from './ChartInfo';
import { MediaAnalytics_get } from '../modules/mediaAnalytics/mediaAnalytics';
import { idSiteOptions } from '../config';

const metrics = {
  nb_uniq_visitors: 'Visitantes Únicos',
  nb_plays: 'Número de Reproducciones',
  nb_unique_visitors_plays: 'Reproducciones por Visitantes Únicos',
  nb_impressions: 'Número de Impresiones',
  nb_unique_visitors_impressions: 'Impresiones por Visitantes Únicos',
  nb_finishes: 'Número de Finalizaciones',
  sum_total_time_watched: 'Tiempo Total Visto',
  sum_total_audio_plays: 'Total de Reproducciones de Audio',
  sum_total_audio_impressions: 'Total de Impresiones de Audio',
  sum_total_video_plays: 'Total de Reproducciones de Video',
  sum_total_video_impressions: 'Total de Impresiones de Video',
  play_rate: 'Tasa de Reproducción',
  finish_rate: 'Tasa de Finalización',
  impression_rate: 'Tasa de Impresión',
};

const Reproductions = () => {
  const [idSite, setIdSite] = useState(1);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { url } = MediaAnalytics_get(idSite);
        const response = await axios.get(url);
        const data = response.data;

        const newChartData = Object.keys(metrics).reduce((acc, metric) => {
          acc[metric] = {
            labels: Object.keys(data),
            data: Object.keys(data).map(date => data[date]?.[metric] || 0),
            title: metrics[metric],
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
      <div className="options">
        <div className="optionsSite">
          <label>
            <h3>Seleccionar idSite:</h3>
            <select value={idSite} onChange={(e) => setIdSite(Number(e.target.value))}>
              {Object.entries(idSiteOptions).map(([label, value]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="graphDashBoard">
        {Object.keys(metrics).map((metric) => (
          <div key={metric} className="graph_component">
            <ChartComponent
              data={chartData[metric]?.data || []}
              labels={chartData[metric]?.labels || []}
              label={chartData[metric]?.title || ''}
            />
            <ChartInfo
              title={metrics[metric]}
              description={`Información básica sobre ${metrics[metric]}`}
              data={chartData[metric]?.data || []}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reproductions;
