import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ChartComponent from '../../components/ChartComponent';
import ChartInfo from '../../components/ChartInfo';
import { MediaAnalytics_get } from '../../modules/mediaAnalytics/mediaAnalytics';
import { IdSiteContext } from '../../contexts/idSiteContext';
import { MediaAnalytics_get_metrics } from '../../chart_config/MediaAnalytics/get_Info';
import { API_getProcessedReport } from '../../modules/API/Api_actions';
import BarChartSkeleton from '../../components/skeletons/chartSkeleton';

const MediaAnalyticsGetSection = () => {
  const { idSite } = useContext(IdSiteContext);
  const [chartData, setChartData] = useState({});
  const [showDescription, setShowDescription] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      setChartData({}); // Reiniciar el estado de las gráficas
      setLoading(true);
      setError('');
      try {
        const dataUrl = API_getProcessedReport(idSite, 'year', 'yesterday', 'MediaAnalytics', 'get', 'es');
        const response = await axios.get(dataUrl.url);
        const processedData = response.data;

        const { url } = MediaAnalytics_get(idSite);
        const response2 = await axios.get(url);
        const data = response2.data;

        const newChartData = Object.keys(MediaAnalytics_get_metrics).reduce((acc, metric) => {
          const shortName = MediaAnalytics_get_metrics[metric].shortName;
          const description = MediaAnalytics_get_metrics[metric].description;

          acc[metric] = {
            labels: Object.keys(data),
            data: Object.keys(data).map(date => data[date]?.[metric] || 0),
            id: metric, // Agregar id a los datos del gráfico
            title: processedData.metadata.metrics[metric] || shortName,
            description: processedData.metadata.metricsDocumentation[metric] || description,
            module: processedData.metadata.module,
            action: processedData.metadata.action,
          };
          return acc;
        }, {});

        setChartData(newChartData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [idSite]);


  const toggleDescription = (metric) => {
    setShowDescription(prevState => ({
      ...prevState,
      [metric]: !prevState[metric]
    }));
  };

  /*
  const handleShowMore = (metric) => {
    setShowMore(prevState => ({
      ...prevState,
      [metric]: !prevState[metric],
    }));
  };


<button onClick={() => handleShowMore(metric)}>
                    Show More
                  </button>


            */
  return (
    <div className="graphDashBoard">
      <div className="graphGrid">
        {loading || error ? (
         Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="skeleton">
            <BarChartSkeleton />
          </div>
        ))
        ) : (
          Object.keys(chartData).map((metric) => (
            <div key={metric} className="graph_component">
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
                  
                </div>
                {showDescription[metric] && (
                  <ChartInfo
                    title={chartData[metric].title}
                    description={chartData[metric].description}
                    data={chartData[metric].data}
                  />
                )}
              
              </>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MediaAnalyticsGetSection;
