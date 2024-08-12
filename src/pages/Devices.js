// src/pages/Devices.js
import { useContext, useState, useEffect } from 'react';
import { IdSiteContext } from '../contexts/idSiteContext';
import { fetchDataForCharts } from '../utils/fetchDataHelper';
import PieChartComponent from '../components/PieChartComponent';
import { devicesDetectionCharts } from '../config/chartsConfig';

const Devices = () => {
  const { idSite } = useContext(IdSiteContext);
  const [chartData, setChartData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  
    const fetchData = async () => {
      try {
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
      } finally{
        setIsLoading(false);
      }
    };

    fetchData();
    
  }, [idSite]);

  if (isLoading) {
    return <div className="loading">Cargando datos...</div>;
  }
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