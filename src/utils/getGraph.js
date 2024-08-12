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

        const labels = Object.keys(data);
        const datasets = metrics.map((metric, index) => ({
            label: metric,
            data: preparedData.map(item => item[metric]),
            fill: false,
            backgroundColor: `rgba(75, 192, 192, ${0.6 + index * 0.1})`,
            borderColor: `rgba(75, 192, 192, ${1 - index * 0.1})`,
        }));

        switch (type) {
            case 'lineal':
                return (
                    <div className="graph_component">
                        <ChartComponent
                            data={{ labels, datasets }}
                            title={title}
                        />
                        <ChartInfo
                            title={title}
                            description={description}
                            data={data}
                            module={module}
                            action={action}
                        />
                    </div>
                );
            case 'pie':
                return (
                    <div className="graph_component">
                        <PieChartComponent
                            key={title}
                            labels={labels}
                            data={Object.values(data).map(item => item.nb_visits_new)}
                            title={title}
                        />
                    </div>
                );
            default:
                return <p>Unsupported chart type</p>;
        }
    }
}

export default getGraph;