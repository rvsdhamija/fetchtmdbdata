// MovieCard.tsx
import React from 'react';

interface MovieCardProps {
  title: string;
  poster_path: string;
  release_date: string;
  onFavoriteClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClick: () => void;
  isFavorite: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, poster_path, release_date, onFavoriteClick, isFavorite, onClick }) => {
  const handleFavoriteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Prevent event propagation to parent container
    onFavoriteClick(event);
  };

  return (
    <div className="movieContainer" onClick={onClick}>
      <h1>{title}</h1>
      {poster_path && (
        <img src={`https://image.tmdb.org/t/p/w200${poster_path}`} alt={`${title} Poster`} />
      )}
      <p>{release_date}</p>
      <button onClick={handleFavoriteClick}>
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>
    </div>
  );
};

export default MovieCard;
