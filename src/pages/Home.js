// src/components/Home.js

import React, { useEffect, useState, useContext } from 'react';
import { IdSiteContext } from '../contexts/idSiteContext';
import ChartComponent from '../components/ChartComponent';
import { fetchDataForCharts } from '../utils/fetchDataHelper';
import { homeCharts, nowInfo } from '../config/chartsConfig';
import InfoComponent from '../components/infoComponent';

function Home() {
  const { idSite } = useContext(IdSiteContext);
  const [chartData, setChartData] = useState({});
  const [nowData, setNowData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const now = await fetchDataForCharts(idSite, homeCharts);
      setNowData(now);

      const data = await fetchDataForCharts(idSite, homeCharts);
      setChartData(data);
    };

    fetchData();
  }, [idSite]);

  return (
    <div>
      <header></header>
      <body>
        <div className="nowInfo">
          {nowInfo.map((info) => (
           <InfoComponent key={info.name} title={info.title} data={nowData[info.name]} />
          ))}
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
