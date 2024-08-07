var axios = require('axios');


//const API_KEY = '8m9VwHl2uwQArIAyfpcrkAO3g4uHRb3KBIpWVb3EDUgEBHso8rhImdUQTQKZZwso';
const API_KEY =  'qHRLwVS45jILrce24X7Y6U7L3v46sDBBUF7oYmtgk1NEuq7R6zrX58oREcmxoDtY';
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
    url: 'https://eu-west-2.aws.data.mongodb-api.com/app/data-hrcfvpe/endpoint/data/v1/action/findOne',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': API_KEY,
    },
    data: data
};

axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
        return JSON.stringify(response.data);
        // return response.data.document;
    
    })
    .catch(function (error) {
        console.log(error);
        throw error;
    });
};

export const insertData = async (collection, document) => {
 
var data = JSON.stringify({
  "collection": collection,
  "database": "kanaloa",
  "dataSource": "kanaloa",
  "document" : document,
  "projection": {
      "_id": 1
  }
});
  var config = {
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
