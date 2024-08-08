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
    id:0,
    action: "getCurrentNumPlays",
    module: 'MediaAnalytics',
  },
  {
    id:1,
    action: "getCurrentSumTimeSpent",
    module: 'MediaAnalytics',
  }, 
  {
    id:2,
    action: "getCurrentMostPlays",
    module: 'MediaAnalytics',
  },
  {
    id:3,
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

