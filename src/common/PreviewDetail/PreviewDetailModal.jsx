import React, { useEffect, useMemo, useState } from 'react';
import './PreviewDetailModal.style.css';
import CloseIcon from '../../assets/icon/close.svg';
// import { useMovieVideoQuery } from '../../hooks/movie/useMovieVideo';
import { useMoviesDetailFullQuery } from '../../hooks/movie/useMovieDetailFull';
import { formatRuntime } from '../../utils/formatRuntime';
import { useMapGenres } from '../../hooks/useMapGenres';
import OpenIcon from '../../assets/icon/open.svg';
import PlayBtn from '../Buttons/PlayBtn';

const PreviewDetailModal = ({ isOpen, setOpen, kind, selectedInfo }) => {
  const [visibleCount, setVisibleCount] = useState(9);
  const [isClick, setClick] = useState(false);

  const imgUrl = `https://image.tmdb.org/t/p/original${selectedInfo?.backdrop_path}`;
  const info = useMoviesDetailFullQuery(selectedInfo?.id, 'movie');
  const release = selectedInfo.release_date.split('-')[0];
  const runtimeKR = formatRuntime(selectedInfo?.runtime);
  const overView = selectedInfo?.overview;
  const genreMap = Object.values(useMapGenres(selectedInfo?.genres)) || {};
  const cast = info?.data?.credits ? info.data.credits.cast : [];
  // const director = info?.data?.credits ? info.data.credits.crew : [];
  // const title = selectedInfo?.title;
  const recommend = info?.data?.recommendations?.results ?? [];

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
      // 모달 열릴 때
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
          <img src={imgUrl} alt="" width="100%" />
          <PlayBtn size="lg" name="play-btn" />
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
                      />
                      <div className="preview-contents-info">
                        <h3>{item?.title}</h3>
                        <p>{item?.overview}</p>
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
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
    </div>
  );
};

export default PreviewDetailModal;
