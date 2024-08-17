import React, { useEffect, useContext, useState } from 'react';
import DataTable from '../../components/DataTableComponent';
import { IdSiteContext } from '../../contexts/idSiteContext';
import { videoPageTableConfig } from './videosPageConfig';

const VideoDataPage = () => {
  const { idSite } = useContext(IdSiteContext);
  const [chartConfig, setChartConfig] = useState(videoPageTableConfig);

  useEffect(() => {
    const loadData = async () => {
      const updatedConfig = await videoPageTableConfig.getData(idSite);
      setChartConfig({ ...updatedConfig });
    };

    loadData();
  }, [idSite]);

  return (
    <div>
      <h1>{chartConfig.title}</h1>
      <DataTable chart={chartConfig} />
    </div>
  );
};

export default VideoDataPage;