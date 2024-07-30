// src/utils/chatGptApi.js
import axios from 'axios';
const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

export const fetchChartAnalysis = async ({ title, description, data }) => {
    const conversationContext = [
        { role: 'system', content: 'Las respuestas deben ser en español y deben proporcionar un análisis detallado y comprensible de los datos proporcionados. Asegúrate de considerar el contexto de la gráfica y la descripción proporcionada.' },
        { role: 'user', content: `Analiza la siguiente gráfica titulada "${title}". ${description} Los datos son los siguientes: ${JSON.stringify(data)}. Por favor, proporciona un análisis detallado considerando tendencias, patrones y posibles implicaciones de estos datos.` }
      ];

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-3.5-turbo',
      messages: conversationContext,
      max_tokens: 500
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      }
    });

    return response.data.choices[0].message.content;

  } catch (error) {
    console.error('Error fetching analysis:', error);
    throw error;
  }
};
