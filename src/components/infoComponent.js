import React, { useState, useEffect, useContext } from 'react';
import { IdSiteContext } from '../contexts/idSiteContext';
import { fetchData } from '../utils/fetchDataHelper';

const InfoComponent = ({ data }) => {
  const { idSite } = useContext(IdSiteContext);
  const [dataFetched, setDataFetched] = useState(null);

  useEffect(() => {
    const fetchDataAsync = async () => {
      const result = await fetchData(idSite, data);
      setDataFetched(result);
    };

    fetchDataAsync();
  }, [idSite, data]);

  return (
    <div className="info-component">
      <h3>{dataFetched ? dataFetched.title : 'Loading...'}</h3>
      <div className="data">
        {dataFetched ? (
          <span>{dataFetched.value}</span>
        ) : (
          <span>Loading...</span>
        )}
      </div>
    </div>
  );
};

export default InfoComponent;