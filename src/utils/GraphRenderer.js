// src/components/GraphRenderer.js
import React from 'react';
import ChartComponent from "../components/ChartComponent";
import ChartInfo from "../components/ChartInfo";
import PieChartComponent from "../components/PieChartComponent";

const GraphRenderer = ({ chart, chartIndex }) => {
  const { type, data, title, description, module, action, metrics } = chart;
  let preparedData = null;

  if (metrics) {
    preparedData = Object.keys(data.value).map(item => {
      let result = {};
      metrics.forEach(metric => {
        result[metric] = data.value[item][metric] || 0;
      });
      return result;
    });
  } else {
    preparedData = Object.keys(data.value).map(item => {
      return { [item]: data.value[item] };
    });
  }

  switch (type) {
    case 'lineal':
      return (
        <div className="graph_component" key={chartIndex}>
          <ChartComponent
            data={{ labels: Object.keys(preparedData[0]), data: preparedData.map(d => Object.values(d)), title: title }}
            title={title}
          />
          <ChartInfo
            title={title}
            description={description}
            data={preparedData}
            module={module}
            action={action}
          />
        </div>
      );

    case 'pie':
      return (
        <div className="graph_component" key={chartIndex}>
          <PieChartComponent
            labels={Object.keys(preparedData[0])}
            data={preparedData.map(d => Object.values(d))}
            title={title}
          />
        </div>
      );

    default:
      return <p key={chartIndex}>Unsupported chart type</p>;
  }
};

export default GraphRenderer;