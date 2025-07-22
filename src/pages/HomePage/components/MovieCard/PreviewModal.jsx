import React, { useMemo } from 'react';
import { createPortal } from 'react-dom';
import './PreviewModal.style.css';
import { useMoviesGenreQuery } from '../../../../hooks/useMoviesGenre';
import { useMoviesDetailQuery } from '../../../../hooks/useMovieDetail';
import { useMoviesCertificationQuery } from '../../../../hooks/useMovieCertification';
import Rating12 from '../../../../assets/icon/rating12.svg';
import Rating15 from '../../../../assets/icon/rating15.svg';
import Rating19 from '../../../../assets/icon/rating19.svg';
import RatingALL from '../../../../assets/icon/ratingAll.svg';

const PreviewModal = ({ movie, position, onMouseEnter, onMouseLeave }) => {
  const { data: genreList } = useMoviesGenreQuery();
  const { data: movieInfo } = useMoviesDetailQuery(movie?.id);
  const { data: movieGrade } = useMoviesCertificationQuery(movie?.id);

  const orgRuntime = movieInfo?.runtime;
  const runHours = Math.floor(orgRuntime / 60);
  const runMinutes = orgRuntime % 60;
  const runtimeKR = `${runHours}시간 ${runMinutes}분`;
  const krGradeInfo = movieGrade?.find(item => item.iso_3166_1 === 'KR');
  const cert = krGradeInfo?.release_dates[0]?.certification;
  const movieCert = cert ? cert : '19';

  const ratingIcons = {
    12: Rating12,
    15: Rating15,
    19: Rating19,
    ALL: RatingALL,
  };

  // const releaseDate = movieInfo?.release_date;
  const genreMap = useMemo(() => {
    const map = {};
    genreList?.forEach(genre => {
      map[genre.id] = genre.name;
    });
    return map;
  }, [genreList]);

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
        <div className="movie-info">
          <img src={ratingIcons[movieCert]} alt="등급" height="32px" />
          <p className="movie-runtime">{runtimeKR}</p>
        </div>
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
