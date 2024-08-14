import React from 'react';

const ChartOptions = ({ chartConfig, selectedMetrics, onMetricSelect, metricsData }) => {
    return (
        <div className="chart-options">
            {chartConfig.map((chart) => (
                <div key={chart.title} className="chart-block">
                    <h3 className="chart-title">{chart.title}</h3>
                    <ul className="metrics-list">
                        {metricsData[chart.title] && Object.entries(metricsData[chart.title]).map(([metric, value]) => (
                            <li key={metric} className="metrics-item">
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedMetrics[chart.title]?.includes(metric) || false}
                                        onChange={() => onMetricSelect(chart, metric)}
                                    />
                                    {value}
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