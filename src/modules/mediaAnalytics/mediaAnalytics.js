
import methodBase from './mediaAnalitycs_commom';
import {format, module, token_auth} from '../../config.js';

const getBaseUrl = (method, params = {}) => {
  const baseUrl = `index.php?module=${module}&format=${format}&method=${method}&token_auth=${token_auth}`;
  const queryParams = new URLSearchParams(params).toString();
  return `${baseUrl}&${queryParams}`;
};

// Define all MediaAnalytics functions

/**
 * MediaAnalytics_getCurrentNumPlays
 * Returns the number of video plays in the last N minutes.
 * @param {number} idSite - ID of the site.
 * @param {number} lastMinutes - Number of recent minutes to fetch data for.
 * @param {string} segment - Optional segment to filter data.
 */
export const MediaAnalytics_getCurrentNumPlays = (idSite, lastMinutes = 180, segment = '') => {
  const method = `${methodBase}.getCurrentNumPlays`;
  return getBaseUrl(method, { idSite, lastMinutes, segment });
};

/**
 * MediaAnalytics_getCurrentSumTimeSpent
 * Returns the total time users have spent playing media in the last N minutes.
 * @param {number} idSite - ID of the site.
 * @param {number} lastMinutes - Number of recent minutes to fetch data for.
 * @param {string} segment - Optional segment to filter data.
 */
export const MediaAnalytics_getCurrentSumTimeSpent = (idSite, lastMinutes = 180, segment = '') => {
  const method = `${methodBase}.getCurrentSumTimeSpent`;
  return getBaseUrl(method, { idSite, lastMinutes, segment });
};

/**
 * MediaAnalytics_getCurrentMostPlays
 * Returns the most popular videos in the last N minutes.
 * @param {number} idSite - ID of the site.
 * @param {number} lastMinutes - Number of recent minutes to fetch data for.
 * @param {number} filter_limit - Limit of results.
 * @param {string} segment - Optional segment to filter data.
 */
export const MediaAnalytics_getCurrentMostPlays = (idSite, lastMinutes = 180, filter_limit = '5', segment = '') => {
  const method = `${methodBase}.getCurrentMostPlays`;
  return getBaseUrl(method, { idSite, lastMinutes, filter_limit, segment });
};

/**
 * MediaAnalytics_get
 * Returns overall metrics for videos and audios.
 * @param {number} idSite - ID of the site.
 * @param {string} period - Time period (day, week, month, year).
 * @param {string} date - Date range.
 * @param {string} segment - Optional segment to filter data.
 * @param {string} columns - Optional columns to filter data.
 */
export const MediaAnalytics_get = (idSite, period = 'day', date = '2023-12-01,2024-07-01', segment = '', columns = '') => {
  const method = `${methodBase}.get`;
  return getBaseUrl(method, { idSite, period, date, segment, columns });
};

/**
 * MediaAnalytics_getVideoResources
 * Returns the list of video resources.
 * @param {number} idSite - ID of the site.
 * @param {string} period - Time period.
 * @param {string} date - Date range.
 * @param {string} segment - Optional segment to filter data.
 * @param {string} idSubtable - Optional subtable ID.
 * @param {string} secondaryDimension - Optional secondary dimension.
 * @param {string} expanded - Optional parameter to expand data.
 * @param {string} flat - Optional parameter for flat data.
 */
export const MediaAnalytics_getVideoResources = (idSite, period = 'day', date = '2023-12-01,2024-07-01', segment = '', idSubtable = '', secondaryDimension = '', expanded = '', flat = '') => {
  const method = `${methodBase}.getVideoResources`;
  return getBaseUrl(method, { idSite, period, date, segment, idSubtable, secondaryDimension, expanded, flat });
};

/**
 * MediaAnalytics_getAudioResources
 * Returns the list of audio resources.
 * @param {number} idSite - ID of the site.
 * @param {string} period - Time period.
 * @param {string} date - Date range.
 * @param {string} segment - Optional segment to filter data.
 * @param {string} idSubtable - Optional subtable ID.
 * @param {string} secondaryDimension - Optional secondary dimension.
 * @param {string} expanded - Optional parameter to expand data.
 * @param {string} flat - Optional parameter for flat data.
 */
export const MediaAnalytics_getAudioResources = (idSite, period = 'day', date = '2023-12-01,2024-07-01', segment = '', idSubtable = '', secondaryDimension = '', expanded = '', flat = '') => {
  const method = `${methodBase}.getAudioResources`;
  return getBaseUrl(method, { idSite, period, date, segment, idSubtable, secondaryDimension, expanded, flat });
};

/**
 * MediaAnalytics_getVideoTitles
 * Returns the list of video titles.
 * @param {number} idSite - ID of the site.
 * @param {string} period - Time period.
 * @param {string} date - Date range.
 * @param {string} segment - Optional segment to filter data.
 * @param {string} idSubtable - Optional subtable ID.
 * @param {string} secondaryDimension - Optional secondary dimension.
 */
export const MediaAnalytics_getVideoTitles = (idSite, period = 'day', date = '2023-12-01,2024-07-01', segment = '', idSubtable = '', secondaryDimension = '') => {
  const method = `${methodBase}.getVideoTitles`;
  return getBaseUrl(method, { idSite, period, date, segment, idSubtable, secondaryDimension });
};

/**
 * MediaAnalytics_getAudioTitles
 * Returns the list of audio titles.
 * @param {number} idSite - ID of the site.
 * @param {string} period - Time period.
 * @param {string} date - Date range.
 * @param {string} segment - Optional segment to filter data.
 * @param {string} idSubtable - Optional subtable ID.
 * @param {string} secondaryDimension - Optional secondary dimension.
 */
export const MediaAnalytics_getAudioTitles = (idSite, period = 'day', date = '2023-12-01,2024-07-01', segment = '', idSubtable = '', secondaryDimension = '') => {
  const method = `${methodBase}.getAudioTitles`;
  return getBaseUrl(method, { idSite, period, date, segment, idSubtable, secondaryDimension });
};

/**
 * MediaAnalytics_getGroupedVideoResources
 * Returns the list of videos grouped by resource URL.
 * @param {number} idSite - ID of the site.
 * @param {string} period - Time period.
 * @param {string} date - Date range.
 * @param {string} segment - Optional segment to filter data.
 * @param {string} idSubtable - Optional subtable ID.
 * @param {string} secondaryDimension - Optional secondary dimension.
 */
export const MediaAnalytics_getGroupedVideoResources = (idSite, period = 'day', date = '2023-12-01,2024-07-01', segment = '', idSubtable = '', secondaryDimension = '') => {
  const method = `${methodBase}.getGroupedVideoResources`;
  return getBaseUrl(method, { idSite, period, date, segment, idSubtable, secondaryDimension });
};

/**
 * MediaAnalytics_getGroupedAudioResources
 * Returns the list of audios grouped by resource URL.
 * @param {number} idSite - ID of the site.
 * @param {string} period - Time period.
 * @param {string} date - Date range.
 * @param {string} segment - Optional segment to filter data.
 * @param {string} idSubtable - Optional subtable ID.
 * @param {string} secondaryDimension - Optional secondary dimension.
 */
export const MediaAnalytics_getGroupedAudioResources = (idSite, period = 'day', date = '2023-12-01,2024-07-01', segment = '', idSubtable = '', secondaryDimension = '') => {
  const method = `${methodBase}.getGroupedAudioResources`;
  return getBaseUrl(method, { idSite, period, date, segment, idSubtable, secondaryDimension });
};

/**
 * MediaAnalytics_getVideoHours
 * Returns the list of videos by hour.
 * @param {number} idSite - ID of the site.
 * @param {string} period - Time period.
 * @param {string} date - Date range.
 * @param {string} segment - Optional segment to filter data.
 */
export const MediaAnalytics_getVideoHours = (idSite, period = 'day', date = '2023-12-01,2024-07-01', segment = '') => {
  const method = `${methodBase}.getVideoHours`;
  return getBaseUrl(method, { idSite, period, date, segment });
};

/**
 * MediaAnalytics_getAudioHours
 * Returns the list of audios by hour.
 * @param {number} idSite - ID of the site.
 * @param {string} period - Time period.
 * @param {string} date - Date range.
 * @param {string} segment - Optional segment to filter data.
 */
export const MediaAnalytics_getAudioHours = (idSite, period = 'day', date = '2023-12-01,2024-07-01', segment = '') => {
  const method = `${methodBase}.getAudioHours`;
  return getBaseUrl(method, { idSite, period, date, segment });
};

/**
 * MediaAnalytics_getVideoResolutions
 * Returns the list of videos by player resolution.
 * @param {number} idSite - ID of the site.
 * @param {string} period - Time period.
 * @param {string} date - Date range.
 * @param {string} segment - Optional segment to filter data.
 */
export const MediaAnalytics_getVideoResolutions = (idSite, period = 'day', date = '2023-12-01,2024-07-01', segment = '') => {
  const method = `${methodBase}.getVideoResolutions`;
  return getBaseUrl(method, { idSite, period, date, segment });
};

/**
 * MediaAnalytics_getPlayers
 * Returns the list of watched media by media player.
 * @param {number} idSite - ID of the site.
 * @param {string} period - Time period.
 * @param {string} date - Date range.
 * @param {string} segment - Optional segment to filter data.
 */
export const MediaAnalytics_getPlayers = (idSite, period = 'day', date = '2023-12-01,2024-07-01', segment = '') => {
  const method = `${methodBase}.getPlayers`;
  return getBaseUrl(method, { idSite, period, date, segment });
};

export const mediaAnalyticsConfig = {
  get: MediaAnalytics_get,
  getCurrentNumPlays: MediaAnalytics_getCurrentNumPlays,
  getCurrentSumTimeSpent: MediaAnalytics_getCurrentSumTimeSpent,
  getCurrentMostPlays: MediaAnalytics_getCurrentMostPlays,
  getVideoResources: MediaAnalytics_getVideoResources,
  getAudioResources: MediaAnalytics_getAudioResources,
  getVideoTitles: MediaAnalytics_getVideoTitles,
  getAudioTitles: MediaAnalytics_getAudioTitles,
  getGroupedVideoResources: MediaAnalytics_getGroupedVideoResources,
  getGroupedAudioResources: MediaAnalytics_getGroupedAudioResources,
  getVideoHours: MediaAnalytics_getVideoHours,
  getAudioHours: MediaAnalytics_getAudioHours,
  getVideoResolutions: MediaAnalytics_getVideoResolutions,
  getPlayers: MediaAnalytics_getPlayers
};
