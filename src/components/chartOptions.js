import React, { useState } from 'react';

const ChartOptions = ({ chartConfig, onMetricSelect }) => {
    const [selectedMetrics, setSelectedMetrics] = useState({});

    const handleMetricSelect = (chart, metric) => {
        console.log('handleMetricSelect', chart, metric);
        const chartTitle = chart.title;
        setSelectedMetrics((prevSelectedMetrics) => {
            const metrics = prevSelectedMetrics[chartTitle] || [];
            if (metrics.includes(metric)) {
                chart.selectedMetrics = metrics.filter(m => m !== metric);
                return {
                    ...prevSelectedMetrics,
                    [chartTitle]: metrics.filter(m => m !== metric),
                };
            } else {
                chart.selectedMetrics = [...metrics, metric];
                return {
                    ...prevSelectedMetrics,
                    [chartTitle]: [...metrics, metric],
                };
            }
        });
        onMetricSelect(chart, metric);
    };

    return (
        <div className="chart-options">
            {chartConfig.map((chart) => (
                <div key={chart.title} className="chart-block">
                    <h3 className="chart-title">{chart.title}</h3>
                    <ul className="metrics-list">
                        {chart.metrics.map((metric) => (
                            <li key={metric} className="metrics-item">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedMetrics[chart.title]?.includes(metric) || false}
                                        onChange={() => handleMetricSelect(chart, metric)}
                                    />
                                    {metric}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default ChartOptions;