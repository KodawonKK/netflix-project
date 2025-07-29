import React from 'react';
import { usePopularMoviesQuery } from '../../../../hooks/movie/usePopularMovies';
import './Banner.style.css';
import Button from 'react-bootstrap/Button';
import InfoIcon from '../../../../assets/icon/info.svg';
import Play from '../../../../assets/icon/play.svg';
import { Alert } from 'bootstrap';

const Banner = ({ data, kind }) => {
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
          <Button variant="light" size="sm" className="banner-btn">
            <img src={Play} alt="재생 버튼" />
            <span>재생</span>
          </Button>
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
