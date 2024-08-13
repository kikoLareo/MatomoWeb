import React, { useEffect } from 'react';
import ChartComponent from "../components/ChartComponent";
import ChartInfo from "../components/ChartInfo";
import PieChartComponent from "../components/PieChartComponent";

function useGraph(charts, idSite) {

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

    if (!charts || charts.length === 0) {
        return <p>Loading...</p>;
    }

    return charts.map((chart, chartIndex) => {
        var { type, data, title, description, module, action, metrics } = chart;
        var preparedData = null;
        console.log('getGraph:', chart);
        // if (data.info.result === 'error') {
        //     return <p key={chartIndex}>Error: {data.info.message}</p>;
        // }

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
        
    });
}

export default useGraph;