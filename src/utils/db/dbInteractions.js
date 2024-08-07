import axios from 'axios';

const API_KEY = 'qHRLwVS45jILrce24X7Y6U7L3v46sDBBUF7oYmtgk1NEuq7R6zrX58oREcmxoDtY';
const BASE_URL = 'https://eu-west-2.aws.data.mongodb-api.com/app/data-hrcfvpe/endpoint/data/v1/action';

export const fetchData = async (collection, query = {}) => {

  var data = JSON.stringify({
    "collection": collection,
    "database": "kanaloa",
    "dataSource": "kanaloa",
    "filter": query,
    "projection": {
        "_id": 1
    }
  });

  var config = {
    method: 'post',
    url: `${BASE_URL}/findOne`,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': API_KEY,
    },
    data: data
  };

  try {

    const response = await axios(config);
    return response.data.document;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const insertData = async (collection, document) => {
  var data = JSON.stringify({
    "collection": collection,
    "database": "kanaloa",
    "dataSource": "kanaloa",
    "document" : document
  });

  var config = {
    method: 'post',
    url: `${BASE_URL}/insertOne`,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': API_KEY,
    },
    data: data
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error("Error inserting data:", error);
    throw error;
  }
};
