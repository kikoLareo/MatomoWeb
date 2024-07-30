import axios from 'axios';

const API_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchChartAnalysis = async (data, retryCount = 3, delayMs = 1000) => {
  if (!data || data.length === 0) {
    throw new Error('No data provided for analysis.');
  }

  try {
    const response = await axios.post(
      API_URL,
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `Analyze the following data and provide a detailed analysis: ${JSON.stringify(data)}`,
          },
        ],
        max_tokens: 500,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    if (retryCount > 0 && error.response && error.response.status === 429) {
      await delay(delayMs);
      return fetchChartAnalysis(data, retryCount - 1, delayMs * 2);
    }
    console.error('Error fetching analysis from OpenAI:', error);
    throw new Error('Failed to fetch analysis. Please try again later.');
  }
};

export default fetchChartAnalysis;
