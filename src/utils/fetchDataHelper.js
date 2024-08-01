// src/utils/fetchDataHelper.js

import { APIFunctions } from '../modules/API/apiFunctions';
import { mediaAnalyticsFunctions } from '../modules/mediaAnalytics/mediaAnalytics';

export const fetchDataForCharts = async (idSite, chartsConfig) => {
  const newChartData = {};
  try {
    for (const chart of chartsConfig) {
      let data;

      if (chart.fetchFunction) {
        // Usar la función específica si está definida
        data = await chart.fetchFunction(idSite);
      } else {
        const url =  getBaseUrl(chart, idSite);
        // Usar la función de API general
        const response = await fetch(url);
        const responseData = await response.json();

        data = {
          labels: Object.keys(responseData),
          data: Object.values(responseData).map(item => item[chart.metric] || 0),
          title: chart.name,
          description: chart.description,
        };
      }

      newChartData[chart.name] = data;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  return newChartData;
};

function getBaseUrl(chart, idSite) {

    switch(chart.module) {
        case 'API':
            return APIFunctions[chart.apiFunction](idSite).url;
        case 'MediaAnalytics':
            return mediaAnalyticsFunctions[chart.apiFunction](idSite).url;
        default:
            return '';
    }
}