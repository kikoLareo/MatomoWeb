import React, { useState, useEffect, useContext } from 'react';
import { IdSiteContext } from '../contexts/idSiteContext';

export const DataOverviewTable = ({ fetchDataFunction }) => {
    const [data, setData] = useState(null);
    const [metadata, setMetadata] = useState({});
    const [period, setPeriod] = useState('day');
    const [date, setDate] = useState('yesterday');
    const { idSite } = useContext(IdSiteContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if(!period)
                    setPeriod('day');
                if(!date)
                    setDate('yesterday');
                
                const result = await fetchDataFunction(idSite, period, date);
                setData(result.value);
                setMetadata(result.info.metadata.columns);
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

    if (!data || !Object.keys(metadata).length) {
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
