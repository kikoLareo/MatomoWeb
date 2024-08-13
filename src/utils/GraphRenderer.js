// src/components/GraphRenderer.js
import React from 'react';
import ChartComponent from "../components/ChartComponent";
import ChartInfo from "../components/ChartInfo";
import PieChartComponent from "../components/PieChartComponent";

const GraphRenderer = ({ chart, chartIndex }) => {
  const { type, data, title, description, module, action, metric, item } = chart;
  let preparedData = null;

  if (metric) {
    preparedData = Object.keys(data.value).map(key => ({
      [metric]: data.value[key][metric] || 0
    }));
  } else if (item) {
    preparedData = [{ [item]: data.value[item] }];
  } else {
    preparedData = Object.keys(data.value).map(key => ({
      ...data.value[key]
    }));
  }

  switch (type) {
    case 'lineal':
      return (
        <div className="graph_component" key={chartIndex}>
          <ChartComponent
            labels={Object.keys(preparedData[0])}
            data={preparedData.map(d => Object.values(d))}
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