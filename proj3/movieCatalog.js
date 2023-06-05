// movieCatalog.js
const fs = require('fs');

const readMovies = () => {
  try {
    const moviesData = fs.readFileSync('movies.json', 'utf8');
    return JSON.parse(moviesData);
  } catch (err) {
    console.error('Error reading movies data:', err);
    return [];
  }
};

const writeMovies = (movies) => {
  try {
    fs.writeFileSync('movies.json', JSON.stringify(movies, null, 2));
   
  } catch (err) {
    console.error('Error writing movies data:', err);
  }
};

module.exports = {
  readMovies,
  writeMovies,
};
