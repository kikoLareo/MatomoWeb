// VisitsOverviewSection.js
import React, { useEffect, useState, useContext } from 'react';
import { IdSiteContext } from '../../contexts/idSiteContext';
import { homeCharts_VisitsSection_Evolution } from './homePageConfig';
import DataOverviewTable from '../../components/tableComponent';
import GraphRenderer from '../../utils/GraphRenderer';
import { homeCharts_VisitsSection_Overview } from './homePageConfig';
const VisitsOverviewSection = () => {
  const { idSite } = useContext(IdSiteContext);
  const [loading, setLoading] = useState(true);
  const [visitsEvolution, setVisitsEvolution] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const evolutionData = await homeCharts_VisitsSection_Evolution.getData(idSite); 
        console.log('evolutionData', evolutionData);
        setVisitsEvolution(evolutionData);
      } catch (error) {
        console.error('Error fetching visits data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [idSite]);

  if (loading) {
    return <div>Loading data...</div>;
  }

  return (
    <div className="visits-overview-section">
      <h2>Visits Overview</h2>
      {homeCharts_VisitsSection_Overview.map((chart) => (
      <DataOverviewTable  chartConfig={chart} />
      ))}
      <GraphRenderer
        chart={{
          type: homeCharts_VisitsSection_Evolution.type,
          labels: Object.keys(visitsEvolution.data.value),
          data: Object.values(visitsEvolution.data.value).map(((value) => value["nb_visits"] || 0)),
          title: "Visits - Evolution",
          metricType: 'number',
        }}
        />
      
    </div>
  );
};

export default VisitsOverviewSection;
