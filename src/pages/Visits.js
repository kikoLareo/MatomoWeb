import React, { useContext, useEffect, useState } from 'react';
import { visitsCharts } from '../config/chartsConfig';
import getGraph from '../utils/getGraph';
import { IdSiteContext } from '../contexts/idSiteContext';

const Visits = () => {
  const { idSite } = useContext(IdSiteContext);
  const [chartsData, setChartsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const updatedCharts = await Promise.all(
        visitsCharts.map(async (chart) => {
          console.log('Fetching data for chart:', chart.title);
          await chart.getData(idSite);
          console.log('Fetched data for chart:', chart);
          return chart;
        })
      );
      console.log('Updated charts:', updatedCharts);
      setChartsData(updatedCharts);
    };

    fetchData();
  }, [idSite]);

  return (
    <div className="Visits">
      <h1>Visitas</h1>
      <div className="visitsGraphs">
        {chartsData.map((chart) => (
          <div key={chart.title}>
            {getGraph(chart)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Visits;