import axios from 'axios';

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
const endpoint = 'https://api.openai.com/v1/engines/davinci-codex/completions';

export const fetchChartAnalysis = async (chartData) => {
  const prompt = `Analyze the following chart data and provide insights:\n${JSON.stringify(chartData)}`;

  const response = await axios.post(
    endpoint,
    {
      prompt,
      max_tokens: 150,
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );

  return response.data.choices[0].text;
};
