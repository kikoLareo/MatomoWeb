import React, { useState } from 'react';

const ChartOptions = ({ chartConfig, onChartSelect }) => {
    const [selectedChart, setSelectedChart] = useState(chartConfig[0]);

    const handleChartSelect = (e) => {
        const selectedOption = e.target.value;
        setSelectedChart(selectedOption);
        onChartSelect(selectedOption);
    };

    return (
        <div className="sidebar">
            <select value={selectedChart} onChange={handleChartSelect}>
                {chartConfig.map((chart) => (
                    <option key={chart.title} value={chart.title}>
                        {chart.title}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ChartOptions;