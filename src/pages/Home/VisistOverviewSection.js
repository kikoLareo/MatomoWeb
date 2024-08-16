import React, { useEffect, useState, useContext } from 'react';
import { IdSiteContext } from '../../contexts/idSiteContext';
import { homeCharts_VisitsSection } from './homePageConfig';

const VisitsOverviewSection = () => {
  const { idSite } = useContext(IdSiteContext);
  const [loading, setLoading] = useState(true);
  const [visitsSummary, setVisitsSummary] = useState(null);
  const [visitsEvolution, setVisitsEvolution] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const summaryChart = homeCharts_VisitsSection.find(chart => chart.title === 'Visits - Summary');
        const evolutionChart = homeCharts_VisitsSection.find(chart => chart.title === 'Visits - Evolution');
        
        const summaryData = await summaryChart.getData(idSite);
        const evolutionData = await evolutionChart.getData(idSite);
        
        setVisitsSummary(summaryData);
        setVisitsEvolution(evolutionData);
      } catch (error) {
        console.error('Error fetching visits data:', error);
      }
      setLoading(false);
    };
    fetchData();
  }, [idSite]);

  if (loading) {
    return <div>Loading data...</div>;
  }

  return (
    <div className="visits-overview-section">
      <h2>Visits Overview</h2>
      {visitsSummary && (
        <div className="visits-summary">
          <h3>{visitsSummary.title}</h3>
          <p>{visitsSummary.description}</p>
          <pre>{JSON.stringify(visitsSummary.data, null, 2)}</pre>
        </div>
      )}
      {visitsEvolution && (
        <div className="visits-evolution">
          <h3>{visitsEvolution.title}</h3>
          <p>{visitsEvolution.description}</p>
          <pre>{JSON.stringify(visitsEvolution.data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default VisitsOverviewSection;