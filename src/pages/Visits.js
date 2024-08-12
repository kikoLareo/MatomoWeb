import React from 'react';
import { visitsCharts } from '../config/chartsConfig';
import useGraph from '../utils/getGraph';

const Visits = () => {


   

  return (
    <div className="Visits">
      <h1>Visitas</h1>
      <div className="visitsGraphs">
          <div>
            {useGraph(visitsCharts)}
          </div>
        
      </div>
    </div>
  );
}


export default Visits;