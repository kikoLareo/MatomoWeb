// src/pages/Devices.js
import React, { useContext, useState, useEffect } from 'react';
import { IdSiteContext } from '../contexts/idSiteContext';
import { fetchDataForCharts } from '../utils/fetchDataHelper';
import PieChartComponent from '../components/PieChartComponent';
import {devicesDetectionCharts} from '../config/chartsConfig';

const Devices = () => {
  const { idSite } = useContext(IdSiteContext);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDataForCharts(idSite, devicesDetectionCharts);
      setChartData(data);
    };

    fetchData();
  }, [idSite]);

  return (
    <div className="Devices">
      <div className="graphDashBoard">
        <PieChartComponent data={chartData} />
      </div>
    </div>
  );
};

export default Devices;