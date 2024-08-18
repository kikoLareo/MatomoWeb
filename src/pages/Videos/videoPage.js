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
    console.log("idSite is:", idSite);
    if (!idSite){
         console.log("No idSite");
         return ; // Detén la ejecución si idSite no está disponible
    }
    console.log("Loading data for site: ", idSite);
    const loadData = async () => {
      try {
        const updatedConfig = await videoPageTableConfig.getData(idSite);
        console.log("Updated config: ", updatedConfig);
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
      {loading ? (
        <Skeleton count={5} height={40} />
      ) : (
        <DataTable chart={chartConfig} />
      )}
    </div>
  );
};

export default VideoDataPage;