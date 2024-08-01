// src/components/Reproductions.js

import React, { useState, useEffect, useContext } from 'react';
import ChartComponent from '../components/ChartComponent';
import ChartInfo from '../components/ChartInfo';
import { IdSiteContext } from '../contexts/idSiteContext';
import { reproductionsCharts } from '../config/chartsConfig';
import { fetchDataForCharts } from '../utils/fetchDataHelper';

const Reproductions = () => {
  const { idSite } = useContext(IdSiteContext);
  const [chartData, setChartData] = useState({});
  const [storedAnalysis, setStoredAnalysis] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDataForCharts(idSite, reproductionsCharts);
      setChartData(data);
    };

    fetchData();
  }, [idSite]);

  return (
    <div className="reproductions">
      <div className="graphDashBoard">
        {reproductionsCharts.map((chart) => (
          <div key={chart.name} className="graph_component">
            <ChartComponent
              data={chartData[chart.name]?.data || []}
              labels={chartData[chart.name]?.labels || []}
              label={chartData[chart.name]?.title || ''}
            />
            <ChartInfo
              title={chartData[chart.name]?.title || ''}
              description={chartData[chart.name]?.description || ''}
              data={chartData[chart.name]?.data || []}
              idSite={chartData[chart.name]?.idSite}
              storedAnalysis={storedAnalysis}
              setStoredAnalysis={setStoredAnalysis}
              metric={chart.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reproductions;
