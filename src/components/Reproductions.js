import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChartComponent from './ChartComponent';
import ChartInfo from './ChartInfo';
import { MediaAnalytics_get } from '../modules/mediaAnalytics/mediaAnalytics';
import { idSiteOptions } from '../config';

const metrics = {
  nb_uniq_visitors: 'Unique Visitors',
  nb_plays: 'Number of Plays',
  nb_unique_visitors_plays: 'Unique Visitors Plays',
  nb_impressions: 'Number of Impressions',
  nb_unique_visitors_impressions: 'Unique Visitors Impressions',
  nb_finishes: 'Number of Finishes',
  sum_total_time_watched: 'Total Time Watched',
  sum_total_audio_plays: 'Total Audio Plays',
  sum_total_audio_impressions: 'Total Audio Impressions',
  sum_total_video_plays: 'Total Video Plays',
  sum_total_video_impressions: 'Total Video Impressions',
  play_rate: 'Play Rate',
  finish_rate: 'Finish Rate',
  impression_rate: 'Impression Rate',
};

const Reproductions = () => {
  const [idSite, setIdSite] = useState(1); // Valor por defecto
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
            <h3>Select idSite:</h3>
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
              description={`Basic information about ${metrics[metric]}`}
              data={chartData[metric]?.data || []}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reproductions;
