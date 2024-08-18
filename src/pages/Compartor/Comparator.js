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
              console.log("data title",data);
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
  
    const handleSelectChange = async (event) => {
      const selectedValue = event.target.value;
      const selectedChartConfig = comparisonChartsConfig.find(chart => chart.title === selectedValue);
  
      if (selectedChartConfig) {
        setLoading(true);
        const updatedChartConfig = await selectedChartConfig.getData(idSite);
        const metrics = selectedMetrics[selectedChartConfig.title] || Object.keys(updatedChartConfig.metrics);
        metrics.forEach(metric => {
          const newDataset = {
            title: `${updatedChartConfig.title} - ${updatedChartConfig.metrics[metric]}`,
            data: updatedChartConfig.data.value.map(item => item[metric] || 0),
            labels: updatedChartConfig.labels,
            color: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`,
          };
          setDatasets(prevDatasets => [...prevDatasets, newDataset]);
        });
        setLoading(false);
      }
    };
  
    const handleMetricSelect = (chart, metric) => {
      const chartTitle = chart.title;
      setSelectedMetrics(prevSelectedMetrics => {
        const chartInfo = prevSelectedMetrics[chartTitle] || [];
        const metrics = chartInfo.includes(metric)
          ? chartInfo.filter(m => m !== metric)
          : [...chartInfo, metric];
        return {
          ...prevSelectedMetrics,
          [chartTitle]: metrics,
        };
      });
    };
  
    const handleRemoveDataset = (indexToRemove) => {
      setDatasets(prevDatasets => prevDatasets.filter((_, index) => index !== indexToRemove));
    };
  
    return (
      <div>
       <select onChange={handleSelectChange} disabled={loading}>
        <option value="">Seleccione una métrica</option>
        {comparisonChartsConfig.map(chart => (
            <optgroup key={chart.title} label={chart.title}>
                {metricsData[chart.title] && Object.keys(chart.metrics).map(metric => (
                    <option key={metric} value={`${chart.title}-${metric}`}>
                        {chart.metrics[metric]}
                    </option>
                ))}
            </optgroup>
        ))}
    </select>

  
        {loading && <p>Cargando datos...</p>}
  
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