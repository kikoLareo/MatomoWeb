import React, { useState, useEffect, useContext } from 'react';
import { IdSiteContext } from '../contexts/idSiteContext';
import FilterMinutes from './LastMinutesFilter';
import {titles} from '../utils/dictionaryMetrics/metricsTitles';

export const DataOverviewTable = ({ chartConfig }) => {
  console.log('chartConfig', chartConfig);
  var { fetchDataFunction, params, title } = chartConfig;
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
    if (Array.isArray(data)) {
      return data.map((item) => {
          return Object.keys(data).map(key => ({
            label:item.label? item.label : chart.metrics[key] || titles[key] || key,
            value: item.value? item.value:  data[key]
          }));
      });
    } 
  
      return Object.keys(data).map(key => ({
        label: chart.metrics[key] || titles[key] || key,
        value: data[key]
      }));
    
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const args = [idSite];        
        if (params.includes("period")) args.push(period);
        if (params.includes("date")) args.push(date);
        if (params.includes("lastMinutes")) args.push(lastMinutes);

        const data = await chartConfig.getData(...args);
        const result = data.data;

        if (result.value) {
          setData(formatDataForTable(data));
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
      <h2>{title}</h2>
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
              <span>{item.value}</span> {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataOverviewTable;
