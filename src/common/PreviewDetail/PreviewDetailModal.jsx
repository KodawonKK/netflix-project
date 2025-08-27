import React, { useEffect, useState } from 'react';
import './PreviewDetailModal.style.css';
import CloseIcon from '../../assets/icon/close.svg';
import { useMovieVideoQuery } from '../../hooks/movie/useMovieVideo';
import { useMoviesDetailFullQuery } from '../../hooks/movie/useMovieDetailFull';
import { useMapGenres } from '../../hooks/useMapGenres';
import OpenIcon from '../../assets/icon/open.svg';
import PlayBtn from '../Buttons/PlayBtn';
import AddBtn from '../Buttons/AddBtn';
import LikeBtn from '../Buttons/LikeBtn';
import { useTVDetailFullQuery } from '../../hooks/tv/useTVDetailFull';
import { mapInfo } from '../../utils/mapInfo';
import PlayModal from '../PlayModal/PlayModal';
import { usePlayModalStore } from '../../stores/playModalStore';
import { useTVVideoQuery } from '../../hooks/tv/useTVVideo';

const PreviewDetailModal = ({ isOpen, setOpen, kind, selectedInfoId }) => {
  const [visibleCount, setVisibleCount] = useState(9);
  const [isClick, setClick] = useState(false);
  const { data: tvFullInfo } = useTVDetailFullQuery(selectedInfoId, kind);
  const { data: movieFullInfo } = useMoviesDetailFullQuery(
    selectedInfoId,
    kind
  );
  const fullInfo = kind === 'movie' ? movieFullInfo : tvFullInfo;
  const movieVideo = useMovieVideoQuery(selectedInfoId, kind);
  const tvVideo = useTVVideoQuery(selectedInfoId, kind);
  const video = kind === 'movie' ? movieVideo : tvVideo;
  const typeMap = {
    movie: ['Trailer'],
    tv: ['Teaser', 'Trailer'],
  };
  const findKey = video?.data?.find(item => typeMap[kind].includes(item.type));
  const { imgUrl, release, runtimeKR, overView, cast, recommend, title } =
    mapInfo(kind, fullInfo);
  const genreMap = Object.values(useMapGenres(fullInfo?.genres)) || {};
  const { openModals, closeModal } = usePlayModalStore();
  const playModalKey = `previewDetailModal-${selectedInfoId}`;

  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      setOpen(false);
    }
  };

  const moreBtnClick = () => {
    setClick(prev => !prev);
    if (visibleCount <= recommend.length) {
      setVisibleCount(prev => prev + recommend.length - 1);
    } else {
      setVisibleCount(9);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <div className="preview-detail-wrap" onClick={handleOverlayClick}>
      <div className="preview-detail">
        <div className="preview-detail-top">
          <div className="preview-detail-overlay"></div>
          <span className="close-icon" onClick={() => setOpen(false)}>
            <img src={CloseIcon} alt="닫기" />
          </span>
          <img src={imgUrl} alt="" width="100%" loading="lazy" />
          <div className="preview-title-wrap">
            <h3>{title}</h3>
            <div className="preview-btn-wrap">
              <PlayBtn size="lg" name="play-btn" id={playModalKey} />
              <AddBtn />
              <LikeBtn />
            </div>
          </div>
        </div>
        <div className="preview-detail-btm">
          <div className="preview-detail-first">
            <div className="preview-detail-left">
              <span>
                {release} {runtimeKR}
              </span>
              <div>{overView}</div>
            </div>
            <div className="preview-detail-right">
              <div className="preview-info">
                <span className="preview-info-title">출연:</span>
                {cast.slice(0, 5).map((item, idx, arr) => (
                  <span key={idx}>
                    {item.name}
                    {idx !== 4 && ', '}
                  </span>
                ))}
              </div>
              <div>
                <span className="preview-info-title">장르:</span>
                {genreMap.map((genre, idx, arr) => (
                  <span key={idx}>
                    {genre}
                    {idx !== arr.length - 1 && ', '}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="preview-similar-wrap">
            <h3 className="preview-contents-title">추천 콘텐츠</h3>
            <div className="preview-contents-wrap">
              {recommend.slice(0, visibleCount).map(
                (item, idx) =>
                  item.backdrop_path && (
                    <div className="preview-contents-card" key={idx}>
                      <img
                        src={`https://image.tmdb.org/t/p/original/${item?.backdrop_path}`}
                        alt="이미지"
                        width={'100%'}
                        loading="lazy"
                      />
                      <div className="preview-contents-info">
                        <div className="preview-contents-top">
                          <h3>{kind === 'movie' ? item?.title : item?.name}</h3>
                          <AddBtn />
                        </div>
                        <p>{item?.overview}</p>
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
          {/* <div className="preview-similar-wrap">
            <h3 className="preview-contents-title">비슷한 콘텐츠</h3>
            <div className="preview-contents-wrap">
              {recommend.slice(0, visibleCount).map(
                (item, idx) =>
                  item.backdrop_path && (
                    <div className="preview-contents-card" key={idx}>
                      <img
                        src={`https://image.tmdb.org/t/p/original/${item?.backdrop_path}`}
                        alt="이미지"
                        width={'100%'}
                      />
                      <div className="preview-contents-info">
                        <div className="preview-contents-top">
                          <h3>{kind === 'movie' ? item?.title : item?.name}</h3>
                          <AddBtn />
                        </div>
                        <p>{item?.overview}</p>
                      </div>
                    </div>
                  )
              )}
            </div>
          </div> */}
          <div
            className={`more-btn-wrap ${isClick ? 'open' : ''}`}
            onClick={moreBtnClick}
          >
            <div className="more-btn">
              <img src={OpenIcon} alt="더보기" width={'100%'} />
            </div>
          </div>
          <div className="preview-detail-info"></div>
          {/* <div className='preview-' */}
        </div>
      </div>
      {openModals[playModalKey] && (
        <PlayModal
          youtubeKey={findKey.key}
          closeModal={() => {
            closeModal(playModalKey);
          }}
        />
      )}
    </div>
  );
};

export default PreviewDetailModal;
