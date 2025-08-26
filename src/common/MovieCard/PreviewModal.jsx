import React from 'react';
import './PreviewModal.style.css';
import { useMoviesDetailQuery } from '../../hooks/movie/useMovieDetail';
import { useMoviesCertificationQuery } from '../../hooks/movie/useMovieCertification';
import { useTVCertificationQuery } from '../../hooks/tv/useTVCertification';
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
import { useMapGenres } from '../../hooks/useMapGenres';
import LikeBtn from '../Buttons/LikeBtn';
import { mapInfo } from '../../utils/mapInfo';
import { useTVDetailFullQuery } from '../../hooks/tv/useTVDetailFull';
import { useMoviesDetailFullQuery } from '../../hooks/movie/useMovieDetailFull';

const PreviewModal = ({
  contentInfo,
  position,
  onMouseEnter,
  onMouseLeave,
  kind,
  setOpen,
  setSelectedInfo,
}) => {
  const { data: movieGrade } = useMoviesCertificationQuery(
    contentInfo?.id,
    kind
  );
  const { data: tvGrade } = useTVCertificationQuery(contentInfo?.id, kind);
  const { data: tvFullInfo } = useTVDetailFullQuery(contentInfo?.id, kind);
  const { data: movieFullInfo } = useMoviesDetailFullQuery(
    contentInfo?.id,
    kind
  );
  const fullInfo = kind === 'movie' ? movieFullInfo : tvFullInfo;
  const { runtimeKR, title, movieCert, tvCert } = mapInfo(
    kind,
    fullInfo,
    movieGrade,
    tvGrade
  );
  const ratingIcons = {
    12: Rating12,
    15: Rating15,
    19: Rating19,
    ALL: RatingALL,
  };
  const infoMenuIcons = [Play, Like, Plus];
  const genreMap = useMapGenres(fullInfo?.genres);
  const style = {
    top: 0,
    left: position.left,
  };

  if (!fullInfo || !fullInfo.genres || !contentInfo?.backdrop_path) return null;

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
        loading="lazy"
      />
      <div className="preview-movie-info">
        <div className="movie-info-top">
          <div className="info-left">
            {infoMenuIcons.map((item, idx) =>
              idx !== 1 ? (
                <button key={idx}>
                  <img src={item} alt="" />
                </button>
              ) : (
                <LikeBtn />
              )
            )}
          </div>
          <div className="open-info">
            <button
              onClick={() => {
                setOpen(true);
                setSelectedInfo(fullInfo);
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
            <div className="tv-grade">{`${tvCert}+`}</div>
          )}

          <p className="movie-runtime">{runtimeKR}</p>
        </div>
        <h4 className="movie-title">{title}</h4>
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
