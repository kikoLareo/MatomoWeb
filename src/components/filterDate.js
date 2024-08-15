import React, { useState } from "react";

export const FilterData = ({ onDataChange }) => {
    const [date, setDate] = useState('day');


    const handleDateChange = (e) => {
        const newDate = e.target.value;
        setDate(newDate);
        onDataChange(newDate); // Notify parent component
    };
    return (
    <label>
            Date:
            <input type="text" value={date} onChange={handleDateChange} placeholder="yyyy-mm-dd or 'today', 'yesterday'" />
    </label>
         
    );
};

export default FilterData;