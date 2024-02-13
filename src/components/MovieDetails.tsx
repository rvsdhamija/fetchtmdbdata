// MovieDetails.tsx
import React from 'react';

interface MovieDetailsProps {
  title: string;
  poster_path: string;
  release_date: string;
  overview: string;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ title, poster_path, release_date, overview }) => {
  return (
    <div className="movieDetailsContainer">
      <h1>{title}</h1>
      {poster_path && (
        <img src={`https://image.tmdb.org/t/p/w200${poster_path}`} alt={`${title} Poster`} />
      )}
      <p>{release_date}</p>
      <p>{overview}</p>
    </div>
  );
};

export default MovieDetails;
