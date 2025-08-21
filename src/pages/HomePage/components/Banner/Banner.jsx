import React from 'react';
import './Banner.style.css';
import Button from 'react-bootstrap/Button';
import InfoIcon from '../../../../assets/icon/info.svg';
import { Alert } from 'bootstrap';
import PlayBtn from '../../../../common/Buttons/PlayBtn';

const Banner = ({ data, kind, isLoading }) => {
  // const { data, isLoading, isError, error } = usePopularMoviesQuery();
  // if (isLoading) {
  //   <h1>...Loading</h1>;
  // }
  // if (isError) {
  //   <Alert>{error.message};</Alert>;
  // }
  const imgUrl = `https://image.tmdb.org/t/p/original${data?.results[0]?.backdrop_path}`;

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
          <PlayBtn size="sm" name="banner-btn" />
          <Button variant="secondary" size="sm" className="banner-btn">
            <img src={InfoIcon} alt="상세 정보" />
            <span>상세 정보</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
