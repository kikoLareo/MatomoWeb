import { useContext, useState, useEffect, useRef } from 'react';
import { IdSiteContext } from '../contexts/idSiteContext';
import { fetchDataForCharts } from '../utils/fetchDataHelper';
import PieChartComponent from '../components/PieChartComponent';
import { devicesDetectionCharts } from '../config/chartsConfig';
import { GetDevicesPromt } from '../utils/gpt/gptPromts/devicesPromt';
import { chatGpt } from '../utils/gpt/chatGptCall';
import { setTitle } from '../components/Header';
import PieChartSkeleton from '../components/skeletons/pieSkeleton';

const Devices = () => {
  const { idSite } = useContext(IdSiteContext);
  const [chartData, setChartData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [deviceSummary, setDeviceSummary] = useState('Analizando datos');
  const [loadingDots, setLoadingDots] = useState(0);

  const chartDataRef = useRef(chartData);
  const isLoadingRef = useRef(isLoading);

  useEffect(() => {
    chartDataRef.current = chartData;
    isLoadingRef.current = isLoading;
  }, [chartData, isLoading]);

  useEffect(() => {
    setTitle("Dispositivos");
  }, []);

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
        if (!isLoadingRef.current) {
          clearInterval(interval);
          return;
        }
        dots = (dots + 1) % 4;
        setLoadingDots(dots);
        setDeviceSummary("Analizando datos" + ".".repeat(dots));
      }, 500);

      try {
        console.log('Chart Data before sending to GetDevicesPromt:', chartDataRef.current);
        const result = await chatGpt(GetDevicesPromt({ chartData: chartDataRef.current, idSite }));
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
  }, [idSite]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isLoading) {
        setLoadingDots((prev) => (prev + 1) % 4);
        setDeviceSummary("Analizando datos" + ".".repeat(loadingDots));
      } else {
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [isLoading, loadingDots]);

  if (isLoading) {
    return (
      <div className="Devices">
        <p>{deviceSummary}</p>
        <div className="devicesGraphs">
          {Array.from({ length: 4 }).map((_, index) => (
            <PieChartSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="Devices">
      <p dangerouslySetInnerHTML={{ __html: deviceSummary.replace(/\n/g, '<br/>') }}></p>
      <div className="devicesGraphs">
        {devicesDetectionCharts.map((chart) => (
          <div key={chart.title} className="chart-container">
            <h2>{chart.title || 'Gráfico sin título'}</h2>
            {chartData[chart.title] && chartData[chart.title].labels.length > 0 ? (
              <PieChartComponent
                labels={chartData[chart.title]?.labels || []}
                data={chartData[chart.title]?.data || []}
                title={chartData[chart.title]?.chartTitle || chart.title}
                description={chartData[chart.title]?.description || ''}
              />
            ) : (
              <PieChartSkeleton />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Devices;
