import axios from 'axios';
import { baseURL,module, token_auth, format } from './config.js';

// Función para construir la URL base
export const getBaseUrl = ( method, params = {}) => {
  const base = `${baseURL}index.php?module=${module}&format=${format}&method=${method}&token_auth=${token_auth}`;
  const queryParams = new URLSearchParams(params).toString();
  return `${base}&${queryParams}`;
};

// Función para ejecutar la función correspondiente y obtener la URL
export const getUrl = (functionName, idSite, moduleConfig) => {
  if (moduleConfig.functions[functionName]) {
    return moduleConfig.functions[functionName](idSite, moduleConfig.baseUrl);
  } else {
    throw new Error(`La función ${functionName} no existe en el módulo.`);
  }
};

// Función para realizar la llamada API
export const fetchData = async (functionName, idSite, moduleConfig) => {
  const url = getUrl(functionName, idSite, moduleConfig);
  const response = await axios.get(url);
  return response.data;
};
