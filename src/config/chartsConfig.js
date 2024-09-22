// src/config/chartConfig.js
import { MediaAnalytics_getChartData } from "../modules/mediaAnalytics/mediaAnalytics";

export const language = 'es';


export const homeCharts = [
  {
    title: 'API',
    action: "get",
    module: 'API',

  }

]

export const Dashboard = [
  {
    module: "UserCountry",
    action: "getCity"
  },
  {
    module: "UserCountry",
    action: "getContinent"
  },
  {
    module: "Live",
    action: "widget"
  },
  {
    module: "VisitsSummary",
    action: "getEvolutionGraph"
  },
  {
    module: "VisitsSummary",
    action: "get"
  },
  {
    module: "UserCountryMap",
    action: "visitorMap"
  },
  {
    module: "Referrers",
    action: "getReferrerType"
  },
  {
    module: "Insights",
    action: "getOverallMoversAndShakers"
  }
]

export const nowInfo =[
  {
    title: 'Reproducciones actuales',
    action: "getCurrentNumPlays",
    module: 'MediaAnalytics',
  },
  {
    title: 'Tiempo total de reproducción',
    action: "getCurrentSumTimeSpent",
    module: 'MediaAnalytics',
  }, 
  {
    title: 'Reproducciones más actuales',
    action: "getCurrentMostPlays",
    module: 'MediaAnalytics',
  },
  {
    title: 'Usuarios actuales',
    action: "getPlayers",
    module: 'MediaAnalytics',
  }
]


export const reproductionsCharts = [
  {
    title: 'Overall Metrics',
    description: 'Get overall metrics for media analytics.',
    action: "get",
    fetchFunction: (idSite) => { return MediaAnalytics_getChartData(idSite)},
    module: 'MediaAnalytics',
  }
 
  
];

export const devicesDetectionCharts = [
  {
    title: 'Devices Detection - Type',
    description: 'Get the type of devices detected.',
    action: "getType",
    module: 'DevicesDetection',
    period: 'year',
    date: 'yesterday',
    metric: 'nb_visits',
  },
  {
    title: 'Devices Detection - Brand',
    description: 'Get the brand of devices detected.',
    action: "getBrand",
    module: 'DevicesDetection',
    metric: 'nb_visits',

  },
  {
    title: 'Devices Detection - Model',
    description: 'Get the model of devices detected.',
    action: "getModel",
    module: 'DevicesDetection',
    metric: 'nb_visits',

  },
  {
    title: 'Devices Detection - OS',
    description: 'Get the OS of devices detected.',
    action: "getOsFamilies",
    module: 'DevicesDetection',
    metric: 'nb_visits',

  },
  {
    title: 'Devices Detection - Browser',
    description: 'Get the browser of devices detected.',
    action: "getBrowsers",
    module: 'DevicesDetection',
    metric: 'nb_visits',

  }
];

/*                VISITS CHARTS                */






export var exampleCharts = [ 
  { title: 'Example Chart 1', 
    description: 'This is an example chart.', 
    action: "get", module: 'ExampleModule', 
    data:{
      info: {
        columns: {
          metric1: 'Metric 1',
          metric2: 'Metric 2',
        },
        metadata: {
          metrics: {
            metric1: 'Metric 1',
            metric2: 'Metric 2',
          }
        }},
        value: {
          "2023-01-01": { metric1: 10, metric2: 20 },
          "2023-01-02": { metric1: 20, metric2: 40 },
          "2023-01-03": { metric1: 30, metric2: 60 },
          "2023-01-04": { metric1: 40, metric2: 80 },
          "2023-01-05": { metric1: 50, metric2: 100 }
        },
    },
    metrics: {
      metric1: 'Metric 1',
      metric2: 'Metric 2',
    },
    type: 'lineal',
    selectedMetrics: [],

  }, 
    { title: 'Example Chart 2', 
      description: 'This is another example chart.', 
      action: "get", 
      module: 'ExampleModule', 
      data:{
        info: {
          columns: {
            metric1: 'Metric 1',
            metric2: 'Metric 2',
          },
          metadata: {
            metrics: {
              metric1: 'Metric 1',
              metric2: 'Metric 2',
            }
          }},
          value: {
            "2023-01-01": { metric1: 10, metric2: 20 },
            "2023-01-02": { metric1: 20, metric2: 40 },
            "2023-01-03": { metric1: 30, metric2: 60 },
            "2023-01-04": { metric1: 40, metric2: 80 },
            "2023-01-05": { metric1: 50, metric2: 100 }
          },
      },
      metrics: {
        metric1: 'Metric 1',
        metric2: 'Metric 2',
      },
      type: 'lineal',
      selectedMetrics: [],
 
    }, 
    { title: 'Example Chart 3', 
      description: 'Yet another example chart.', 
      action: "get", module: 'ExampleModule', 
      data:{
        info: {
          columns: {
            metric1: 'Metric 1',
            metric2: 'Metric 2',
          },
          metadata: {
            metrics: {
              metric1: 'Metric 1',
              metric2: 'Metric 2',
            }
          }},
          value: {
            "2023-01-01": { metric1: 10, metric2: 20 },
            "2023-01-02": { metric1: 20, metric2: 40 },
            "2023-01-03": { metric1: 30, metric2: 60 },
            "2023-01-04": { metric1: 40, metric2: 80 },
            "2023-01-05": { metric1: 50, metric2: 100 }
          },
      },
      metrics: {
        metric1: 'Metric 1',
        metric2: 'Metric 2',
      },
      type: 'lineal',
      selectedMetrics: [],
    },
  ];

    
  

