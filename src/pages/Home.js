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
      <div>
        <div className="nowInfo">
          {nowInfo.map((info) => (
           <InfoComponent key={info.id} title={info.title} data={nowData[info.title]} />
          ))}
        </div>
        <div className="graphDashBoard">
          {homeCharts.map((chart) => (
            <div key={chart.title}>
              <h3>{chartData[chart.title]}</h3>
              <ChartComponent data={chartData[chart.title]?.data || []} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
