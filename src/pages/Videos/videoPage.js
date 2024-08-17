import React, { useEffect, useState, useContext } from 'react';
import DataTable from '../../components/DataTableComponent';
import {IdSiteContext} from '../../contexts/idSiteContext';
import { videoPageTableConfig } from './videosPageConfig';

const VideoDataPage = () => {
  const { idSite } = useContext(IdSiteContext);
  const [videoData, setVideoData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const data = videoPageTableConfig.getData(idSite).data.value;

      setVideoData(data.value || []);
    };

    loadData();
  }, [idSite]);


  return (
    <div>
      <h1>{videoPageTableConfig.title}</h1>
      <DataTable data={videoData}/>
    </div>
  );
};

export default VideoDataPage;
