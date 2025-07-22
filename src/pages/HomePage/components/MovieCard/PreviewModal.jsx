import React, { useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import './PreviewModal.style.css';
import { useMoviesGenreQuery } from '../../../../hooks/useMoviesGenre';

const PreviewModal = ({ movie, position, onMouseEnter, onMouseLeave }) => {
  const { data: genreList } = useMoviesGenreQuery();
  const portal = document.getElementById('portal-root');

  const genreMap = useMemo(() => {
    const map = {};
    genreList?.forEach(genre => {
      map[genre.id] = genre.name;
    });
    return map;
  }, [genreList]);

  if (!portal || !movie) return null;

  const style = {
    top: position.top,
    left: position.left,
  };

  return createPortal(
    <div
      className="preview-modal"
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <img
        src={`https://media.themoviedb.org/t/p/w355_and_h200_multi_faces${movie?.backdrop_path}`}
        width="100%"
        alt="thumbnail"
      />
      <div className="preview-movie-info">
        <h4 className="movie-title">{movie?.title}</h4>
        {movie?.genre_ids.map((genre, idx) => (
          <span className={`movie-genre ${idx === 0 && 'no-bullet'}`} key={idx}>
            {genreMap[genre]}
          </span>
        ))}
      </div>
    </div>,
    portal
  );
};

export default PreviewModal;
