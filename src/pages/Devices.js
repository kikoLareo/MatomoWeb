// src/pages/Devices.js
import { useContext, useState, useEffect } from 'react';
import { IdSiteContext } from '../contexts/idSiteContext';
import { fetchDataForCharts } from '../utils/fetchDataHelper';
import PieChartComponent from '../components/PieChartComponent';
import { devicesDetectionCharts } from '../config/chartsConfig';

const Devices = () => {
  const { idSite } = useContext(IdSiteContext);
  const [chartData, setChartData] = useState({});

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
        const filteredData = {};
        for (const [key, value] of Object.entries(data)) {
          filteredData[key] = {
            ...value,
            labels: value.labels.filter((_, index) => value.data[index] !== 0),
            data: value.data.filter((item) => item !== 0),
          };
        }
  
        setChartData(filteredData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    
  }, [idSite]);

  return (
    <div className="Devices">
      <div className="graphDashBoard">
        {devicesDetectionCharts.map((chart) => (
            <PieChartComponent 
              key={chart.title}
              labels={chartData[chart.title]?.labels || []}
              data={chartData[chart.title]?.data || []}
              title={chartData[chart.title]?.title || ''}
              description={chartData[chart.title]?.description || ''}
            />
        ))}
      </div>
    </div>
  );
};

export default Devices;