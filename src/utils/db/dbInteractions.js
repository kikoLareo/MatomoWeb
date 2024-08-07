const API_URL = '/.netlify/functions';

export const fetchData = async (collection, query = {}) => {
  const response = await fetch(`${API_URL}/fetchData`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ collection, query }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data;
};

export const insertData = async (collection, document) => {
  const response = await fetch(`${API_URL}/insertData`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ collection, document }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data;
};