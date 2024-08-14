// src/components/GraphRenderer.js
import React from 'react';
import ChartComponent from "../components/ChartComponent";
import PieChartComponent from "../components/PieChartComponent";
import BubbleChartComponent from '../components/BubbleChartComponent';

const GraphRenderer = ({ chart, chartIndex }) => {
  const { type, labels, data, title } = chart;

  console.log('Rendering chart:', chart);

  switch (type) {
    case 'lineal':
      return (
        <div className="graph_component" key={chartIndex}>
          <ChartComponent
            labels={labels}
            data={data}
            label={title}
            title={title}
          />
        </div>
      );

    case 'pie':
      return (
        <div className="graph_component" key={chartIndex}>
          <PieChartComponent
            labels={Object.keys(data)}
            data={Object.keys(data).map(date => data[date] || 0)}
            title={title}
          />
        </div>
      );
      case 'bubble':
        return (
          <div className="graph_component" key={chartIndex}>
            <BubbleChartComponent
              labels={labels}
              data={data}
              title={title}
            />
          </div>
        );
    default:
      return <p key={chartIndex}>Unsupported chart type</p>;
  }
};

export default GraphRenderer;