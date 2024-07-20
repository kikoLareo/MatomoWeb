
import {format, module, token_auth} from '../../config';

const methodBase = 'MediaAnalytics';

const getBaseUrl = (method, params = {}) => {
  const baseUrl = `index.php?module=${module}&format=${format}&method=${method}&token_auth=${token_auth}`;
  const queryParams = new URLSearchParams(params).toString();
  return `${baseUrl}&${queryParams}`;
};

export const MediaAnalytics_getCurrentNumPlays = (idSite, lastMinutes = 180) => {
  const method = `${methodBase}.getCurrentNumPlays`;
  return getBaseUrl(method, { idSite, lastMinutes });
};

export const MediaAnalytics_get = (idSite, period = 'day', date = '2023-12-01,2024-07-01') => {
  const method = `${methodBase}.get`;
  return getBaseUrl(method, { idSite, period, date });
};

export const MediaAnalytics_getCurrentSumTimeSpent = (idSite, lastMinutes = 180) => {
  const method = `${methodBase}.getCurrentSumTimeSpent`;
  return getBaseUrl(method, { idSite, lastMinutes });
};

export const MediaAnalytics_getCurrentMostPlays = (idSite, lastMinutes = 180, filter_limit = '5') => {
  const method = `${methodBase}.getCurrentMostPlays`;
  return getBaseUrl(method, { idSite, lastMinutes, filter_limit });
};

export const MediaAnalytics_getVideoResources = (idSite, period = 'day', date = '2023-12-01,2024-07-01', segment = '', idSubtable = '', secondaryDimension = '', expanded = '', flat = '') => {
  const method = `${methodBase}.getVideoResources`;
  return getBaseUrl(method, { idSite, period, date, segment, idSubtable, secondaryDimension, expanded, flat });
};

export const MediaAnalytics_getAudioResources = (idSite, period = 'day', date = '2023-12-01,2024-07-01', segment = '', idSubtable = '', secondaryDimension = '', expanded = '', flat = '') => {
  const method = `${methodBase}.getAudioResources`;
  return getBaseUrl(method, { idSite, period, date, segment, idSubtable, secondaryDimension, expanded, flat });
};

export const MediaAnalytics_getVideoTitles = (idSite, period = 'day', date = '2023-12-01,2024-07-01', segment = '', idSubtable = '', secondaryDimension = '') => {
  const method = `${methodBase}.getVideoTitles`;
  return getBaseUrl(method, { idSite, period, date, segment, idSubtable, secondaryDimension });
};

export const MediaAnalytics_getAudioTitles = (idSite, period = 'day', date = '2023-12-01,2024-07-01', segment = '', idSubtable = '', secondaryDimension = '') => {
  const method = `${methodBase}.getAudioTitles`;
  return getBaseUrl(method, { idSite, period, date, segment, idSubtable, secondaryDimension });
};

export const MediaAnalytics_getGroupedVideoResources = (idSite, period = 'day', date = '2023-12-01,2024-07-01', segment = '', idSubtable = '', secondaryDimension = '') => {
  const method = `${methodBase}.getGroupedVideoResources`;
  return getBaseUrl(method, { idSite, period, date, segment, idSubtable, secondaryDimension });
};

export const MediaAnalytics_getGroupedAudioResources = (idSite, period = 'day', date = '2023-12-01,2024-07-01', segment = '', idSubtable = '', secondaryDimension = '') => {
  const method = `${methodBase}.getGroupedAudioResources`;
  return getBaseUrl(method, { idSite, period, date, segment, idSubtable, secondaryDimension });
};

export const MediaAnalytics_getVideoHours = (idSite, period = 'day', date = '2023-12-01,2024-07-01', segment = '') => {
  const method = `${methodBase}.getVideoHours`;
  return getBaseUrl(method, { idSite, period, date, segment });
};

export const MediaAnalytics_getAudioHours = (idSite, period = 'day', date = '2023-12-01,2024-07-01', segment = '') => {
  const method = `${methodBase}.getAudioHours`;
  return getBaseUrl(method, { idSite, period, date, segment });
};

export const MediaAnalytics_getVideoResolutions = (idSite, period = 'day', date = '2023-12-01,2024-07-01', segment = '') => {
  const method = `${methodBase}.getVideoResolutions`;
  return getBaseUrl(method, { idSite, period, date, segment });
};

export const MediaAnalytics_getPlayers = (idSite, period = 'day', date = '2023-12-01,2024-07-01', segment = '') => {
  const method = `${methodBase}.getPlayers`;
  return getBaseUrl(method, { idSite, period, date, segment });
};

export const mediaAnalytics = {
  get: {
    func: MediaAnalytics_get,
    title: 'Overall Metrics for Videos and Audios'
  },
  getCurrentNumPlays: {
    func: MediaAnalytics_getCurrentNumPlays,
    title: 'Number of Video Plays in Last N Minutes'
  },
  getCurrentSumTimeSpent: {
    func: MediaAnalytics_getCurrentSumTimeSpent,
    title: 'Total Time Spent Playing Media in Last N Minutes'
  },
  getCurrentMostPlays: {
    func: MediaAnalytics_getCurrentMostPlays,
    title: 'Most Popular Videos in Last N Minutes'
  },
  getVideoResources: {
    func: MediaAnalytics_getVideoResources,
    title: 'Video Resources'
  },
  getAudioResources: {
    func: MediaAnalytics_getAudioResources,
    title: 'Audio Resources'
  },
  getVideoTitles: {
    func: MediaAnalytics_getVideoTitles,
    title: 'Video Titles'
  },
  getAudioTitles: {
    func: MediaAnalytics_getAudioTitles,
    title: 'Audio Titles'
  },
  getGroupedVideoResources: {
    func: MediaAnalytics_getGroupedVideoResources,
    title: 'Grouped Video Resources'
  },
  getGroupedAudioResources: {
    func: MediaAnalytics_getGroupedAudioResources,
    title: 'Grouped Audio Resources'
  },
  getVideoHours: {
    func: MediaAnalytics_getVideoHours,
    title: 'Video Hours'
  },
  getAudioHours: {
    func: MediaAnalytics_getAudioHours,
    title: 'Audio Hours'
  },
  getVideoResolutions: {
    func: MediaAnalytics_getVideoResolutions,
    title: 'Video Resolutions'
  },
  getPlayers: {
    func: MediaAnalytics_getPlayers,
    title: 'Media Players'
  }
};


export const mediaAnalyticsList = [
    'get',
    'getCurrentNumPlays',
    'getCurrentSumTimeSpent',
    'getCurrentMostPlays',
    'getVideoResources',
    'getAudioResources',
    'getVideoTitles',
    'getAudioTitles',
    'getGroupedVideoResources',
    'getGroupedAudioResources',
    'getVideoHours',
    'getAudioHours',
    'getVideoResolutions',
    'getPlayers'
  ];