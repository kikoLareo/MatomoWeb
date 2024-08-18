import React, { useEffect, useContext, useState } from 'react';
import DataTable from '../../components/DataTableComponent';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { IdSiteContext } from '../../contexts/idSiteContext';
import { videoPageTableConfig } from './videosPageConfig';
import { setTitle } from '../../components/Header';

const VideoDataPage = () => {
  const { idSite } = useContext(IdSiteContext);
  const [chartConfig, setChartConfig] = useState(videoPageTableConfig);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTitle(videoPageTableConfig.title);
  }, []);

  useEffect(() => {
    console.log("Loading data for site: ", idSite);
    const loadData = async () => {
      try {
        const updatedConfig = await videoPageTableConfig.getData(idSite);
        setChartConfig({ ...updatedConfig });
      } catch (error) {
        console.error("Error loading data: ", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [idSite]);

  return (
    <div>
      <h1>{chartConfig.title}</h1>
      {loading ? (
        <Skeleton count={5} height={40} />
      ) : (
        <DataTable chart={chartConfig} />
      )}
    </div>
  );
};

export default VideoDataPage;