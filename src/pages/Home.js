import React, { useContext, useState, useEffect } from 'react';
import ChartComponent from '../components/ChartComponent';
import { fetchDataForCharts } from '../utils/fetchDataHelper';
import { homeCharts, nowInfo } from '../config/chartsConfig';
import InfoComponent from '../components/infoComponent';
import LiveWidget from '../components/Live_Components/LiveWidget';
import { IdSiteContext } from '../contexts/idSiteContext';

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
    <div className="home">
      <div className="DashBoard">
        <div className="column">
          <div className="nowInfo">
            {nowInfo.map((info, index) => (
              <InfoComponent key={index} data={info} />
            ))}
          </div>
          <LiveWidget />
        </div>
        <div className="column">
          {homeCharts.map((chart) => (
            <ChartComponent key={chart.id} title={chart.title} data={chartData[chart.title]} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;