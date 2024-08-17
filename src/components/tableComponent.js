import React, { useState, useEffect, useContext } from 'react';
import { IdSiteContext } from '../contexts/idSiteContext';
import FilterMinutes from './LastMinutesFilter';
import { titles } from '../utils/dictionaryMetrics/metricsTitles';

export const DataOverviewTable = ({ chartConfig }) => {
  const { fetchDataFunction, params, title } = chartConfig;
  const [data, setData] = useState(null);
  const [metadata, setMetadata] = useState({});
  const [period, setPeriod] = useState('day');
  const [date, setDate] = useState('yesterday');
  const { idSite } = useContext(IdSiteContext);
  const [lastMinutes, setLastMinutes] = useState(30);

  const formatDataForTable = (data) => {
    if (Array.isArray(data)) {
      return data.map(item => {
        if (item.label && item.value !== undefined) {
          return {
            label: item.label,
            value: item.value
          };
        }
        return item;
      });
    } else if (typeof data === 'object') {
      return Object.keys(data).map(key => ({
        label: key,
        value: data[key]
      }));
    } else {
      return [{ label: 'No Data', value: 'No Data Available' }];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const args = [idSite];
        if (params.includes("period")) args.push(period);
        if (params.includes("date")) args.push(date);
        if (params.includes("lastMinutes")) args.push(lastMinutes);

        const result = await fetchDataFunction(...args);

        if (result.value && result.value.length > 0) {
          setData(formatDataForTable(result.value));
        } else {
          setData([{ label: 'No Data', value: 'No Data Available' }]);
        }

        setMetadata(result.info?.metadata?.columns || titles || {});
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [fetchDataFunction, idSite, period, date, lastMinutes, params]);

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
              <span>{item.value}</span> {metadata[item.label] || item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataOverviewTable;
