// src/hooks/useFetchChartData.js
import { useEffect, useState } from 'react';
import { fetchDataForCharts } from '../utils/fetchDataHelper';

const useFetchChartData = (idSite, chartsConfig) => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDataForCharts(idSite, chartsConfig);
      setChartData(data);
    };

    if (idSite) {
      fetchData();
    }
  }, [idSite, chartsConfig]);

  return chartData;
};

export default useFetchChartData;