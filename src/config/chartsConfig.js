// src/config/chartConfig.js
import { MediaAnalytics_getChartData } from "../modules/mediaAnalytics/mediaAnalytics";


export const homeCharts = [
  {
    title: 'API',
    description: 'Get data from the API.',
    apiFunction: "get",
    module: 'API',

  }

]

export const nowInfo =[
  {
    id:0,
    apiFunction: "getCurrentNumPlays",
    module: 'MediaAnalytics',
  },
  {
    id:1,
    apiFunction: "getCurrentSumTimeSpent",
    module: 'MediaAnalytics',
  }, 
  {
    id:2,
    apiFunction: "getCurrentMostPlays",
    module: 'MediaAnalytics',
  },
  {
    id:3,
    apiFunction: "getPlayers",
    module: 'MediaAnalytics',
  }
]


export const reproductionsCharts = [
  {
    title: 'Overall Metrics',
    description: 'Get overall metrics for media analytics.',
    apiFunction: "get",
    fetchFunction: (idSite) => { return MediaAnalytics_getChartData(idSite)},
    module: 'MediaAnalytics',
  }
 
  
];

