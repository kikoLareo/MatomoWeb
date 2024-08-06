import axios from 'axios';

const API_KEY = '8m9VwHl2uwQArIAyfpcrkAO3g4uHRb3KBIpWVb3EDUgEBHso8rhImdUQTQKZZwso';
const BASE_URL = 'https://eu-west-2.aws.data.mongodb-api.com/app/data-hrcfvpe/endpoint/data/v1/action';

export const fetchData = async (collection, database, query = {}, projection = {}) => {
  const data = JSON.stringify({
    collection: collection,
    database: database,
    dataSource: "kanaloa",
    filter: query,
    projection: projection,
  });

  const config = {
    method: 'post',
    url: `${BASE_URL}/findOne`,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': API_KEY,
    },
    data: data,
  };

  try {
    const response = await axios(config);
    return response.data.document;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const insertData = async (collection, database, document) => {
  const data = JSON.stringify({
    collection: collection,
    database: database,
    dataSource: "kanaloa",
    document: document,
  });

  const config = {
    method: 'post',
    url: `${BASE_URL}/insertOne`,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': API_KEY,
    },
    data: data,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
};
