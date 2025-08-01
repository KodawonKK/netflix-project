import React, { useMemo } from 'react';
import { createPortal } from 'react-dom';
import './PreviewModal.style.css';
import { useMoviesDetailQuery } from '../../hooks/movie/useMovieDetail';
import { useMoviesCertificationQuery } from '../../hooks/movie/useMovieCertification';

import Rating12 from '../../assets/icon/rating12.svg';
import Rating15 from '../../assets/icon/rating15.svg';
import Rating19 from '../../assets/icon/rating19.svg';
import RatingALL from '../../assets/icon/ratingAll.svg';
import { useTVDetailQuery } from '../../hooks/tv/useTVDetail';

const PreviewModal = ({
  movie,
  position,
  onMouseEnter,
  onMouseLeave,
  kind,
}) => {
  const { data: movieInfo } = useMoviesDetailQuery(movie?.id);
  const { data: tvInfo } = useTVDetailQuery(movie?.id, kind);
  const { data: movieGrade } = useMoviesCertificationQuery(movie?.id);

  const infoList = kind === 'movie' ? movieInfo : tvInfo;

  const orgRuntime = movieInfo?.runtime;
  const runHours = Math.floor(orgRuntime / 60);
  const runMinutes = orgRuntime % 60;
  const runtimeKR = `${runHours}시간 ${runMinutes}분`;
  const episode = `에피소드 ${tvInfo?.number_of_episodes}개`;
  const season = tvInfo?.number_of_seasons;
  const tvDetailInfo = season >= 2 ? `시즌 ${season}개` : episode;
  console.log(tvInfo);
  const krGradeInfo = movieGrade?.find(item => item.iso_3166_1 === 'KR');
  const cert = krGradeInfo?.release_dates[0]?.certification;
  const movieCert = cert === undefined || cert === '' ? '19' : cert;

  const ratingIcons = {
    12: Rating12,
    15: Rating15,
    19: Rating19,
    ALL: RatingALL,
  };

  // const releaseDate = movieInfo?.release_date;

  const genreMap = useMemo(() => {
    const map = {};
    infoList?.genres?.forEach(genre => {
      map[genre.id] = genre.name;
    });
    return map;
  }, [infoList?.genres]);

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
          <p className="movie-runtime">
            {kind === 'movie' ? { runtimeKR } : tvDetailInfo}
          </p>
        </div>
        <h4 className="movie-title">
          {kind === 'movie' ? movie?.title : movie?.name}
        </h4>
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
