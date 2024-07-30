import axios from 'axios';

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

export const fetchChartAnalysis = async (data) => {
  const prompt = `Analyze the following data and provide a detailed analysis: ${JSON.stringify(data)}`;

  try {
    const response = await axios.post('https://api.openai.com/v1/completions', {
      prompt,
      model: 'text-davinci-003',
      max_tokens: 500,
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    return response.data.choices[0].text;
  } catch (error) {
    console.error('Error fetching analysis from OpenAI:', error);
    return 'Error fetching analysis.';
  }
};
