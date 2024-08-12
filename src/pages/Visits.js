import React, { useContext } from 'react';
import { visitsCharts } from '../config/chartsConfig';
import useGraph from '../utils/getGraph';
import { IdSiteContext } from '../contexts/idSiteContext'; // Importa el contexto

const Visits = () => {
  const idSite = useContext(IdSiteContext); // Obtén idSite del contexto

  return (
    <div className="Visits">
      <h1>Visitas</h1>
      <div className="visitsGraphs">
        <div>
          {useGraph(visitsCharts, idSite)} 
        </div>
      </div>
    </div>
  );
}

export default Visits;