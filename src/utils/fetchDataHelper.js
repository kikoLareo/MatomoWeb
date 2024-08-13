// src/utils/fetchDataHelper.js

import { APIFunctions, API_getProcessedReport } from '../modules/API/Api_actions';
import { mediaAnalyticsFunctions } from '../modules/mediaAnalytics/mediaAnalytics';
import { devicesDetectionActions } from '../modules/devicesDetection/devicesDetect_Actions';
import axios from 'axios';
import { language } from '../config/chartsConfig';

export const fetchDataForCharts = async (idSite, chartsConfig) => {
  const newChartData = {};
  try {
    for (const chart of chartsConfig) {
      let data;

      if (chart.fetchFunction) {
        // Usar la función específica si está definida
        data = await chart.fetchFunction(idSite);
      } else {
       
          try{
            let dataUrl = API_getProcessedReport(idSite,'year', 'yesterday', chart.module, chart.action, 'es' );
            let response = await axios.get(dataUrl.url);
            var processedData = response.data;
          }catch (error) {
            console.error('Error fetching data:', error);
          }

          const url =  getBaseUrl( chart, idSite);
          const response1 = await fetch(url);
          const responseData = await response1.json();

          data = {
            labels: Object.values(responseData).map(item => item.label ||  Object.keys(responseData)),
            data: Object.values(responseData).map(item => item[chart.metric] || 0),  
            title: processedData.metadata.metrics[chart.metric] || chart.title,
            description: processedData.metadata.metricsDocumentation[chart.metric] || chart.description,
            chartTitle: processedData.metadata.name,
            info: processedData.metadata
        };
      }

      newChartData[chart.title] = data;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  return newChartData;
};

export const fetchData = async (idSite, requestData) => {
  var newChartData = null;
  console.log('fetchData:', requestData);
  try {
    try {
      let dataUrl = API_getProcessedReport(idSite, 'year', 'yesterday', requestData.module, requestData.action, language);
      let response = await axios.get(dataUrl.url);
      var processedData = response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    // Usar la función de API general
    const response1 = await fetch(requestData.url);
    const responseData = await response1.json();

    console.log('fetchData:', responseData);
    
    const data = {
      value: responseData ,
      info: processedData ? processedData : {}
    };

    newChartData = data;

  } catch (error) {
    console.error('Error fetching data:', error);
  }

  return newChartData;
}


function getBaseUrl(chart, idSite) {

    switch(chart.module) {
        case 'API':
            return APIFunctions[chart.action](idSite).url;
        case 'MediaAnalytics':
            return mediaAnalyticsFunctions[chart.action](idSite).url;
        case 'DevicesDetection':
            return devicesDetectionActions[chart.action](idSite, chart.period, chart.date).url;
        default:
            return '';
    }
}