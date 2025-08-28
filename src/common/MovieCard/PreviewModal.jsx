import React from 'react';
import './PreviewModal.style.css';
import { useMoviesCertificationQuery } from '../../hooks/movie/useMovieCertification';
import { useTVCertificationQuery } from '../../hooks/tv/useTVCertification';
import { motion } from 'framer-motion';
import Rating12 from '../../assets/icon/rating12.svg';
import Rating15 from '../../assets/icon/rating15.svg';
import Rating19 from '../../assets/icon/rating19.svg';
import RatingALL from '../../assets/icon/ratingAll.svg';
import OpenIcon from '../../assets/icon/open.svg';
import { useMapGenres } from '../../hooks/useMapGenres';
import LikeBtn from '../Buttons/LikeBtn';
import { mapInfo } from '../../utils/mapInfo';
import { useTVDetailFullQuery } from '../../hooks/tv/useTVDetailFull';
import { useMoviesDetailFullQuery } from '../../hooks/movie/useMovieDetailFull';
import PlayBtn from '../Buttons/PlayBtn';
import AddBtn from '../Buttons/AddBtn';
import PlayModal from '../PlayModal/PlayModal';
import { usePlayModalStore } from '../../stores/playModalStore';
import { useMovieVideoQuery } from '../../hooks/movie/useMovieVideo';
import { useTVVideoQuery } from '../../hooks/tv/useTVVideo';
import { usePreviewDetailModalStore } from '../../stores/previewDetailModalStore';

const PreviewModal = ({
  contentInfo,
  position,
  onMouseEnter,
  onMouseLeave,
  kind,
  setSelectedInfo,
}) => {
  const contentId = contentInfo?.id;
  const { data: movieGrade } = useMoviesCertificationQuery(contentId, kind);
  const { data: tvGrade } = useTVCertificationQuery(contentId, kind);
  const { data: tvFullInfo } = useTVDetailFullQuery(contentId, kind);
  const { data: movieFullInfo } = useMoviesDetailFullQuery(contentId, kind);
  const fullInfo = kind === 'movie' ? movieFullInfo : tvFullInfo;
  const { runtimeKR, title, movieCert, tvCert } = mapInfo(
    kind,
    fullInfo,
    movieGrade,
    tvGrade
  );
  const movieVideo = useMovieVideoQuery(contentId, kind);
  const tvVideo = useTVVideoQuery(contentId, kind);
  const video = kind === 'movie' ? movieVideo : tvVideo;
  const typeMap = {
    movie: ['Trailer'],
    tv: ['Teaser', 'Trailer'],
  };
  const findKey = video?.data?.find(item => typeMap[kind].includes(item.type));
  const { openModals, closeModal } = usePlayModalStore();
  const { openDetailModal } = usePreviewDetailModalStore();
  const playModalKey = `previewModal-${contentId}`;
  const ratingIcons = {
    12: Rating12,
    15: Rating15,
    19: Rating19,
    ALL: RatingALL,
  };
  const infoMenuIcons = [
    <PlayBtn kind="circle" style={{ background: '#fff' }} id={playModalKey} />,
    <LikeBtn />,
    <AddBtn />,
  ];
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
            {infoMenuIcons.map((item, idx) => (
              <div key={idx}>{item}</div>
            ))}
          </div>
          <div className="open-info">
            <button
              onClick={() => {
                openDetailModal(contentId);
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
      {openModals[playModalKey] && (
        <PlayModal
          youtubeKey={findKey?.key}
          closeModal={() => closeModal(playModalKey)}
        />
      )}
    </motion.div>
  );
};

export default PreviewModal;
