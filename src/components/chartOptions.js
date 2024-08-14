import React, { useState, useEffect, useContext } from 'react';
import { IdSiteContext } from '../contexts/idSiteContext';

const ChartOptions = ({ chartConfig, onMetricSelect }) => {
    const [selectedMetrics, setSelectedMetrics] = useState({});
    const [metricsData, setMetricsData] = useState({});
    const { idSite } = useContext(IdSiteContext);

    // Fetch metrics data when chartConfig or idSite changes
    useEffect(() => {
        const fetchData = async () => {
            const data = {};
            for (const chart of chartConfig) {
                if (chart.getData) {
                    const chartData = await chart.getData(idSite);
                    data[chart.title] = chartData.metrics;
                }
            }
            setMetricsData(data);
        };
    
        fetchData();
    }, [idSite, chartConfig]);

    // Load saved metrics from localStorage
    useEffect(() => {
        const savedMetrics = localStorage.getItem('selectedMetrics');
        if (savedMetrics) {
            setSelectedMetrics(JSON.parse(savedMetrics));
        }
    }, []);

    // Update localStorage when selectedMetrics changes
    useEffect(() => {
        localStorage.setItem('selectedMetrics', JSON.stringify(selectedMetrics));
    }, [selectedMetrics]);

    // Handle metric selection
    const handleMetricSelect = (chart, metric) => {
        const chartTitle = chart.title;
        setSelectedMetrics((prevSelectedMetrics) => {
            const metrics = prevSelectedMetrics[chartTitle] || [];
            const updatedMetrics = metrics.includes(metric)
                ? metrics.filter(m => m !== metric)
                : [...metrics, metric];

            return {
                ...prevSelectedMetrics,
                [chartTitle]: updatedMetrics,
            };
        });
    };

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
                                        onChange={() => handleMetricSelect(chart, metric)}
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
