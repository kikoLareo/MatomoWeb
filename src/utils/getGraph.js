import ChartComponent from "../components/ChartComponent";
import ChartInfo from "../components/ChartInfo";
import PieChartComponent from "../components/PieChartComponent";

function getGraph(chart) {
    if (!chart) {
        return <p>Loading...</p>;
    }

    var { type, data, title, description, module, action, metrics } = chart;

    console.log('getGraph:', chart);
    if (metrics) {
        const preparedData = data.map(item => {
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
                    preparedData.map((item, index) => {
                        return (
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
                        );
                    })
                );
                
            case 'pie':
                return (
                    preparedData.map((item, index) => {
                        return (
                            <div className="graph_component" key={index}>
                                <PieChartComponent
                                    labels={Object.keys(item)}
                                    data={Object.values(item)}
                                    title={title}
                                />
                            </div>
                        );
                    })
                );
               
            default:
                return <p>Unsupported chart type</p>;
        }
    }
}

export default getGraph;