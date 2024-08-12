import { useContext, useState, useEffect } from 'react';
import { IdSiteContext } from '../contexts/idSiteContext';
import { fetchDataForCharts } from '../utils/fetchDataHelper';
import PieChartComponent from '../components/PieChartComponent';
import { devicesDetectionCharts } from '../config/chartsConfig';

const Devices = () => {
  const { idSite } = useContext(IdSiteContext);
  const [chartData, setChartData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [loadingText, setLoadingText] = useState('Analizando datos');

  useEffect(() => {
    let dots = 0;
    const interval = setInterval(() => {
      dots = (dots + 1) % 4;
      setLoadingText(`Analizando datos${'.'.repeat(dots)}`);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDataForCharts(idSite, devicesDetectionCharts);
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [idSite]);

  if (isLoading) {
    return <div className="loading">{loadingText}</div>;
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