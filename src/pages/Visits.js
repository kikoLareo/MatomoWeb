import React, { useContext, useEffect } from 'react';
import { visitsCharts } from '../config/chartsConfig';
import getGraph from '../utils/getGraph';
import { IdSiteContext } from '../contexts/idSiteContext';

const Visits = () => {
  const { idSite } = useContext(IdSiteContext);

  useEffect(() => {

    visitsCharts.forEach(async (chart) => {
      await chart.getData(idSite); // Llama a getData cuando idSite cambia
      console.log(chart);
    });
  }, [idSite]);

  return (
    <div className="Visits">
      <h1>Visitas</h1>
      <div className="visitsGraphs">
        {visitsCharts.map((chart) => (
          <div key={chart.title}>
            {getGraph({
              ...chart
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Visits;