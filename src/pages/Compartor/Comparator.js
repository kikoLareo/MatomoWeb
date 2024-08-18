// Comparator.js
import React, { useState, useContext, useEffect } from 'react';
import MultiChartComponent from '../../components/MultiChartComponent';
import { comparisonChartsConfig } from './ComparatorList';
import { IdSiteContext } from '../../contexts/idSiteContext';
import ChartOptions from '../../components/chartOptions';

const ChartComparator = () => {
    const [datasets, setDatasets] = useState([]);
    const { idSite } = useContext(IdSiteContext);
    const [loading, setLoading] = useState(false);
    const [selectedMetrics, setSelectedMetrics] = useState({});
    const [metricsData, setMetricsData] = useState({});

    // Función para cargar las métricas disponibles para cada gráfica
    useEffect(() => {
        const fetchMetricsData = async () => {
            setLoading(true);
            const data = {};
            for (const chart of comparisonChartsConfig) {
                if (chart.getData) {
                    try {
                        const chartData = await chart.getData(idSite);
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
            const updatedChartConfig = await selectedChartConfig.getData(idSite);
            const newDatasets = selectedMetrics.map(metric => ({
                title: `${updatedChartConfig.title} - ${updatedChartConfig.metrics[metric]}`,
                data: updatedChartConfig.data.value.map(item => item[metric] || 0),
                labels: updatedChartConfig.labels,
                color: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`,
            }));
            setDatasets(prevDatasets => [
                ...prevDatasets.filter(ds => ds.title.split(' - ')[0] !== chartTitle),
                ...newDatasets
            ]);
            setLoading(false);
        }
    };

    const handleRemoveDataset = (indexToRemove) => {
        setDatasets(prevDatasets => prevDatasets.filter((_, index) => index !== indexToRemove));
    };

    return (
        <div style={{ display: "flex" }}>
            <div>
                {comparisonChartsConfig.length > 0 && (
                    <ChartOptions
                        chartConfig={comparisonChartsConfig}
                        selectedMetrics={selectedMetrics}
                        onMetricSelect={handleMetricSelect}
                        metricsData={metricsData}
                    />
                )}
            </div>

            <div>
                {loading && <p>Cargando datos...</p>}
                {datasets.length > 0 ? (
                    <MultiChartComponent datasets={datasets} labels={datasets[0].labels} title="Comparación de Gráficas" />
                ) : (
                    <p>Seleccione gráficos para comparar.</p>
                )}
            </div>

            <div>
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