import React, { useState, useEffect } from 'react';

const DataTable = ({ chart }) => {
    var data = chart.data.value;
  const [sortedData, setSortedData] = useState(data);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  console.log("Video page data: ", data, chart);
  useEffect(() => {
    setSortedData(data);
  }, [data]);

  const sortData = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    const sorted = [...sortedData].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    setSortedData(sorted);
    setSortConfig({ key, direction });
  };

  return (
    <table>
      <thead>
        <tr>
          {chart.columns.map((column) => (
            <th key={column.key} onClick={() => sortData(column.key)}>
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((item, index) => (
          <tr key={index}>
            {chart.columns.map((column) => (
              <td key={column.key}>{item[column.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
