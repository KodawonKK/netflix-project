import React from 'react';
import './Banner.style.css';
import Button from 'react-bootstrap/Button';
import InfoIcon from '../../../../assets/icon/info.svg';
import PlayBtn from '../../../../common/Buttons/PlayBtn';
import { useMovieVideoQuery } from '../../../../hooks/movie/useMovieVideo';
import PlayModal from '../../../../common/PlayModal/PlayModal';
import { usePlayModalStore } from '../../../../stores/playModalStore';
import { useTVVideoQuery } from '../../../../hooks/tv/useTVVideo';
import PreviewDetailModal from '../../../../common/PreviewDetail/PreviewDetailModal';
import { usePreviewDetailModalStore } from '../../../../stores/previewDetailModalStore';

const Banner = ({ data, kind, isLoading }) => {
  const imgUrl = `https://image.tmdb.org/t/p/original${data?.results[0]?.backdrop_path}`;
  const contentId = data?.results[0]?.id;
  const tvVideo = useTVVideoQuery(contentId, kind);
  const movieVideo = useMovieVideoQuery(contentId, kind);
  const video = kind === 'movie' ? movieVideo : tvVideo;
  const typeMap = {
    movie: ['Trailer'],
    tv: ['Teaser', 'Trailer'],
  };
  const findKey = video?.data?.find(item => typeMap[kind].includes(item.type));
  const playModalKey = `banner-${contentId}`;
  const { openModals, closeModal } = usePlayModalStore();
  const { isDetailModalOpen, openDetailModal } = usePreviewDetailModalStore();

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
          <Button
            variant="secondary"
            size="sm"
            className="banner-btn"
            onClick={() => openDetailModal(contentId)}
          >
            <img src={InfoIcon} alt="상세 정보" />
            <span>상세 정보</span>
          </Button>
        </div>
      </div>
      {openModals[playModalKey] && (
        <PlayModal
          youtubeKey={findKey?.key}
          closeModal={() => closeModal(playModalKey)}
        />
      )}
      {isDetailModalOpen[contentId] && (
        <PreviewDetailModal kind={kind} selectedInfoId={contentId} />
      )}
    </div>
  );
};

export default Banner;
