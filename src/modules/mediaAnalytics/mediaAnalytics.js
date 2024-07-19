import methodBase from './mediaAnalitycs_commom';
import { format, module, token_auth } from '../../config';

const getBaseUrl = (method, params = {}) => {
  const baseUrl = `index.php?module=${module}&format=${format}&method=${method}&token_auth=${token_auth}`;
  const queryParams = new URLSearchParams(params).toString();
  return `${baseUrl}&${queryParams}`;
};

// Define all MediaAnalytics functions

export const MediaAnalytics_getCurrentNumPlays = (idSite, { lastMinutes = 180, segment = '' } = {}) => {
  const method = `${methodBase}.getCurrentNumPlays`;
  return getBaseUrl(method, { idSite, lastMinutes, segment });
};

export const MediaAnalytics_getCurrentSumTimeSpent = (idSite, { lastMinutes = 180, segment = '' } = {}) => {
  const method = `${methodBase}.getCurrentSumTimeSpent`;
  return getBaseUrl(method, { idSite, lastMinutes, segment });
};

export const MediaAnalytics_getCurrentMostPlays = (idSite, { lastMinutes = 180, filter_limit = '5', segment = '' } = {}) => {
  const method = `${methodBase}.getCurrentMostPlays`;
  return getBaseUrl(method, { idSite, lastMinutes, filter_limit, segment });
};

export const MediaAnalytics_get = (idSite, { period = 'day', date = '2023-12-01,2024-07-01', segment = '', columns = '' } = {}) => {
  const method = `${methodBase}.get`;
  return getBaseUrl(method, { idSite, period, date, segment, columns });
};

// Define the rest of the functions similarly

export const mediaAnalyticsConfig = {
  get: MediaAnalytics_get,
  getCurrentNumPlays: MediaAnalytics_getCurrentNumPlays,
  getCurrentSumTimeSpent: MediaAnalytics_getCurrentSumTimeSpent,
  getCurrentMostPlays: MediaAnalytics_getCurrentMostPlays,
  // Add other functions here
};
