import React, { useMemo, useState } from 'react';
import './PreviewModal.style.css';
import { useMoviesDetailQuery } from '../../hooks/movie/useMovieDetail';
import { useMoviesCertificationQuery } from '../../hooks/movie/useMovieCertification';
import { useTVDetailQuery } from '../../hooks/tv/useTVDetail';
import { motion } from 'framer-motion';
import { formatRuntime } from '../../utils/formatRuntime';
import Rating12 from '../../assets/icon/rating12.svg';
import Rating15 from '../../assets/icon/rating15.svg';
import Rating19 from '../../assets/icon/rating19.svg';
import RatingALL from '../../assets/icon/ratingAll.svg';
import OpenIcon from '../../assets/icon/open.svg';
import Play from '../../assets/icon/play.svg';
import Like from '../../assets/icon/like.svg';
import Plus from '../../assets/icon/plus.svg';

const PreviewModal = ({
  contentInfo,
  position,
  onMouseEnter,
  onMouseLeave,
  kind,
  setOpen,
  setSelectedInfo,
}) => {
  const { data: movieInfo } = useMoviesDetailQuery(contentInfo?.id, kind);
  const { data: tvInfo } = useTVDetailQuery(contentInfo?.id, kind);
  const { data: movieGrade } = useMoviesCertificationQuery(
    contentInfo?.id,
    kind
  );

  const infoList = kind === 'movie' ? movieInfo : tvInfo;
  const runtimeKR = formatRuntime(movieInfo?.runtime);
  const episode = `에피소드 ${tvInfo?.number_of_episodes}개`;
  const season = tvInfo?.number_of_seasons;
  const tvDetailInfo = season >= 2 ? `시즌 ${season}개` : episode;
  const krGradeInfo = movieGrade?.find(item => item.iso_3166_1 === 'KR');
  const cert = krGradeInfo?.release_dates[0]?.certification;
  const movieCert = cert === undefined || cert === '' ? '19' : cert;

  const ratingIcons = {
    12: Rating12,
    15: Rating15,
    19: Rating19,
    ALL: RatingALL,
  };
  const infoMenuIcons = [Play, Like, Plus];

  // const releaseDate = movieInfo?.release_date;

  const genreMap = useMemo(() => {
    const map = {};
    infoList?.genres?.forEach(genre => {
      map[genre.id] = genre.name;
    });
    return map;
  }, [infoList?.genres]);

  const portal = document.getElementById('portal-root');
  if (!portal || !contentInfo) return null;

  const style = {
    top: 0,
    left: position.left,
  };

  if (!infoList || !infoList.genres || !contentInfo?.backdrop_path) return null;

  return (
    <motion.div
      className="preview-modal"
      style={style}
      initial={{ scale: 1, opacity: 0 }}
      animate={{ scale: 1.2, opacity: 1 }}
      exit={{ scale: 1, opacity: 0 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <img
        src={`https://media.themoviedb.org/t/p/w355_and_h200_multi_faces${contentInfo?.backdrop_path}`}
        width="100%"
        alt="thumbnail"
      />
      <div className="preview-movie-info">
        <div className="movie-info-top">
          <div className="info-left">
            {infoMenuIcons.map((item, idx) => (
              <button key={idx}>
                <img src={item} alt="" />
              </button>
            ))}
          </div>
          <div className="open-info">
            <button
              onClick={() => {
                setOpen(true);
                setSelectedInfo(infoList);
              }}
            >
              <img src={OpenIcon} alt="상세정보열기" />
            </button>
          </div>
        </div>
        <div className="movie-info">
          {kind === 'movie' ? (
            <img src={ratingIcons[movieCert]} alt="등급" height="32px" />
          ) : (
            <div className="tv-grade">15+</div>
          )}

          <p className="movie-runtime">
            {kind === 'movie' ? runtimeKR : tvDetailInfo}
          </p>
        </div>
        <h4 className="movie-title">
          {kind === 'movie' ? contentInfo?.title : contentInfo?.name}
        </h4>
        {contentInfo?.genre_ids.map((genre, idx) => (
          <span className={`movie-genre ${idx === 0 && 'no-bullet'}`} key={idx}>
            {genreMap[genre]}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default PreviewModal;
