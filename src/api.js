import axios from 'axios';

// Configurar axios con la URL base de la API del INE
const api = axios.create({
  baseURL: 'https://tiivii-ott.matomo.cloud/',
});

// Función para obtener datos del IPC del INE
export const getIpcData = async () => {
  try {
    const response = await api.get('index.php?date=2024-07-02&module=Annotations&action=getEvolutionIcons&idSite=1&period=day&filter_limit=-1&lastN=30'); // Ajusta según sea necesario
    return response.data;
  } catch (error) {
    console.error('Error fetching IPC data:', error);
    throw error;
  }
};

export default api;
