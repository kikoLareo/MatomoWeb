// src/utils/useGraph.js
import React from 'react';
import GraphRenderer from './GraphRenderer';
import { titles } from './dictionaryMetrics/metricsTitles';

// function transformData(data, metrics) {
//   const result = {};

//   metrics.forEach(metric => {
//       result[metric] = {}; // Inicializa un objeto para cada métrica

//       Object.keys(data).forEach(date => {
//           if (Array.isArray(data[date])) {
//               // Si no hay datos para la fecha, agrega fecha: null
//               result[metric][date] = 0;
//           } else {
//               // Si la métrica existe en la fecha, agrega fecha: valor, si no, fecha: null
//               result[metric][date] = data[date].hasOwnProperty(metric) ? data[date][metric] : 0;
//           }
//       });
//   });

//     return result;
// };

function useGraph(charts, idSite) {
  // const [chartData, setChartData] = useState([]);
  console.log('useGraph', charts, idSite);

  if (
    !charts || 
    (Array.isArray(charts) && charts.length === 0) || 
    (typeof charts === 'object' && !Array.isArray(charts) && Object.keys(charts).length === 0)
  ) {
    return <p>No charts to render</p>;
  }
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await fetchChartData(charts, idSite);
  //     setChartData(data);
  //   };
  //   fetchData();
  // }, [idSite, charts]);

  // if (!chartData || chartData.length === 0) {
  //   return <p>Loading...</p>;
  // }

  return Object.entries(charts).map(([chartName, chartData]) => {
    const { chart } = chartData;
    console.log('chart', chart);
    const { selectedMetrics, data, description, title, type } = chart;
    // const formatedData = transformData(data.value, metrics);
    return (
      <div className="graphGroup">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="graphGrid">
            {selectedMetrics ? (
              selectedMetrics.map((metric, metricIndex) => (
              
                <GraphRenderer
                  chart={{
                    type,
                    labels: Object.keys(data.value),
                    data: Object.keys(data.value).map(date => data.value[date]?.[metric] || 0),
                    title: data.info.columns? data.info.columns[metric] : data.info.metadata? data.info.metadata.metrics[metric]: titles[metric]
                    
                  }}
                />
              ))
            ) : (
              Object.keys(data.value).map((date, dateIndex) => (
                <GraphRenderer
                  chart={{ ...chart, date }}
                />
              ))
            )}
        </div>
      </div>
    );
  });
}

export default useGraph;