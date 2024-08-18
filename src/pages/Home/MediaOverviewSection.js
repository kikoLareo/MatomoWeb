
// LiveSectionHome.js
import React from 'react';
import DataOverviewTable from '../../components/tableComponent';
import { homeCharts_MediaSection } from './homePageConfig';
const MediaSectionHome = () => {




  return (
    <div className="MediaSection">
      <h1>Media Overview</h1>
        <div className="chartsInfo">
          <div className="data-overview-section">
            {homeCharts_MediaSection.map((chart) => (
            <DataOverviewTable chartConfig={chart} />
            ))}
          </div>
          
      </div>
    </div>
  );
};

export default MediaSectionHome;