import React, { useState, useContext, useEffect } from 'react';
import MultiChartComponent from '../../components/MultiChartComponent';
import { comparisonChartsConfig } from './ComparatorList';
import { IdSiteContext } from '../../contexts/idSiteContext';
import ChartOptions from '../../components/chartOptions';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { IoIosClose } from "react-icons/io";
import { setTitle } from '../../components/Header';

const ChartComparator = () => {
    const [datasets, setDatasets] = useState([]);
    const { idSite } = useContext(IdSiteContext);
    const [loading, setLoading] = useState(false);
    const [selectedMetrics, setSelectedMetrics] = useState({});
    const [metricsData, setMetricsData] = useState({});
    const [activeSection, setActiveSection] = useState(null);

    useEffect(() => {
        setTitle('Comparador de Gráficas');
    }, []);
    
    useEffect(() => {
        const fetchMetricsData = async () => {
            setLoading(true);
            const data = {};
            for (const chart of comparisonChartsConfig) {
                if (chart.getData) {
                    try {
                        const chartData = await chart.getData(idSite, "day", "2024-03-01,yesterday");
                        data[chart.title] = chartData.metrics;
                    } catch (error) {
                        console.error(`Error fetching data for chart ${chart.title}:`, error);
                    }
                } else {
                    data[chart.title] = chart.metrics;
                }
            }
            setMetricsData(data);
            setLoading(false);
        };
        fetchMetricsData();
    }, [idSite]);

    const handleMetricSelect = async (chart, metric) => {
        const chartTitle = chart.title;
        const isDeselected = selectedMetrics[chartTitle]?.includes(metric);

        setSelectedMetrics(prevSelectedMetrics => {
            const chartInfo = prevSelectedMetrics[chartTitle] || [];
            const metrics = isDeselected
                ? chartInfo.filter(m => m !== metric)
                : [...chartInfo, metric];
           
            const updatedMetrics = {
                ...prevSelectedMetrics,
                [chartTitle]: metrics,
            };
            return updatedMetrics;
        });

        if (isDeselected) {
            console.log('Deselected metric:', metric, datasets);
            // Remove the corresponding dataset if the metric was deselected
            setDatasets(prevDatasets =>
                prevDatasets.filter(ds => ds.id !== `${chartTitle}-${metric}`)
            );
            console.log('Datasets:', datasets);
        } else {
            const selectedChartConfig = comparisonChartsConfig.find(c => c.title === chartTitle);
            if (selectedChartConfig) {
                setLoading(true);
                const updatedChartConfig = await selectedChartConfig.getData(idSite, "day", "2024-03-01,yesterday");
                const newDataset = {
                    id: `${chartTitle}-${metric}`,
                    title: `${updatedChartConfig.title} - ${updatedChartConfig.metrics[metric]}`,
                    data: Object.entries(updatedChartConfig.data.value).map(([date, metrics]) => metrics[metric] || 0),
                    labels: Object.keys(updatedChartConfig.data.value),
                    color: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`,
                };

                setDatasets(prevDatasets => [
                    ...prevDatasets,
                    newDataset
                ]);

                setLoading(false);
            }
        }
    };

    const handleRemoveDataset = (indexToRemove) => {
        setDatasets(prevDatasets => prevDatasets.filter((_, index) => index !== indexToRemove));
    };

    const toggleSection = (section) => {
        setActiveSection(activeSection === section ? null : section);
    };

    return (
        <div className="comparator-container">
            <nav className="top-menu">
                <ul>
                    {comparisonChartsConfig.map((chart) => (
                        <li key={chart.title} onClick={() => toggleSection(chart.title)}>
                            {chart.title} {activeSection === chart.title ? <FaChevronUp /> : <FaChevronDown />}
                        </li>
                    ))}
                </ul>
            </nav>

            {comparisonChartsConfig.map((chart) => (
                <div className={`dropdown-section ${activeSection === chart.title ? 'active' : ''}`} key={chart.title}>
                    {activeSection === chart.title && (
                        <ChartOptions
                            chartConfig={[chart]} // Only pass the current chart config
                            selectedMetrics={selectedMetrics}
                            onMetricSelect={handleMetricSelect}
                            metricsData={metricsData}
                        />
                    )}
                </div>
            ))}

            <div className='MultiChartPage'>
                <MultiChartComponent datasets={datasets} labels={datasets[0]?.labels || []} title="Comparación de Gráficas" loading={loading} />
            </div>

            <div className="datasets-buttons">
                {datasets.map((dataset, index) => (
                    <button key={index} onClick={() => handleRemoveDataset(index)}>
                        {dataset.title}<IoIosClose />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ChartComparator;
