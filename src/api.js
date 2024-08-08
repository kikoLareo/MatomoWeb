import axios from 'axios';



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
