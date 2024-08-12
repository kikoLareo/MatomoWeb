import React, { useEffect } from 'react';
import ChartComponent from "../components/ChartComponent";
import ChartInfo from "../components/ChartInfo";
import PieChartComponent from "../components/PieChartComponent";

function useGraph(charts, idSite) { // Acepta idSite como argumento

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all(
                charts.map(async (chartItem) => {
                    console.log('Fetching data for chart:', chartItem, idSite);
                    await chartItem.getData(idSite);
                    console.log('Fetched data for chart:', chartItem);
                })
            );
        };
        fetchData();
    }, [idSite, charts]);
    
  const chartElements = charts.map((chart, chartIndex) => {
        var { type, data, title, description, module, action, metrics } = chart;

        console.log('getGraph:', chart);

        if (metrics) {
            const preparedData = Object.keys(data.value).map(item => {
                let result = {};
                metrics.forEach(metric => {
                    result[metric] = data.value[item][metric] || 0;
                });
                return result;
            });

            console.log('getGraph:', preparedData);

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
        }

        // Return null if no metrics are present
        return null;
    });

    return <div>{chartElements}</div>;
}
export default useGraph;