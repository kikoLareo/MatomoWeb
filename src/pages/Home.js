// src/components/Home.js

import React, { useEffect, useState, useContext } from 'react';
import { IdSiteContext } from '../contexts/idSiteContext';
import ChartComponent from '../components/ChartComponent';
import { fetchDataForCharts } from '../utils/fetchDataHelper';
import { homeCharts } from '../config/chartsConfig';

function Home() {
  const { idSite } = useContext(IdSiteContext);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDataForCharts(idSite, homeCharts);
      setChartData(data);
    };

    fetchData();
  }, [idSite]);

  return (
    <div>
      <header></header>
      <body>
        <div>
          <h1>Welcome to Matomo Web</h1>
        </div>

        <div className="graphDashBoard">
          {homeCharts.map((chart) => (
            <div key={chart.name}>
              <h3>{chartData[chart.name]?.title}</h3>
              <ChartComponent data={chartData[chart.name]?.data || []} />
            </div>
          ))}
        </div>
      </body>
    </div>
  );
}

export default Home;
