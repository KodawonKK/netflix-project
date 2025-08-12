import React, { useRef, useState } from 'react';
import './MovieCard.style.css';

const MovieCard = ({ movie, onHover, type, kind }) => {
  const ref = useRef(null);
  const hoverTimeout = useRef(null);
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
        onMouseEnter={() => {
          clearTimeout(hoverTimeout.current);
          hoverTimeout.current = setTimeout(() => {
            onHover(movie, ref);
          }, 700);
        }}
        onMouseLeave={() => {
          clearTimeout(hoverTimeout.current);
          onHover(null, null);
        }}
      >
        <img src={imgUrl} width="100%" alt="thumbnail" />
      </div>
    </div>
  );
};

export default MovieCard;
