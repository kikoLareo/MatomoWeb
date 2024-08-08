import { getBaseUrl } from "../../chart_config/common/common";
import axios from 'axios';
import { MediaAnalytics_get_metrics } from '../../chart_config/MediaAnalytics/get_Info';

const methodBase = 'MediaAnalytics';


export const MediaAnalytics_get = (idSite, period = 'day', date = '2023-12-01,2024-07-01') => {
  const method = `${methodBase}.get`;
  return { url: getBaseUrl(methodBase,method, { idSite, period, date }), title: 'Overall Metrics' };
};

export const MediaAnalytics_getCurrentNumPlays = (idSite, lastMinutes = 180) => {
  const method = `${methodBase}.getCurrentNumPlays`;
  return { url: getBaseUrl(methodBase,method, { idSite, lastMinutes }), title: 'Current Number of Plays' };
};

export const MediaAnalytics_getCurrentSumTimeSpent = (idSite, lastMinutes = 180) => {
  const method = `${methodBase}.getCurrentSumTimeSpent`;
  return { url: getBaseUrl(methodBase,method, { idSite, lastMinutes }), title: 'Current Sum of Time Spent' };
};

export const MediaAnalytics_getCurrentMostPlays = (idSite, lastMinutes = 180, filter_limit = '5') => {
  const method = `${methodBase}.getCurrentMostPlays`;
  return { url: getBaseUrl(methodBase,method, { idSite, lastMinutes, filter_limit }), title: 'Current Most Plays' };
};

export const MediaAnalytics_getVideoResources = (idSite, period = 'day', date = '2023-12-01,2024-07-01') => {
  const method = `${methodBase}.getVideoResources`;
  return { url: getBaseUrl(methodBase,method, { idSite, period, date }), title: 'Video Resources' };
};

export const MediaAnalytics_getAudioResources = (idSite, period = 'day', date = '2023-12-01,2024-07-01') => {
  const method = `${methodBase}.getAudioResources`;
  return { url: getBaseUrl(methodBase,method, { idSite, period, date }), title: 'Audio Resources' };
};

export const MediaAnalytics_getVideoTitles = (idSite, period = 'day', date = '2023-12-01,2024-07-01') => {
  const method = `${methodBase}.getVideoTitles`;
  return { url: getBaseUrl(methodBase,method, { idSite, period, date }), title: 'Video Titles' };
};

export const MediaAnalytics_getAudioTitles = (idSite, period = 'day', date = '2023-12-01,2024-07-01') => {
  const method = `${methodBase}.getAudioTitles`;
  return { url: getBaseUrl(methodBase,method, { idSite, period, date }), title: 'Audio Titles' };
};

export const MediaAnalytics_getGroupedVideoResources = (idSite, period = 'day', date = '2023-12-01,2024-07-01') => {
  const method = `${methodBase}.getGroupedVideoResources`;
  return { url: getBaseUrl(methodBase,method, { idSite, period, date }), title: 'Grouped Video Resources' };
};

export const MediaAnalytics_getGroupedAudioResources = (idSite, period = 'day', date = '2023-12-01,2024-07-01') => {
  const method = `${methodBase}.getGroupedAudioResources`;
  return { url: getBaseUrl(methodBase,method, { idSite, period, date }), title: 'Grouped Audio Resources' };
};

export const MediaAnalytics_getVideoHours = (idSite, period = 'day', date = '2023-12-01,2024-07-01') => {
  const method = `${methodBase}.getVideoHours`;
  return { url: getBaseUrl(methodBase,method, { idSite, period, date }), title: 'Video Hours' };
};

export const MediaAnalytics_getAudioHours = (idSite, period = 'day', date = '2023-12-01,2024-07-01') => {
  const method = `${methodBase}.getAudioHours`;
  return { url: getBaseUrl(methodBase,method, { idSite, period, date }), title: 'Audio Hours' };
};

export const MediaAnalytics_getVideoResolutions = (idSite, period = 'day', date = '2023-12-01,2024-07-01') => {
  const method = `${methodBase}.getVideoResolutions`;
  return { url: getBaseUrl(methodBase,method, { idSite, period, date }), title: 'Video Resolutions' };
};

export const MediaAnalytics_getPlayers = (idSite, period = 'day', date = '2023-12-01,2024-07-01') => {
  const method = `${methodBase}.getPlayers`;
  return { url: getBaseUrl(methodBase,method, { idSite, period, date }), title: 'Players' };
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