import React, { useRef } from 'react';
import './MovieCard.style.css';

const MovieCard = ({ movie, onHover, type }) => {
  const ref = useRef(null);
  const imgUrl =
    type === 'toprank'
      ? `https://media.themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}`
      : `https://media.themoviedb.org/t/p/w355_and_h200_multi_faces${movie.backdrop_path}`;
  const movieUrl = `https://www.themoviedb.org/video/play?key=ak2J7Wqsy0c`;

  return (
    <div className="movie-card-wrap">
      <div
        className={type === 'toprank' ? 'movie-card top-rank' : 'movie-card'}
        ref={ref}
        onMouseEnter={() => onHover(movie, ref)}
      >
        <img
          src={imgUrl}
          width="100%"
          alt="thumbnail"
          onMouseLeave={() => onHover(movie, ref)}
        />
      </div>
    </div>
  );
};

export default MovieCard;
