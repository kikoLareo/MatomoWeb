import React, { useState, useContext, useEffect } from 'react';
import MultiChartComponent from '../../components/MultiChartComponent';
import { comparisonChartsConfig } from './ComparatorList';
import { IdSiteContext } from '../../contexts/idSiteContext';
import ChartOptions from '../../components/chartOptions';
import './Comparator.css';

const ChartComparator = () => {
    const [datasets, setDatasets] = useState([]);
    const { idSite } = useContext(IdSiteContext);
    const [loading, setLoading] = useState(false);
    const [selectedMetrics, setSelectedMetrics] = useState({});
    const [metricsData, setMetricsData] = useState({});
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [collapsedSections, setCollapsedSections] = useState({});

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
        console.log('Selected metric:', chartTitle, metric, selectedMetrics);
        setSelectedMetrics(prevSelectedMetrics => {
            const chartInfo = prevSelectedMetrics[chartTitle] || [];
            const metrics = chartInfo.includes(metric)
                ? chartInfo.filter(m => m !== metric)
                : [...chartInfo, metric];
           
            const updatedMetrics = {
                ...prevSelectedMetrics,
                [chartTitle]: metrics,
            };
        
            console.log('Updated metrics:', updatedMetrics); 
            return updatedMetrics;
        });
    
        const selectedChartConfig = comparisonChartsConfig.find(c => c.title === chartTitle);
        if (selectedChartConfig) {
            console.log('Selected chart config:', selectedChartConfig, selectedMetrics);
            setLoading(true);
            const updatedChartConfig = await selectedChartConfig.getData(idSite, "day", "2024-03-01,yesterday");
            const newDatasets = {
                title: `${updatedChartConfig.title} - ${updatedChartConfig.metrics[metric]}`,
                data: Object.entries(updatedChartConfig.data.value).map(([date, metrics]) => metrics[metric] || 0),
                labels: Object.keys(updatedChartConfig.data.value),
                color: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`,
            };

            console.log('New datasets:', newDatasets);

            setDatasets(prevDatasets => [
                ...prevDatasets,
                newDatasets
            ]);

            setLoading(false);
        }
    };

    const handleRemoveDataset = (indexToRemove) => {
        setDatasets(prevDatasets => prevDatasets.filter((_, index) => index !== indexToRemove));
    };

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const toggleSectionCollapse = (section) => {
        setCollapsedSections(prevCollapsedSections => ({
            ...prevCollapsedSections,
            [section]: !prevCollapsedSections[section],
        }));
    };

    return (
        <div className={`comparator-container ${isSidebarVisible ? '' : 'collapsed-sidebar'}`}>
            <button className="toggle-sidebar-btn" onClick={toggleSidebar}>
                {isSidebarVisible ? 'Esconder' : 'Mostrar'} Menú
            </button>

            {isSidebarVisible && (
                <div className="chart-options-container">
                    {comparisonChartsConfig.length > 0 && (
                        <div>
                            <h2 onClick={() => toggleSectionCollapse('metrics')}>Métricas principales</h2>
                            {!collapsedSections['metrics'] && (
                                <ChartOptions
                                    chartConfig={comparisonChartsConfig}
                                    selectedMetrics={selectedMetrics}
                                    onMetricSelect={handleMetricSelect}
                                    metricsData={metricsData}
                                />
                            )}

                            <h2 onClick={() => toggleSectionCollapse('visitSummary')}>Resumen de visitas</h2>
                            {!collapsedSections['visitSummary'] && (
                                <ChartOptions
                                    chartConfig={comparisonChartsConfig}
                                    selectedMetrics={selectedMetrics}
                                    onMetricSelect={handleMetricSelect}
                                    metricsData={metricsData}
                                />
                            )}
                        </div>
                    )}
                </div>
            )}

            <div className='MultiChartPage'>
                <MultiChartComponent datasets={datasets} labels={datasets[0]?.labels || []} title="Comparación de Gráficas" loading={loading} />
            </div>

            <div className="datasets-buttons">
                {datasets.map((dataset, index) => (
                    <button key={index} onClick={() => handleRemoveDataset(index)}>
                        Quitar {dataset.title}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ChartComparator;
