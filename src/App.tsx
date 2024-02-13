import {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';
import MovieCard from './components/MovieCard';
import MovieDetails from './components/MovieDetails';
import Navbar from './components/Navbar';
import WelcomePage from './components/WelcomePage';
import { title } from 'process';

interface Movies {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  overview: string;
}

function App() {
  const [movies, setMovies] = useState<Movies[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movies | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showHome, setShowHome] = useState(true);
  const [showPopular, setShowPopular] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    const apiKey = "2c1a7fb680343ffb6ce5ec7eadffd694";
    const popular = "https://api.themoviedb.org/3/movie/popular";

    axios.get(`${popular}?api_key=${apiKey}`).then((response) => {
      const result = response.data.results;
      setMovies(result);
    });
  };

  const showHomeSection = () => {
    setShowHome(true);
    setShowPopular(false);
    setShowFavorites(false);
    setSelectedMovie(null);
  };

  const showPopularSection = () => {
    setShowHome(false);
    setShowPopular(true);
    setShowFavorites(false);
    setSelectedMovie(null);
  };

  const showFavoritesSection = () => {
    setShowHome(false);
    setShowPopular(false);
    setShowFavorites(true);
    setSelectedMovie(null);
  };

  const goBack = () => {
    setShowHome(false);
    setShowPopular(true);
    setShowFavorites(false);
    setSelectedMovie(null);
  };

  const handleMovieClick = (movie: Movies) => {
    setSelectedMovie(movie);
    setShowHome(false);
    setShowPopular(false);
    setShowFavorites(false);
  };

  const addToFavorites = (movieId: number) => {
    setFavorites((prevFavorites) => [...prevFavorites, movieId]);
  };

  const removeFromFavorites = (movieId: number) => {
    setFavorites((prevFavorites) => prevFavorites.filter((id) => id !== movieId));
  };

  return (
    <div className="App">
      <Navbar
        showHome={showHomeSection}
        showPopular={showPopularSection}
        showFavorites={showFavoritesSection}
        goBack={goBack}
      />
      {showHome && <WelcomePage />}
      {showPopular && (
        <div className="movies-container">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              poster_path={movie.poster_path}
              release_date={movie.release_date}
              onClick={() => handleMovieClick(movie)}
              onFavoriteClick={() => addToFavorites(movie.id)}
              isFavorite={favorites.includes(movie.id)}
            />
          ))}
        </div>
      )}
      {selectedMovie && (
        <MovieDetails
          title={selectedMovie.title}
          poster_path={selectedMovie.poster_path}
          release_date={selectedMovie.release_date}
          overview={selectedMovie.overview}
        />
      )}
      {showFavorites && (
        <div className="movies-container">
          {movies
            .filter((movie) => favorites.includes(movie.id))
            .map((favoriteMovie) => (
              <MovieCard
                key={favoriteMovie.id}
                title={favoriteMovie.title}
                poster_path={favoriteMovie.poster_path}
                release_date={favoriteMovie.release_date}
                onClick={() => handleMovieClick(favoriteMovie)}
                onFavoriteClick={() => removeFromFavorites(favoriteMovie.id)}
                isFavorite={favorites.includes(favoriteMovie.id)}
              />
            ))}
          {favorites.length === 0 && <p>It looks like you haven't added any favorite movies yet. Start exploring and adding movies to your favorites to create your personalized list!</p>}
        </div>
      )}
    </div>
  );
}

export default App;
