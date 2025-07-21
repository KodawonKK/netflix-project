import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './PreviewModal.style.css';

const PreviewModal = ({ movie, position, onMouseEnter, onMouseLeave }) => {
  const portal = document.getElementById('portal-root');
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
            {genre}
          </span>
        ))}
      </div>
    </div>,
    portal
  );
};

export default PreviewModal;
