import React, { useContext, useState } from 'react';
import { visitsCharts_frequency } from '../../../config/chartsConfig';
import { IdSiteContext } from '../../../contexts/idSiteContext';
import ChartOptions from '../../../components/chartOptions';
import ChartComponent from '../../../components/ChartComponent';
import PieChartComponent from '../../../components/PieChartComponent';
import useFetchChartData from '../../../hooks/useFetchChartData';

const VisitFrequency = () => {
  const { idSite } = useContext(IdSiteContext);
  const [selectedCharts, setSelectedCharts] = useState([]);
  const chartData = useFetchChartData(idSite, visitsCharts_frequency);

  const handleChartSelect = (selectedChart) => {
    setSelectedCharts((prevSelectedCharts) => [...prevSelectedCharts, selectedChart]);
  };

  return (
    <div className="page">
      <h1>Visitas</h1>
      <div className="visitsGraphs">
        <ChartOptions chartConfig={visitsCharts_frequency.metrics} onChartSelect={handleChartSelect} />
        <div>
          {selectedCharts.map((chartTitle) => {
            const chartConfig = visitsCharts_frequency.find(chart => chart.title === chartTitle);
            const data = chartData[chartTitle];
            if (!data) return null;

            return (
              <div key={chartTitle}>
                <h3>{chartTitle}</h3>
                {chartConfig.type === 'pie' ? (
                  <PieChartComponent data={data.data} labels={data.labels} title={data.title} />
                ) : (
                  <ChartComponent data={data.data} labels={data.labels} title={data.title} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VisitFrequency;