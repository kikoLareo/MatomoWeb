// src/components/MediaAnalyticsGetSection.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ChartComponent from '../../components/ChartComponent';
import ChartInfo from '../../components/ChartInfo';
import { MediaAnalytics_get } from '../../modules/mediaAnalytics/mediaAnalytics';
import { IdSiteContext } from '../../contexts/idSiteContext';
import { MediaAnalytics_get_metrics } from '../../chart_config/MediaAnalytics/get_Info';
import { API_getProcessedReport } from '../../modules/API/Api_actions';
import { fetchAndSaveAnalysis } from '../../utils/gpt/fetchAndSave';

const MediaAnalyticsGetSection = () => {
  const { idSite } = useContext(IdSiteContext);
  const [chartData, setChartData] = useState({});
  const [showDescription, setShowDescription] = useState({});
  const [showMore, setShowMore] = useState({});
  const [analysis, setAnalysis] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setChartData({}); // Reiniciar el estado de las gráficas
      try {
        const dataUrl = API_getProcessedReport(idSite,'year', 'yesterday', 'MediaAnalytics', 'get', 'es', );
        const response = await axios.get(dataUrl.url);
        const processedData = response.data;

        const { url } = MediaAnalytics_get(idSite);
        const response2 = await axios.get(url);
        const data = response2.data;

        console.log(processedData, processedData.metadata, processedData.metadata.metrics);
        const newChartData = Object.keys(MediaAnalytics_get_metrics).reduce((acc, metric) => {
          const shortName = MediaAnalytics_get_metrics[metric].shortName;
          const description = MediaAnalytics_get_metrics[metric].description;

          acc[metric] = {
            labels: Object.keys(data),
            data: Object.keys(data).map(date => data[date]?.[metric] || 0),
            id: metric, // Agregar id a los datos del gráfico
            title: processedData.metadata.metrics[metric] || shortName,
            description:processedData.metadata.metricsDocumentation[metric]|| description,
            module: processedData.metadata.module,
            action: processedData.metadata.action,
          };
          return acc;
        }, {});

        setChartData(newChartData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [idSite]);



  useEffect(() => {
    const fetchAnalysis = async (metric) => {
        const { title, description, idSite, data, module, action } = chartData[metric];
        try {
            setLoading(true);
            const result = await fetchAndSaveAnalysis({ module, action, title, description, idSite, data });
            setAnalysis(prevAnalysis => ({
                ...prevAnalysis,
                [metric]: result,
            }));
        } catch (err) {
            console.error(err);
            setError('Error fetching analysis. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    Object.keys(showMore).forEach(metric => {
        if (showMore[metric] && !analysis[metric]) {
            fetchAnalysis(metric);
        }
    });
}, [showMore, analysis, chartData]);


  const toggleDescription = (metric) => {
    setShowDescription(prevState => ({
        ...prevState,
        [metric]: !prevState[metric]
    }));
};

const handleShowMore = (metric) => {
    setShowMore(prevState => ({
        ...prevState,
        [metric]: !prevState[metric],
    }));
};



  return (
    <div className="graphDashBoard">
        <div className="graphGrid">
            {Object.keys(chartData).map((metric) => (
                <div key={metric} className="graph_component">
                    {chartData[metric] ? (
                        <>
                            <ChartComponent
                                data={chartData[metric].data}
                                labels={chartData[metric].labels}
                                title={chartData[metric].title}
                            />
                            <div className="chart-controls">
                                <button onClick={() => toggleDescription(metric)}>
                                    {showDescription[metric] ? 'Hide Details' : 'Show Details'}
                                </button>
                                <button onClick={() => handleShowMore(metric)}>
                                    Show More
                                </button>
                            </div>
                            {showDescription[metric] && (
                                <ChartInfo
                                    title={chartData[metric].title}
                                    description={chartData[metric].description}
                                    data={chartData[metric].data}
                                />
                            )}
                            {showMore[metric] && (
                                <div className="detailed-info">
                                    {loading ? (
                                        <div className="skeleton-chart"></div>
                                    ) : error ? (
                                        <p>{error}</p>
                                    ) : (
                                        <p>{analysis[metric]}</p>
                                    )}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="skeleton">
                            <div className="skeleton-title"></div>
                            <div className="skeleton-chart"></div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    </div>
);
};

export default MediaAnalyticsGetSection;
