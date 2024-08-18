
// LiveSectionHome.js
import React from 'react';
import DataOverviewTable from '../../components/tableComponent';
import { homeCharts_MediaSection } from './homePageConfig';
const MediaSectionHome = () => {




  return (
    <div className="MediaSection">
      <h1>Media Overview</h1>
        {homeCharts_MediaSection.map((chart) => (
        <DataOverviewTable chartConfig={chart} />
        ))}
      
    </div>
  );
};

export default MediaSectionHome;