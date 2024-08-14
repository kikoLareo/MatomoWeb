import React, { useState, useEffect, useContext } from 'react';
import { IdSiteContext } from '../contexts/idSiteContext';

const ChartOptions = ({ chartConfig, selectedMetrics, onMetricSelect }) => {
    const [metricsData, setMetricsData] = useState({});
    const { idSite } = useContext(IdSiteContext);

    useEffect(() => {
        const fetchData = async () => {
            const data = {};
            for (const chart of chartConfig) {
                if (chart.getData) {
                    var chartData = await chart.getData(idSite);
                    data[chart.title] = chartData.metrics;
                } else {
                    data[chart.title] = chart.metrics;
                }
            }
            setMetricsData(data);
        };
        fetchData();
    }, [idSite, chartConfig]);

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