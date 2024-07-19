import {getBaseUrl} from '../../api.js';
import { baseURL } from '../../config.js';

const methodBase = 'MediaAnalytics';

export const MediaAnalytics_getCurrentNumPlays = (idSite, baseUrl, lastMinutes = 180) => {
  const method = `${methodBase}.getCurrentNumPlays`;
  return getBaseUrl(  method, { idSite, lastMinutes });
};

export const MediaAnalytics_get = (idSite, baseUrl, period = 'day', date = '2023-12-01,2024-07-01') => {
  const method = `${methodBase}.get`;
  return getBaseUrl(  method, { idSite, period, date });
};

export const mediaAnalyticsConfig = {
  baseUrl: baseURL,
  functions: {
    get: MediaAnalytics_get,
    getCurrentNumPlays: MediaAnalytics_getCurrentNumPlays,
  }
};

