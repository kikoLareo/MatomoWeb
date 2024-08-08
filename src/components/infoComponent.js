// src/components/InfoComponent.js
import React from 'react';
import { useContext } from 'react';
import { IdSiteContext } from '../contexts/idSiteContext';
import { fetchData } from '../utils/fetchDataHelper';

const InfoComponent = async ({ title, data }) => {
  const {idSite} = useContext(IdSiteContext);

  console.log(data);
  const dataFetched=await fetchData(idSite, data);

  console.log(dataFetched);
  return (
    <div className="info-component">
      <h3>{title}</h3>
      <div className="data">
        {data !== undefined ? (
          <span>{dataFetched}</span>
        ) : (
          <span>Loading...</span>
        )}
      </div>
    </div>
  );
};

export default InfoComponent;
