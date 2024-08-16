import React, { useState, useEffect, useContext } from 'react';
import { IdSiteContext } from '../contexts/idSiteContext';

export const DataOverviewTable = ({ fetchDataFunction }) => {
    const [data, setData] = useState(null);
    const [metadata, setMetadata] = useState({});
    const [period, setPeriod] = useState('day');
    const [date, setDate] = useState('yesterday');
    const { idSite } = useContext(IdSiteContext);

    function formatDuration(seconds) {
        if (seconds < 3600) {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            return `${minutes} min ${remainingSeconds}s`;
        } else {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const remainingSeconds = seconds % 60;
            return `${hours} hour ${minutes} min ${remainingSeconds}s`;
        }
    }
    


    useEffect(() => {
        const fetchData = async () => {
            try {
                if(!period)
                    setPeriod('year');
                if(!date)
                    setDate('yesterday');
               
                const result = await fetchDataFunction(idSite, period, date);
                if (result.info.metricTypes.find(metric => metric === 'duration_s')) {
                    const metricKey = Object.keys(result.info.metrics).find(key => result.info.metrics[key] === 'duration_s');
                    const durationInSeconds = result.value[metricKey];
                    result.value[metricKey] = formatDuration(durationInSeconds);
                }
                setData(result.value);
                setMetadata(result.info.columns);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [fetchDataFunction, idSite, period, date]);

    const handlePeriodChange = (e) => {
        setPeriod(e.target.value);
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    if (!data || !metadata) {
        return <div>Loading...</div>;
    }

    return (
        <div className="data-overview-table">
            <div className="filter-options">
                <label>
                    Period:
                    <select value={period} onChange={handlePeriodChange}>
                        <option value="day">Day</option>
                        <option value="week">Week</option>
                        <option value="month">Month</option>
                        <option value="year">Year</option>
                    </select>
                </label>
                <label>
                    Date:
                    <input type="text" value={date} onChange={handleDateChange} placeholder="yyyy-mm-dd or 'today', 'yesterday'" />
                </label>
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
