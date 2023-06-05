// api.js
const fetch = require('node-fetch');

const fetchMovies = async () => {
  try {
    const response = await fetch(
      'https://my-json-server.typicode.com/Mohammad-Zagha/fakeMovie/db'
    );
    const data = await response.json();
    return data.movies;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};

module.exports = {
  fetchMovies,
};
