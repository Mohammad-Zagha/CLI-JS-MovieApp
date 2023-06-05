// cli.js
const readline = require('readline');
const { readMovies, writeMovies } = require('./movieCatalog');
const {
 
  addMovie,
  updateMovie,
  deleteMovie,
  searchMovies,
  filterMovies,
  fetchMovies1,
} = require('./movieManagement');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const displayMenu = () => {
  console.log('===== Movie Catalog CLI =====');
  console.log('1. Display Movie Catalog');
  console.log('2. Add New Movie');
  console.log('3. Update Movie Details');
  console.log('4. Delete Movie');
  console.log('5. Search Movies');
  console.log('6. Filter Movies');
  console.log('7. Fetch From api');
  console.log('0. Exit');
};

const promptUserInput = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

const processUserCommand = async (command) => {
  switch (command) {
    case '1': {
      // Display Movie Catalog
      console.log('===== Movie Catalog =====');
      const movies = readMovies();
      movies.forEach((movie, index) => {
        console.log(`${index + 1}. ${movie.title}`);
      });
      break;
    }
    case '2': {
      // Add New Movie
      console.log('===== Add New Movie =====');
      const title = await promptUserInput('Enter movie title: ');
      const year = await promptUserInput('Enter movie Year: ');
      const runtime = await promptUserInput('Enter movie Runtime: ');
      const genre = await promptUserInput('Enter movie genre: ');

      const movie = {
        title,
        year,
        runtime,
        genre,
      };

      addMovie(movie);
      console.log('Movie added successfully.');
      break;
    }
    case '3': {
      // Update Movie Details
      console.log('===== Update Movie Details =====');
      const movies = readMovies();
      movies.forEach((movie, index) => {
        console.log(`${index + 1}. ${movie.title}`);
      });

      const movieIndex = parseInt(
        await promptUserInput('Enter the index of the movie to update: ')
      );

      if (isNaN(movieIndex) || movieIndex < 1 || movieIndex > movies.length) {
        console.log('Invalid movie index.');
        break;
      }

      const updatedTitle = await promptUserInput('Enter updated movie title: ');
      const updatedyear = await promptUserInput(
        'Enter updated movie year: '
      );
      const updatedRuntime = await promptUserInput(
        'Enter updated movie Runtime: '
      );
      const updatedGenre = await promptUserInput('Enter updated movie genre: ');

      const updatedMovie = {
        title: updatedTitle,
        year: updatedyear,
        runtime: updatedRuntime,
        genre: updatedGenre,
      };

      updateMovie(movieIndex - 1, updatedMovie);
      console.log('Movie details updated successfully.');
      break;
    }
    case '4': {
      // Delete Movie
      console.log('===== Delete Movie =====');
      const movies = readMovies();
      movies.forEach((movie, index) => {
        console.log(`${index + 1}. ${movie.title}`);
      });

      const movieIndex = parseInt(
        await promptUserInput('Enter the index of the movie to delete: ')
      );

      if (isNaN(movieIndex) || movieIndex < 1 || movieIndex > movies.length) {
        console.log('Invalid movie index.');
        break;
      }

      deleteMovie(movieIndex - 1);
      console.log('Movie deleted successfully.');
      break;
    }
    case '5': {
      // Search Movies
      console.log('===== Search Movies =====');
      const query = await promptUserInput('Enter a search query: ');
      const movies = searchMovies(query);

      if (movies.length === 0) {
        console.log('No movies found.');
      } else {
        console.log('===== Search Results =====');
        movies.forEach((movie, index) => {
          console.log(`${index + 1}. ${movie.title}`);
        });
      }
      break;
    }
    case '6': {
      // Filter Movies
      console.log('===== Filter Movies =====');
      console.log('1. Filter by Genre');
      console.log('2. Filter by Release Year');
      const filterOption = await promptUserInput('Enter a filter option: ');

      switch (filterOption) {
        case '1': {
          const genre = await promptUserInput('Enter genre to filter: ');
          const movies = filterMovies('genre', genre);

          if (movies.length === 0) {
            console.log('No movies found.');
          } else {
            console.log('===== Filtered Movies =====');
            movies.forEach((movie, index) => {
              console.log(`${index + 1}. ${movie.title}`);
            });
          }
          break;
        }
        case '2': {
          const releaseYear = await promptUserInput(
            'Enter release year to filter: '
          );
          const movies = filterMovies('releaseYear', releaseYear);

          if (movies.length === 0) {
            console.log('No movies found.');
          } else {
            console.log('===== Filtered Movies =====');
            movies.forEach((movie, index) => {
              console.log(`${index + 1}. ${movie.title}`);
            });
          }
          break;
        }
        default:
          console.log('Invalid filter option.');
          break;
      }
      break;
    }
    case '0': {
      // Exit
      console.log('Exiting...');
      rl.close();
      break;
    }
    case '7': {
      // Display Movie Catalog
      console.log('===== Fetched =====');
      fetchMovies1();
      break;
    }
    default:
      console.log('Invalid command.');
      break;
  }
};

const startCli = () => {
  displayMenu();
  rl.question('Enter a command: ', async (command) => {
    await processUserCommand(command);
    startCli();
  });
};

module.exports = {
  startCli,
};
