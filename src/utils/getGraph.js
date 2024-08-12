import React, { useEffect, useContext } from 'react';
import ChartComponent from "../components/ChartComponent";
import ChartInfo from "../components/ChartInfo";
import PieChartComponent from "../components/PieChartComponent";
import { IdSiteContext } from '../context/IdSiteContext'; // Asegúrate de importar el contexto correctamente

function useGraph(chart) {
    const idSite = useContext(IdSiteContext);

    useEffect(() => {
        const fetchData = async () => {
            await Promise.all(
                chart.map(async (chartItem) => {
                    console.log('Fetching data for chart:', chartItem.title);
                    await chartItem.getData(idSite);
                    console.log('Fetched data for chart:', chartItem);
                })
            );
        };
        fetchData();
    }, [idSite, chart]);

    if (!chart) {
        return <p>Loading...</p>;
    }

    var { type, data, title, description, module, action, metrics } = chart;

    console.log('getGraph:', chart);
    if (metrics) {
        const preparedData = data.value.map(item => {
            let result = {};
            metrics.forEach(metric => {
                result[metric] = item[metric] || 0;
            });
            return result;
        });

        console.log('getGraph:', preparedData);

        switch (type) {
            case 'lineal':
                return (
                    preparedData.map((item, index) => (
                        <div className="graph_component" key={index}>
                            <ChartComponent
                                data={{ labels: Object.keys(item), data: Object.values(item), title: title }}
                                title={title}
                            />
                            <ChartInfo
                                title={title}
                                description={description}
                                data={item}
                                module={module}
                                action={action}
                            />
                        </div>
                    ))
                );
                
            case 'pie':
                return (
                    preparedData.map((item, index) => (
                        <div className="graph_component" key={index}>
                            <PieChartComponent
                                labels={Object.keys(item)}
                                data={Object.values(item)}
                                title={title}
                            />
                        </div>
                    ))
                );
               
            default:
                return <p>Unsupported chart type</p>;
        }
    }
}

export default useGraph;