// src/components/SelectGraphs.js
import React from 'react';

const SelectGraphs = ({ options, selectedOptions, onChange }) => {
  const handleSelectChange = (event) => {
    const { options } = event.target;
    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value);
      }
    }
    onChange(selectedValues);
  };

  return (
    <div>
      <label htmlFor="graph-select">Select Graphs: </label>
      <select
        id="graph-select"
        multiple={true}
        value={selectedOptions}
        onChange={handleSelectChange}
        style={{ height: '200px', width: '200px' }}
      >
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectGraphs;
