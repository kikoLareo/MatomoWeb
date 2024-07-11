import axios from 'axios';

// Configurar axios con la URL base de la API del INE
const api = axios.create({
  baseURL: 'https://tiivii-ott.matomo.cloud/',
});

// Función para obtener datos del IPC del INE
export const getIpcData = async () => {
  try {
    const response = await api.get('index.php?date=2024-07-10&viewDataTable=graphEvolution&dateUsedInGraph=2024-06-11%2C2024-07-10&evolution_day_last_n=30&columns=nb_plays&module=MediaAnalytics&action=getEvolutionGraph&disableLink=1&widget=1&moduleToWidgetize=MediaAnalytics&actionToWidgetize=getEvolutionGraph&idSite=9&period=week&totals=0'); // Ajusta según sea necesario
    console.log('IPC Data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching IPC data:', error);
    throw error;
  }
};

export default api;
