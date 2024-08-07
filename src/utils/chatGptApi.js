import axios from 'axios';
import { insertData, fetchData } from './db/dbInteractions';

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

const fetchAndSaveAnalysis = async ({ module, action, title, description, idSite,data }) => {
  // Fetch the context from the database
  const generalContext = await fetchData('idSitesData', { idSite });
  const moduleData = await fetchData('moduleData',  { idSite, module, action });

  const formattedData = data.join(', ');

  const interactionContext = [
    { role: 'system', content: 'Las respuestas deben ser en español y deben proporcionar un análisis detallado y comprensible de los datos proporcionados. Asegúrate de considerar el contexto de la gráfica y la descripción proporcionada.' },
    { role: 'user', content: `Analiza la siguiente gráfica titulada "${title}" para el sitio con id ${idSite}. ${description} Los datos son los siguientes: ${formattedData}. Por favor, proporciona un análisis detallado considerando tendencias, patrones y posibles implicaciones de estos datos.` }
  ];

  if (generalContext) {
    interactionContext.push({ role: 'system', content: `Contexto general: ${JSON.stringify(generalContext.context)}` });
  }

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: interactionContext,
      max_tokens: 500
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      }
    });

    const analysis = response.data.choices[0].message.content;

    await insertData( 'moduleData', {
      idSite,
      module: module,
      action: action,
      data: moduleData.data,
      analysis,
      date: new Date()
    });

    if (generalContext) {
      const updatedContext = `${generalContext.context} ${analysis}`;
      await insertData( 'idSitesData', {
        idSite,
        context: updatedContext,
        date: new Date()
      });
    } else {
      await insertData( 'idSitesData', {
        idSite,
        context: analysis,
        date: new Date()
      });
    }

    return analysis;

  } catch (error) {
    console.error('Error fetching analysis:', error);
    throw error;
  }
};

export { fetchAndSaveAnalysis };
