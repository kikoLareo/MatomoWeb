// src/config/chartConfig.js
import { MediaAnalytics_getChartData } from "../modules/mediaAnalytics/mediaAnalytics";
import {visitFrequency_get} from "../modules/Visits/visits_actions";

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



export const visitsCharts = [
  {
    title: 'Visits - Frequency',
    description: 'Get the frequency of visits.',
    action: "get",
    module: 'Visits',
    period: 'day',
    date: '2024-03-01,yesterday',
    type: 'lineal',
    metrics: ["nb_users_new", "nb_users_returning"],
    data : [],
    async getData(idSite){
      console.log('Fetching data for chart:', this, idSite);
      this.data = await visitFrequency_get(idSite, this.period, this.date)
      console.log('Fetched data for chart:', this, this.data);
    }
    
  }
];

