// src/components/Filters.js
import React, { useContext } from 'react';
import { IdSiteContext } from '../contexts/idSiteContext';
import { idSiteOptions } from '../config';

const Filters = () => {
  const { idSite, setIdSite } = useContext(IdSiteContext);

  return (
    <div className="options">
      <div className="optionsSite">
        <label>
          <h3>Seleccionar idSite:</h3>
          <select value={idSite} onChange={(e) => setIdSite(Number(e.target.value))}>
            {Object.entries(idSiteOptions).map(([label, value]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};

export default Filters;
