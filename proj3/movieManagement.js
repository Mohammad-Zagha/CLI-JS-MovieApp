// movieManagement.js
const { readMovies, writeMovies } = require('./movieCatalog');
const { fetchMovies } = require('./api');
const addMovie = (movie) => {
  const movies = readMovies();
  movies.push(movie);
  writeMovies(movies);
};
const fetchMovies1 = async () =>{
  const movies = await fetchMovies();
  movies.forEach((movie) => {
    addMovie(movie);
  });
}
const updateMovie = (index, updatedMovie) => {
  const movies = readMovies();
  movies[index] = updatedMovie;
  writeMovies(movies);
};

const deleteMovie = (index) => {
  const movies = readMovies();
  movies.splice(index, 1);
  writeMovies(movies);
};

const searchMovies = (query) => {
  const movies = readMovies();
  const filteredMovies = movies.filter((movie) =>
    Object.values(movie).some((value) =>
      String(value).toLowerCase().includes(query.toLowerCase())
    )
  );
  return filteredMovies;
};

const filterMovies = (filterKey, filterValue) => {
  const movies = readMovies();
  const filteredMovies = movies.filter((movie) =>
    String(movie[filterKey]).toLowerCase().includes(filterValue.toLowerCase())
  );
  return filteredMovies;
};

module.exports = {
  addMovie,
  updateMovie,
  deleteMovie,
  searchMovies,
  filterMovies,
  fetchMovies1
};
