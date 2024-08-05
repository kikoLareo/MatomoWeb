// src/components/InfoComponent.js
import React from 'react';

const InfoComponent = ({ title, data }) => {
  return (
    <div className="info-component">
      <h3>{title}</h3>
      <div className="data">
        {data !== undefined ? (
          <span>{data}</span>
        ) : (
          <span>Loading...</span>
        )}
      </div>
    </div>
  );
};

export default InfoComponent;
