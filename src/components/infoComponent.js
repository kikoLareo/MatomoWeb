// src/components/InfoComponent.js
import React from 'react';
import { useContext } from 'react';
import { IdSiteContext } from '../contexts/idSiteContext';
import { fetchDataForCharts } from '../utils/fetchDataHelper';

const InfoComponent = ({ title, data }) => {
  const {idSite} = useContext(IdSiteContext);

  const dataFetched= fetchDataForCharts(idSite, data);

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
