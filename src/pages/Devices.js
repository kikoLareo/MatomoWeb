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
  const [deviceSummary, setDeviceSummary] = useState('Analizando datos');
  const [loadingDots, setLoadingDots] = useState(0);

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

    const fetchSummary = async () => {
      let dots = 0;
      const interval = setInterval(() => {
        if (!isLoading) {
          clearInterval(interval);
          return;
        }
        dots = (dots + 1) % 4;
        setLoadingDots(dots);
        setDeviceSummary("Analizando datos" + ".".repeat(dots));
      }, 500);

      try {
        console.log('Chart Data before sending to GetDevicesPromt:', chartData);
        const result = await chatGpt(GetDevicesPromt({ chartData, idSite }));
        setDeviceSummary(result);
      } catch (error) {
        console.error('Error fetching summary:', error);
        setDeviceSummary('Error obteniendo resumen');
        setTimeout(() => {
          setDeviceSummary('');
        }, 5000);
      } finally {
        clearInterval(interval);
      }
    };

    fetchData().then(fetchSummary);
  }, [idSite, chartData, isLoading]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isLoading) {
        setLoadingDots((prev) => (prev + 1) % 4);
      } else {
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [isLoading]);

  if (isLoading) {
    return <div className="loading">Cargando datos{".".repeat(loadingDots)}</div>;
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