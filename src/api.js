import axios from 'axios';

// Configurar axios con la URL base de la API del INE
const api = axios.create({
  baseURL: 'https://servicios.ine.es/wstempus/js/ES/',
});

// Función para obtener datos del IPC del INE
export const getIpcData = async () => {
  try {
    const response = await api.get('DATOS_TABLA/t26/p067/p01/serie/l0/01004a.px?nult=4'); // Ajusta según sea necesario
    console.log('IPC Data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching IPC data:', error);
    throw error;
  }
};

export default api;
