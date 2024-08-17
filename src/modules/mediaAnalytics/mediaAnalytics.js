import { getBaseUrl } from "../common/common";
import axios from 'axios';
import { MediaAnalytics_get_metrics } from '../../chart_config/MediaAnalytics/get_Info';
import { fetchData } from "../../utils/fetchDataHelper";

const methodBase = 'MediaAnalytics';
const module = 'API';

export const MediaAnalytics_get = (idSite, period = 'day', date = '2023-12-01,2024-07-01') => {
  const method = `${methodBase}.get`;
  return { url: getBaseUrl(module ,method, { idSite, period, date }), title: 'Overall Metrics' };
};

export const MediaAnalytics_getCurrentNumPlays = async (idSite, lastMinutes = 180) => {
  const action = 'getCurrentNumPlays';
  const method = `${methodBase}.getCurrentNumPlays`;
  return await fetchData(idSite, { module: methodBase, action,url: getBaseUrl(module ,method, { idSite, lastMinutes })});
};

export const MediaAnalytics_getCurrentSumTimeSpent = async (idSite, lastMinutes = 180) => {
  const action = 'getCurrentSumTimeSpent';
  const method = `${methodBase}.getCurrentSumTimeSpent`;
  return await fetchData(idSite, { module: methodBase, action, url: getBaseUrl(module ,method, { idSite, lastMinutes }) });
};

export const MediaAnalytics_getCurrentMostPlays = async (idSite, lastMinutes = 180, filter_limit = '5') => {
  const action = 'getCurrentMostPlays';
  const method = `${methodBase}.getCurrentMostPlays`;
  return await fetchData(idSite, { module: methodBase, action, url: getBaseUrl(module, method, { idSite, lastMinutes, filter_limit }) });
};

export const MediaAnalytics_getVideoResources = async (idSite, period = 'day', date = '2023-12-01,2024-07-01') => {
  const action = 'getVideoResources';
  const method = `${methodBase}.getVideoResources`;
  return await fetchData(idSite, { module: methodBase, action, url: getBaseUrl(module, method, { idSite, period, date }) });
};

export const MediaAnalytics_getAudioResources = async (idSite, period = 'day', date = '2023-12-01,2024-07-01') => {
  const action = 'getAudioResources';
  const method = `${methodBase}.getAudioResources`;
  return await fetchData(idSite, { module: methodBase, action, url: getBaseUrl(module, method, { idSite, period, date }) });
};

export const MediaAnalytics_getVideoTitles = async (idSite, period = 'day', date = '2023-12-01,2024-07-01') => {
  const action = 'getVideoTitles';
  const method = `${methodBase}.getVideoTitles`;
  return await fetchData(idSite, { module: methodBase, action, url: getBaseUrl(module, method, { idSite, period, date }) });
};

export const MediaAnalytics_getAudioTitles = async (idSite, period = 'day', date = '2023-12-01,2024-07-01') => {
  const action = 'getAudioTitles';
  const method = `${methodBase}.getAudioTitles`;
  return await fetchData(idSite, { module: methodBase, action, url: getBaseUrl(module, method, { idSite, period, date }) });
};

export const MediaAnalytics_getGroupedVideoResources = async (idSite, period = 'day', date = '2023-12-01,2024-07-01') => {
  const action = 'getGroupedVideoResources';
  const method = `${methodBase}.getGroupedVideoResources`;
  return await fetchData(idSite, { module: methodBase, action, url: getBaseUrl(module, method, { idSite, period, date }) });
};

export const MediaAnalytics_getGroupedAudioResources = async (idSite, period = 'day', date = '2023-12-01,2024-07-01') => {
  const action = 'getGroupedAudioResources';
  const method = `${methodBase}.getGroupedAudioResources`;
  return await fetchData(idSite, { module: methodBase, action, url: getBaseUrl(module, method, { idSite, period, date }) });
};

export const MediaAnalytics_getVideoHours = async (idSite, period = 'day', date = '2023-12-01,2024-07-01') => {
  const action = 'getVideoHours';
  const method = `${methodBase}.getVideoHours`;
  return await fetchData(idSite, { module: methodBase, action, url: getBaseUrl(module, method, { idSite, period, date }) });
};

export const MediaAnalytics_getAudioHours = async (idSite, period = 'day', date = '2023-12-01,2024-07-01') => {
  const action = 'getAudioHours';
  const method = `${methodBase}.getAudioHours`;
  return await fetchData(idSite, { module: methodBase, action, url: getBaseUrl(module, method, { idSite, period, date }) });
};

export const MediaAnalytics_getVideoResolutions = async (idSite, period = 'day', date = '2023-12-01,2024-07-01') => {
  const action = 'getVideoResolutions';
  const method = `${methodBase}.getVideoResolutions`;
  return await fetchData(idSite, { module: methodBase, action, url: getBaseUrl(module, method, { idSite, period, date }) });
};

export const MediaAnalytics_getPlayers = async (idSite, period = 'day', date = '2023-12-01,2024-07-01') => {
  const action = 'getPlayers';
  const method = `${methodBase}.getPlayers`;
  return await fetchData(idSite, { module: methodBase, action, url: getBaseUrl(module, method, { idSite, period, date }) });
};
export const mediaAnalyticsFunctions = {
  get: MediaAnalytics_get,
  getCurrentNumPlays: MediaAnalytics_getCurrentNumPlays,
  getCurrentSumTimeSpent: MediaAnalytics_getCurrentSumTimeSpent,
  getCurrentMostPlays: MediaAnalytics_getCurrentMostPlays,
    // getVideoResources: MediaAnalytics_getVideoResources,
    // getAudioResources: MediaAnalytics_getAudioResources,
    // getVideoTitles: MediaAnalytics_getVideoTitles,
    // getAudioTitles: MediaAnalytics_getAudioTitles,
    // getGroupedVideoResources: MediaAnalytics_getGroupedVideoResources,
    // getGroupedAudioResources: MediaAnalytics_getGroupedAudioResources,
    // getVideoHours: MediaAnalytics_getVideoHours,
    // getAudioHours: MediaAnalytics_getAudioHours,
    // getVideoResolutions: MediaAnalytics_getVideoResolutions,
  getPlayers: MediaAnalytics_getPlayers,
};


export async function MediaAnalytics_getChartData(idSite) {
  try {
    const { url } = MediaAnalytics_get(idSite);
    const response = await axios.get(url);
    const data = response.data;

    const newChartData = Object.keys(MediaAnalytics_get_metrics).reduce((acc, metric) => {
      acc[metric] = {
        labels: Object.keys(data),
        data: Object.keys(data).map(date => data[date]?.[metric] || 0),
        title: MediaAnalytics_get_metrics[metric].shortName,
        description: MediaAnalytics_get_metrics[metric].description,
        idSite: idSite // Agregar idSite a los datos del gráfico
      };
      return acc;
    }, {});

      return newChartData;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}