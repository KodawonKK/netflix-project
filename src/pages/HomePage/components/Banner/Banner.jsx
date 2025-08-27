import React, { useState } from 'react';
import './Banner.style.css';
import Button from 'react-bootstrap/Button';
import InfoIcon from '../../../../assets/icon/info.svg';
import { Alert } from 'bootstrap';
import PlayBtn from '../../../../common/Buttons/PlayBtn';
import { useTVDetailFullQuery } from '../../../../hooks/tv/useTVDetailFull';
import { useMovieVideoQuery } from '../../../../hooks/movie/useMovieVideo';
import PlayModal from '../../../../common/PlayModal/PlayModal';
import { usePlayModalStore } from '../../../../stores/playModalStore';

const Banner = ({ data, kind, isLoading }) => {
  const imgUrl = `https://image.tmdb.org/t/p/original${data?.results[0]?.backdrop_path}`;
  const contentId = data?.results[0]?.id;
  const tvInfo = useTVDetailFullQuery(contentId, kind);
  const movieInfo = useMovieVideoQuery(contentId, kind);
  const findKey = movieInfo?.data?.find(item => item.type === 'Trailer');
  const playModalKey = `banner-${contentId}`;
  const { openModals, closeModal } = usePlayModalStore();

  return (
    <div className="banner-wrap">
      <div className="banner-overlay"></div>
      <img src={imgUrl} alt="배너 이미지" />
      <div className="banner-title-wrap">
        <h3 className="common-banner-txt banner-title">
          {kind === 'movie' ? data?.results[0]?.title : data?.results[0]?.name}
        </h3>
        <p className="common-banner-txt banner-overview">
          {data?.results[0]?.overview}
        </p>
        <div className="banner-btn-wrap">
          <PlayBtn size="sm" name="banner-btn" id={playModalKey} />
          <Button variant="secondary" size="sm" className="banner-btn">
            <img src={InfoIcon} alt="상세 정보" />
            <span>상세 정보</span>
          </Button>
        </div>
      </div>
      {openModals[playModalKey] && (
        <PlayModal
          youtubeKey={findKey?.key}
          closeModal={() => closeModal(playModalKey)}
          kind={'banner'}
        />
      )}
    </div>
  );
};

export default Banner;
