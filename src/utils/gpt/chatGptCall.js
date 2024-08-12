import axios from 'axios';

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

const chatGpt = async (interactionContext ) =>  { 
  try {
    console.log('Fetching analysis...');
    console.log('Context:', interactionContext);
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
    console.log('Analysis:', analysis);

    return analysis;

  } catch (error) {
    console.error('Error fetching analysis:', error);
    throw error;
  }
};

export { chatGpt };
