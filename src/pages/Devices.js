// src/components/MediaAnalyticsGetSection.js
import React, { useContext } from 'react';
import { IdSiteContext } from '../contexts/idSiteContext';
import { fetchDataForCharts } from '../utils/fetchDataHelper';
import { devicesDetection_getType } from '../modules/devicesDetection/devicesDetect_Actions';
import ScatterChartComponent from '../components/ScatterChartComponent ';

const Devices = () => {
  const { idSite } = useContext(IdSiteContext);

    const data = fetchDataForCharts(idSite, devicesDetection_getType);

  return (
    <div className="Devices">
      <div className="graphDashBoard">
        <ScatterChartComponent data={data} />
      </div>
    </div>
  );
};

export default Devices;
