import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChartComponent from './ChartComponent';
import { MediaAnalytics_get } from '../modules/mediaAnalytics/mediaAnalytics';
import { idSiteOptions } from '../config';

const Reproductions = () => {
  const [idSite, setIdSite] = useState(1); // Valor por defecto
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { url, title } = MediaAnalytics_get(idSite);
        const response = await axios.get(url);
        setChartData({ data: response.data, title });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [idSite]);

  return (
    <div className="reproductions">
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
      <div className="graphDashBoard">
        {Object.keys(chartData.data || {}).map((key) => (
          <div key={key}>
            <h3>{key}</h3>
            <ChartComponent data={chartData.data[key]} label={key} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reproductions;
