import axios from 'axios';

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

if (!API_KEY) {
  console.error('No API key found. Make sure REACT_APP_OPENAI_API_KEY is set.');
}

export const fetchChartAnalysis = async (data) => {
  const prompt = `Analyze the following data and provide a detailed analysis: ${JSON.stringify(data)}`;

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo',
      max_tokens: 500,
    }, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching analysis from OpenAI:', error);
    throw new Error('Error fetching analysis.');
  }
};
