import React, { useState } from "react";

export const FilterMinutes = ({ onMinutesChange }) => {
    const [time, setTime] = useState('');

    const handleTimeChange = (e) => {
        const value = e.target.value;
        setTime(value);
        onMinutesChange(value); 
    };

    return (
        <div>
            <label>
                Select Time:
                <select value={time} onChange={handleTimeChange}>
                    <option value="">Select...</option>
                    <option value="5">5 minutes</option>
                    <option value="10">10 minutes</option>
                    <option value="15">15 minutes</option>
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="180">3 hours</option>
                    <option value="300">5 hours</option>
                    <option value="600">10 hours</option>
                    <option value="1440">24 hours</option>
                </select>
            </label>
        </div>
    );
};

export default FilterMinutes;