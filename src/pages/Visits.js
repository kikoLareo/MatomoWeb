import { useContext, useState, useEffect } from 'react';
import { IdSiteContext } from '../contexts/idSiteContext';
import { fetchDataForCharts } from '../utils/fetchDataHelper';
import { visitsCharts } from '../config/chartsConfig';
import getGraph from '../utils/getGraph';

const Visits = () => {
  const { idSite } = useContext(IdSiteContext);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchDataForCharts(idSite, visitsCharts);
      setChartData(data);
    };

    fetchData();
  }, [idSite]);

  return (
    <div className="Visits">
      <h1>Visitas</h1>
      <div className="visitsGraphs">
        {visitsCharts.map((chart) => (
          <div key={chart.title}>
            {getGraph({
              ...chart,
              data: chartData[chart.title]?.data || [],
              metrics: chart.metrics,
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Visits;