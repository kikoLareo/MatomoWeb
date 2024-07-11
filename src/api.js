import axios from 'axios';

// Configurar axios con la URL base de la API del INE
const api = axios.create({
  baseURL: 'https://tiivii-ott.matomo.cloud/',
});

// Función para obtener datos del IPC del INE
export const getIpcData = async () => {
  try {
    const response = await api.get('index.php?viewDataTable=graphEvolution&module=Widgetize&action=iframe&columns[]=nb_plays&disableLink=1&widget=1&moduleToWidgetize=MediaAnalytics&actionToWidgetize=getEvolutionGraph&idSite=9&token_auth=87148f8d4f8a9f7e5e21f6bd705bfdbd&period=day&date=yesterday'); // Ajusta según sea necesario
    console.log('IPC Data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching IPC data:', error);
    throw error;
  }
};

export default api;
