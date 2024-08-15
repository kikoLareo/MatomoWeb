import React, { useState } from "react";

export const FilterPeriod = ({ onPeriodChange }) => {
    const [period, setPeriod] = useState('day');


    const handlePeriodChange = (e) => {
        const newPeriod = e.target.value;
        setPeriod(newPeriod);
        onPeriodChange(newPeriod); // Notify parent component
    };
    return (
             <label>
                    Period:
                    <select value={period} onChange={handlePeriodChange}>
                        <option value="day">Day</option>
                        <option value="week">Week</option>
                        <option value="month">Month</option>
                        <option value="year">Year</option>
                    </select>
                </label>
        
    );
};

export default FilterPeriod;