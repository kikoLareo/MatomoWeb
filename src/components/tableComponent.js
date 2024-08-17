
import React, { useState, useEffect, useContext } from 'react';
import { IdSiteContext } from '../contexts/idSiteContext';
import FilterMinutes from './LastMinutesFilter';
import { titles } from '../utils/dictionaryMetrics/metricsTitles';

export const DataOverviewTable = ({chartConfig }) => {
  var {fetchDataFunction, params, title}  =chartConfig;

  const [data, setData] = useState(null);
  const [metadata, setMetadata] = useState({});
  const [period, setPeriod] = useState('day');
  const [date, setDate] = useState('yesterday');
  const { idSite } = useContext(IdSiteContext);
  const [lastMinutes, setLastMinutes] = useState(30);
  console.log('params', params);
  if(!params) {
    params = ["period", "date"];
  }


  const formatDataForTable = (data) => {
    if(Array.isArray(data)) {
      return data.map(item => {
        if (item.label && item.value !== undefined) {
          return {
            label: item.label,
            value: item.value
          };
        }
        return item;
      });
    }else if(data){
      return Object.keys(data).reduce((acc, key) => {
        acc[key] = data[key];
        return acc;
      }, {});
    }else{
      return data;
    }

  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(fetchDataFunction, idSite, period, date, lastMinutes, params);
        const args = [idSite];
        if (params.includes("period")) args.push(period);
        if (params.includes("date")) args.push(date);
        if (params.includes("lastMinutes")) args.push(lastMinutes);
        console.log('args', args);
        const result = await fetchDataFunction(...args);
        console.log('result', result);
        var auxData=null;
        if(result.value && result.value.length > 0) {
          if (Array.isArray(result.value)) {
              auxData= result.value[0];
          } else {
              auxData = result.value;
          } 
        } else {
          auxData = 0;
          
        }
        console.log('auxData', auxData);
        console.log(formatDataForTable(auxData));
        setData(formatDataForTable(auxData));

         setMetadata(result.info.metadata? result.info.metadata :titles || {});

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [fetchDataFunction, idSite, period, date, lastMinutes, params]);

  console.log(data, metadata);
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
      <h2>{title}</h2>
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
              <span>{value}</span> {metadata[key]? metadata[key] : titles[key] || chartConfig.metrics[key] || key} 
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataOverviewTable;