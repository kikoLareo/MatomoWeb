import axios from 'axios';

const baseURL = 'https://tiivii-ott.matomo.cloud/';

const api = axios.create({
  baseURL: baseURL,
});

/**
 * Fetch data from the Media Analytics API.
 * @param {string} functionName - The name of the function to call.
 * @param {number} idSite - The ID of the site.
 * @param {object} config - The configuration object containing all the functions.
 * @param {object} params - Additional parameters for the function.
 * @returns {Promise} - The API response data.
 */
export const fetchData = async (functionName, idSite, config, params = {}) => {
  try {
    if (!config[functionName]) {
      throw new Error(`Function ${functionName} is not defined in the config.`);
    }
    const url = config[functionName](idSite, ...Object.values(params));
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data for ${functionName}:`, error);
    throw error;
  }
};
