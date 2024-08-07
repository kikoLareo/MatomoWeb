const axios = require('axios');

const API_KEY = 'qHRLwVS45jILrce24X7Y6U7L3v46sDBBUF7oYmtgk1NEuq7R6zrX58oREcmxoDtY';
const BASE_URL = 'https://eu-west-2.aws.data.mongodb-api.com/app/data-hrcfvpe/endpoint/data/v1/action';

exports.handler = async (event, context) => {
  const { collection, query } = JSON.parse(event.body);

  const data = JSON.stringify({
    collection: collection,
    database: 'kanaloa',
    dataSource: 'kanaloa',
    filter: query,
  
  });

  const config = {
    method: 'post',
    url: `${BASE_URL}/findOne`,
    headers: {
      'Content-Type': 'application/json',
      'api-key': API_KEY,
    },
    data: data
  };

  try {
    const response = await axios(config);
    return {
      statusCode: 200,
      body: JSON.stringify(response.data.document),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: 'Error fetching data',
    };
  }
};