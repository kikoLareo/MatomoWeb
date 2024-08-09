// src/pages/Devices.js
import { useContext, useState, useEffect } from 'react';
import { IdSiteContext } from '../contexts/idSiteContext';
import { fetchDataForCharts } from '../utils/fetchDataHelper';
import PieChartComponent from '../components/PieChartComponent';
import { devicesDetectionCharts } from '../config/chartsConfig';

const Devices = () => {
  const { idSite } = useContext(IdSiteContext);
  const [chartData, setChartData] = useState([]);

  console.log('Devices component is running');
  console.log('idSite:', idSite);

  useEffect(() => {
    console.log('useEffect is running');
    console.log('idSite:', idSite);

    const fetchData = async () => {
      try {
        console.log('Fetching data for charts');
        console.log('devicesDetectionCharts:', devicesDetectionCharts);
        const data = await fetchDataForCharts(idSite, devicesDetectionCharts);
        console.log('Fetched data:', data);

        // Convert the fetched data to an array format expected by PieChartComponent
      
        setChartData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    
  }, [idSite]);

  return (
    <div className="Devices">
      <div className="graphDashBoard">
        {chartData.map((chart, index) => (
          <PieChartComponent key={index} data={chart} />
        ))}
      </div>
    </div>
  );
};

export default Devices;