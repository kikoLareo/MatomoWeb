import React, { useEffect, useState, useContext } from 'react';
import { IdSiteContext } from '../contexts/idSiteContext';
import ChartComponent from '../components/ChartComponent';
import { fetchDataForCharts } from '../utils/fetchDataHelper';
import { homeCharts, nowInfo } from '../config/chartsConfig';
import InfoComponent from '../components/infoComponent';
import LiveWidget from '../components/Live_Components/LiveWidget';

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
            {nowInfo.map((info) => (
            <InfoComponent data={info} />
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