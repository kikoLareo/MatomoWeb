
import React, { useState, useEffect, useContext } from 'react';
import { IdSiteContext } from '../contexts/idSiteContext';
import FilterMinutes from './LastMinutesFilter';

export const DataOverviewTable = ({ fetchDataFunction, params = ["period", "date"] }) => {
  const [data, setData] = useState(null);
  const [metadata, setMetadata] = useState({});
  const [period, setPeriod] = useState('day');
  const [date, setDate] = useState('yesterday');
  const { idSite } = useContext(IdSiteContext);
  const [lastMinutes, setLastMinutes] = useState(30);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const args = [idSite];
        if (params.includes("period")) args.push(period);
        if (params.includes("date")) args.push(date);
        if (params.includes("lastMinutes")) args.push(lastMinutes);

        const result = await fetchDataFunction(...args);
        setData(result.data);
        setMetadata(result.metadata);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [fetchDataFunction, idSite, period, date, lastMinutes, params]);

  const handlePeriodChange = (e) => {
    setPeriod(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleMinutesChange = (value) => {
    setLastMinutes(value);
  };

  if (!data || !metadata) {
    return <div>Loading...</div>;
  }

  return (
    <div className="data-overview-table">
      <div className="filter-options">
        {params.includes("period") && (
          <label>
            Period:
            <select value={period} onChange={handlePeriodChange}>
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
            <input type="text" value={date} onChange={handleDateChange} placeholder="yyyy-mm-dd or 'today', 'yesterday'" />
          </label>
        )}
        {params.includes("lastMinutes") && (
          <FilterMinutes onMinutesChange={handleMinutesChange} />
        )}
      </div>
      <div className="table">
        {Object.entries(data).map(([key, value]) => (
          <div className="table-row" key={key}>
            <div className="table-cell">
              <span>{value}</span> {metadata[key]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataOverviewTable;