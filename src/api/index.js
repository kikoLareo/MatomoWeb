import axios from 'axios';
import { baseURL } from '../config';

const api = axios.create({
  baseURL: baseURL,
});

export const fetchData = async (functionName, idSite, moduleConfig, params = {}) => {
  try {
    if (!moduleConfig[functionName]) {
      throw new Error(`Function ${functionName} is not defined in the config.`);
    }
    const url = moduleConfig[functionName](idSite, params);
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data for ${functionName}:`, error);
    throw error;
  }
};
