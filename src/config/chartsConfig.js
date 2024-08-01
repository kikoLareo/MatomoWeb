// src/config/chartConfig.js
import { MediaAnalytics_getChartData } from "../modules/mediaAnalytics/mediaAnalytics";

export const homeCharts = [

  {
    title: 'Metadata',
    description: 'Get metadata for a given module and action.',
    apiFunction: "getMetadata",
    module: 'API',
  },
  {
    title: 'Report Metadata',
    description: 'Get metadata for a given report.',
    apiFunction: "getReportMetadata",
    module: 'API',
  
  },
  {
    title: 'Processed Report',
    description: 'Get a processed report for a given module and action.',
    apiFunction: "getProcessedReport",
    module: 'API',
  
  },
  {
    title: 'API',
    description: 'Get data from the API.',
    apiFunction: "get",
    module: 'API',

  }

]


export const reproductionsCharts = [
  {
    title: 'Overall Metrics',
    description: 'Get overall metrics for media analytics.',
    apiFunction: "get",
    fetchFunction: (idSite) => { return MediaAnalytics_getChartData(idSite)},
    module: 'MediaAnalytics',
  },
  {
    title: 'Current Number of Plays',
    description: 'Get the current number of plays.',
    apiFunction: "getCurrentNumPlays",
    module: 'MediaAnalytics',
  },
  {
    title: 'Current Sum of Time Spent',
    description: 'Get the current sum of time spent.',
    apiFunction: "getCurrentSumTimeSpent",
    module: 'MediaAnalytics',
  }, 
  {
    title: 'Current Most Plays',
    description: 'Get the current most plays.',
    apiFunction: "getCurrentMostPlays",
    module: 'MediaAnalytics',
  },
  {
    title: 'Players',
    description: 'Get player data.',
    apiFunction: "getPlayers",
    module: 'MediaAnalytics',
  }
  
];

