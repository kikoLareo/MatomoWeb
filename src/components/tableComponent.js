import React, { useState, useEffect, useContext } from 'react';
import { IdSiteContext } from '../contexts/idSiteContext';
import FilterMinutes from './LastMinutesFilter';
import {titles} from '../utils/dictionaryMetrics/metricsTitles';

export const DataOverviewTable = ({ chartConfig }) => {
  console.log('chartConfig', chartConfig);
  var { fetchDataFunction, params } = chartConfig;
  if(!params) {
    params = ["period", "date"];
  }
  const [data, setData] = useState(null);
  const [period, setPeriod] = useState('day');
  const [date, setDate] = useState('yesterday');
  const { idSite } = useContext(IdSiteContext);
  const [lastMinutes, setLastMinutes] = useState(30);

  const formatDataForTable = (chart) => {
    let data = chart.data.value;

    // Si data es un array
    if (Array.isArray(data)) {
      return data.map((item) => {
          // Caso 1: Formato con label y value
          if ('label' in item && 'value' in item) {
              return {
                  label: item.label,
                  value: item.value,
              };
          }

          // Caso 2: Formato genérico de objeto dentro de array
          return Object.keys(item).map(key => ({
              label: chart.metrics[key] || titles[key] || key,
              value: item[key]
          }));
      }).flat();  // Flatten en caso de que el segundo formato genere arrays anidados
  }

    // Si data es un objeto
    return Object.keys(data).map(key => ({
        label: chart.metrics[key] || titles[key] || key,
        value: data[key]
    }));
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const args = [idSite];        
        if (params.includes("period")){
          args.push(period);
          args.push(date);
        } 
        if (params.includes("lastMinutes")) args.push(lastMinutes);

        const data = await chartConfig.getData(...args);
        const result = data.data;

        if (result.value) {
          setData(formatDataForTable(data));
          console.log('Fomatted data:', formatDataForTable(data));
        } else {
          setData([{ label: 'No Data', value: 'No Data Available' }]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [fetchDataFunction, idSite, period, date, lastMinutes, params, chartConfig]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="data-overview-table">
      <div className="filter-options">
        {params.includes("period") && (
          <label>
            Period:
            <select value={period} onChange={(e) => setPeriod(e.target.value)}>
              <option value="day">Day</option>
              <option value="week">Week</option>
              <option value="month">Month</option>
              <option value="year">Year</option>
            </select>
          </label>
        )}
        {params.includes("date") && (
          <label>
            Date:
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="yyyy-mm-dd or 'today', 'yesterday'"
            />
          </label>
        )}
        {params.includes("lastMinutes") && (
          <FilterMinutes onMinutesChange={(value) => setLastMinutes(value)} />
        )}
      </div>
      <div className="table">
        {data.map((item, index) => (
          <div className="table-row" key={index}>
            <div className="table-cell">
              {item.label}  <span>{item.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataOverviewTable;
