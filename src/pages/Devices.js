// src/pages/Devices.js
import React, { useContext, useState, useEffect } from 'react';
import { IdSiteContext } from '../contexts/idSiteContext';
import { fetchDataForCharts } from '../utils/fetchDataHelper';
import { devicesDetection_getType } from '../modules/devicesDetection/devicesDetect_Actions';
import PieChartComponent from '../components/PieChartComponent';
const Devices = () => {
  const { idSite } = useContext(IdSiteContext);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDataForCharts(idSite, [{ devicesDetection_getType }]);
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