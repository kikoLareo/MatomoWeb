import React, { useEffect, useContext, useState } from 'react';
import DataTable from '../../components/DataTableComponent';
import { IdSiteContext } from '../../contexts/idSiteContext';
import { videoPageTableConfig } from './videosPageConfig';

const VideoDataPage = () => {
    const { idSite } = useContext(IdSiteContext);
    const [chartConfig, setChartConfig] = useState(videoPageTableConfig);
    console.log(idSite);
  console.log(videoPageTableConfig);
  console.log("Video page data: ", chartConfig);

  useEffect(() => {
    const loadData = async () => {
        try {
          console.log("Loading data for site: ", idSite);
          const updatedConfig = await videoPageTableConfig.getData(idSite);
          console.log("Updated config: ", updatedConfig);
          setChartConfig({ ...updatedConfig });
        } catch (error) {
          console.error("Error loading data: ", error);
        }
      };
    
      if (idSite) {
        loadData();
      }
    }, [idSite]);
    
  return (
    <div>
      <h1>{chartConfig.title}</h1>
      <DataTable chart={chartConfig} />
    </div>
  );
};
export default VideoDataPage;