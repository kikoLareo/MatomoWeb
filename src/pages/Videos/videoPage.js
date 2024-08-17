import React, { useEffect, useContext } from 'react';
import DataTable from '../../components/DataTableComponent';
import {IdSiteContext} from '../../contexts/idSiteContext';
import { videoPageTableConfig } from './videosPageConfig';

const VideoDataPage = () => {
  const { idSite } = useContext(IdSiteContext);

  useEffect(() => {
    const loadData = async () => {
      await videoPageTableConfig.getData(idSite);
    };

    loadData();
  }, [idSite]);


  return (
    <div>
      <h1>{videoPageTableConfig.title}</h1>
      <DataTable chart={videoPageTableConfig}/>
    </div>
  );
};

export default VideoDataPage;
