// src/config/chartConfig.js
import { MediaAnalytics_getChartData } from "../modules/mediaAnalytics/mediaAnalytics";


export const homeCharts = [
  {
    title: 'API',
    description: 'Get data from the API.',
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
    action: "devicesDetection_getType",
    module: 'DevicesDetection',
    period: 'year',
    date: 'yesterday',
  },
  {
    title: 'Devices Detection - Brand',
    description: 'Get the brand of devices detected.',
    action: "devicesDetection_getBrand",
    module: 'DevicesDetection',
  },
  {
    title: 'Devices Detection - Model',
    description: 'Get the model of devices detected.',
    action: "devicesDetection_getModel",
    module: 'DevicesDetection',
  },
  {
    title: 'Devices Detection - OS',
    description: 'Get the OS of devices detected.',
    action: "devicesDetection_getOSFamilies",
    module: 'DevicesDetection',
  },
  {
    title: 'Devices Detection - Browser',
    description: 'Get the browser of devices detected.',
    action: "devicesDetection_getBrowsers",
    module: 'DevicesDetection',
  }
];

