import React, { useRef } from 'react';
import './MovieCard.style.css';

const MovieCard = ({ movie, onHover }) => {
  const ref = useRef(null);
  const imgUrl = `https://media.themoviedb.org/t/p/w355_and_h200_multi_faces${movie.backdrop_path}`;
  const movieUrl = `https://www.themoviedb.org/video/play?key=ak2J7Wqsy0c`;

  return (
    <div className="movie-card-wrap">
      <div
        className="movie-card"
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
