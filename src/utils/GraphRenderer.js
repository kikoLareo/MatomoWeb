// src/components/GraphRenderer.js
import React from 'react';
import ChartComponent from "../components/ChartComponent";
import PieChartComponent from "../components/PieChartComponent";

const GraphRenderer = ({ chart, chartIndex }) => {
  const { type, data, title } = chart;

  switch (type) {
    case 'lineal':
      return (
        <div className="graph_component" key={chartIndex}>
          <ChartComponent
            labels={Object.keys(data[0])}
            data={data.map(d => Object.values(d))}
            title={title}
          />
        </div>
      );

    case 'pie':
      return (
        <div className="graph_component" key={chartIndex}>
          <PieChartComponent
            labels={Object.keys(data[0])}
            data={data.map(d => Object.values(d))}
            title={title}
          />
        </div>
      );

    default:
      return <p key={chartIndex}>Unsupported chart type</p>;
  }
};

export default GraphRenderer;