const axios = require('axios');

const API_KEY = 'qHRLwVS45jILrce24X7Y6U7L3v46sDBBUF7oYmtgk1NEuq7R6zrX58oREcmxoDtY';
const BASE_URL = 'https://eu-west-2.aws.data.mongodb-api.com/app/data-hrcfvpe/endpoint/data/v1/action';

exports.handler = async (event, context) => {
  const { collection, document } = JSON.parse(event.body);

  const data = JSON.stringify({
    collection: collection,
    database: 'kanaloa',
    dataSource: 'kanaloa',
    document: document
  });

  const config = {
    method: 'post',
    url: `${BASE_URL}/insertOne`,
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
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error("Error inserting data:", error);
    return {
      statusCode: 500,
      body: 'Error inserting data',
    };
  }
};