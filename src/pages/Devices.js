import { useContext, useState, useEffect } from 'react';
import { IdSiteContext } from '../contexts/idSiteContext';
import { fetchDataForCharts } from '../utils/fetchDataHelper';
import PieChartComponent from '../components/PieChartComponent';
import { devicesDetectionCharts } from '../config/chartsConfig';
import { GetDevicesPromt } from '../utils/gptPromts/devicesPromt';
import { chatGpt } from '../utils/chatGptCall';

const Devices = () => {
  const { idSite } = useContext(IdSiteContext);
  const [chartData, setChartData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingSummary, setIsLoadingSummary] = useState(true);
  const [deviceSummary, setDeviceSummary] = useState('Analizando datos');


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
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [idSite]);

  useEffect(() => {
 
  
    const fetchSummary = async () => {
      let dots = 0;
      const interval = setInterval(() => {
        if (!isLoadingSummary) {
          clearInterval(interval);
          return;
        }
        dots = (dots + 1) % 4;
        setDeviceSummary("Analizando datos" + ".".repeat(dots));
      }, 500);

      try {
        const result = await chatGpt(GetDevicesPromt(chartData, idSite));
        setDeviceSummary(result);
      } catch (error) {
        console.error('Error fetching summary:', error);
      } finally {
        setIsLoadingSummary(false);
      }
    };
  
    if (!isLoading) {
      fetchSummary();
    }
  }, [chartData, idSite, isLoadingSummary, isLoading]);

  if (isLoading) {
    return <div className="loading">Cargando datos...</div>;
  }

  return (
    <div className="Devices">
      <h1>Dispositivos</h1>
      <p>{deviceSummary}</p>
      <div className="devicesGraphs">
        {devicesDetectionCharts.map((chart) => (
          <PieChartComponent
            key={chart.title}
            labels={chartData[chart.title]?.labels || []}
            data={chartData[chart.title]?.data || []}
            title={chartData[chart.title]?.chartTitle + "-" + chartData[chart.title]?.title || ''}
            description={chartData[chart.title]?.description || ''}
          />
        ))}
      </div>
    </div>
  );
};

export default Devices;