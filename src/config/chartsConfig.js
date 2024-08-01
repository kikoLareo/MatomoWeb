// src/config/chartConfig.js
import { MediaAnalytics_getChartData } from "../modules/mediaAnalytics/mediaAnalytics";

export const homeCharts = [

  {
    title: 'Metadata',
    description: 'Get metadata for a given module and action.',
    apiFunction: "API_getMetadata",
    module: 'API',
  },
  {
    title: 'Report Metadata',
    description: 'Get metadata for a given report.',
    apiFunction: "API_getReportMetadata",
    module: 'API',
  
  },
  {
    title: 'Processed Report',
    description: 'Get a processed report for a given module and action.',
    apiFunction: "API_getProcessedReport",
    module: 'API',
  
  },
  {
    title: 'API',
    description: 'Get data from the API.',
    apiFunction: "API_get",
    module: 'API',

  }

]


export const reproductionsCharts = [
  {
    title: 'Overall Metrics',
    description: 'Get overall metrics for media analytics.',
    apiFunction: "MediaAnalytics_get",
    fetchFunction: (idSite) => { return MediaAnalytics_getChartData(idSite)},
    module: 'MediaAnalytics',
  },
  {
    title: 'Current Number of Plays',
    description: 'Get the current number of plays.',
    apiFunction: "MediaAnalytics_getCurrentNumPlays",
    module: 'MediaAnalytics',
  },
  {
    title: 'Current Sum of Time Spent',
    description: 'Get the current sum of time spent.',
    apiFunction: "MediaAnalytics_getCurrentSumTimeSpent",
    module: 'MediaAnalytics',
  }, 
  {
    title: 'Current Most Plays',
    description: 'Get the current most plays.',
    apiFunction: "MediaAnalytics_getCurrentMostPlays",
    module: 'MediaAnalytics',
  },
  {
    title: 'Players',
    description: 'Get player data.',
    apiFunction: "MediaAnalytics_getPlayers",
    module: 'MediaAnalytics',
  }
  
];

